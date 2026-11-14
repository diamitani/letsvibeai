'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase, supabaseConfigured } from './supabase';

const KEY = 'lv_progress_v2';
type Store = Record<string, string[]>;

function read(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as Store;
  } catch {
    return {};
  }
}

function write(s: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new Event('lv-progress'));
}

let signedIn = false;

export async function syncProgress(userId: string | null) {
  signedIn = !!userId;
  if (!userId || !supabase) return;
  const { data, error } = await supabase.from('lv_lesson_progress').select('course, lesson');
  if (error || !data) return;
  const local = read();
  const remote = new Set(data.map((r) => `${r.course}/${r.lesson}`));
  const merged: Store = { ...local };
  for (const r of data) merged[r.course] = [...new Set([...(merged[r.course] || []), r.lesson])];
  const missing = Object.entries(local).flatMap(([course, lessons]) =>
    lessons.filter((lesson) => !remote.has(`${course}/${lesson}`)).map((lesson) => ({ course, lesson })),
  );
  if (missing.length) await supabase.from('lv_lesson_progress').upsert(missing, { ignoreDuplicates: true });
  write(merged);
}

export function useProgress(course: string) {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setDone(read()[course] || []);
    sync();
    window.addEventListener('lv-progress', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('lv-progress', sync);
      window.removeEventListener('storage', sync);
    };
  }, [course]);

  const set = useCallback(
    (lesson: string, value: boolean) => {
      const s = read();
      const list = new Set(s[course] || []);
      if (value === list.has(lesson)) return;
      if (value) list.add(lesson);
      else list.delete(lesson);
      s[course] = [...list];
      write(s);
      if (!signedIn || !supabase || !supabaseConfigured) return;
      if (value) void supabase.from('lv_lesson_progress').upsert({ course, lesson }, { ignoreDuplicates: true });
      else void supabase.from('lv_lesson_progress').delete().match({ course, lesson });
    },
    [course],
  );

  return { done, isDone: (l: string) => done.includes(l), set };
}

export function clearLocalProgress() {
  write({});
}
