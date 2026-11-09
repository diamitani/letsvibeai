// Remembers which lessons a visitor finished (in their own browser).
import { useCallback, useEffect, useState } from 'react';

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
    /* private mode: progress just isn't saved */
  }
  window.dispatchEvent(new Event('lv-progress'));
}

export function useProgress(course: string) {
  const [done, setDone] = useState<string[]>(() => read()[course] || []);
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
      if (value) list.add(lesson);
      else list.delete(lesson);
      s[course] = [...list];
      write(s);
    },
    [course],
  );

  return { done, isDone: (l: string) => done.includes(l), set };
}
