// Small building blocks shared by every page.
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, Award, BarChart3, BookOpen, Building2, CalendarDays, Check, CheckCircle2, ChevronRight, Circle,
  ClipboardList, Clock, Copy, Crown, Download, Github, Globe, GraduationCap, Hammer, Heart, Laptop, Layers,
  Lightbulb, Linkedin, Mail, MapPin, MessageSquare, Quote, Rocket, Route, Signal, Sparkles, Star, Users, Zap,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  arrow: ArrowUpRight, award: Award, chart: BarChart3, book: BookOpen, building: Building2, calendar: CalendarDays,
  check: Check, 'check-circle': CheckCircle2, chevron: ChevronRight, circle: Circle, clipboard: ClipboardList,
  clock: Clock, copy: Copy, crown: Crown, download: Download, github: Github, web: Globe, cap: GraduationCap,
  hammer: Hammer, heart: Heart, laptop: Laptop, layers: Layers, bulb: Lightbulb, linkedin: Linkedin, mail: Mail,
  pin: MapPin, message: MessageSquare, quote: Quote, rocket: Rocket, route: Route, signal: Signal, spark: Sparkles,
  star: Star, users: Users, zap: Zap,
};

export function Icon({ name, size, strokeWidth, className }: { name: string; size?: number; strokeWidth?: number; className?: string }) {
  const Cmp = icons[name] || Sparkles;
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** Button / link with Lexio's trailing ↗ arrow. */
export function Button({
  href, children, variant = 'primary', size, arrow = true, className = '', onClick, type, disabled,
}: {
  href?: string; children: ReactNode; variant?: 'primary' | 'navy' | 'outline' | 'ghost-light';
  size?: 'sm'; arrow?: boolean; className?: string; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean;
}) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ''} ${className}`.trim();
  const inner = (<>{children}{arrow && <ArrowUpRight />}</>);
  if (href) {
    return isExternal(href)
      ? <a className={cls} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{inner}</a>
      : <Link className={cls} to={href}>{inner}</Link>;
  }
  return <button className={cls} onClick={onClick} type={type || 'button'} disabled={disabled}>{inner}</button>;
}

export function SmartLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; 'aria-label'?: string }) {
  return isExternal(href)
    ? <a href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" {...rest}>{children}</a>
    : <Link to={href} className={className} {...rest}>{children}</Link>;
}

/** Fades + lifts children into view on scroll (Framer-style appear). */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style }: {
  children: ReactNode; delay?: number; as?: 'div' | 'section' | 'li' | 'article'; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={`reveal ${className}`} style={{ ...style, '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function SectionHead({ title, text, center, eyebrow, aside }: {
  title: ReactNode; text?: ReactNode; center?: boolean; eyebrow?: string; aside?: ReactNode;
}) {
  return (
    <Reveal className={`section-head${center ? ' section-head--center' : ''}`}>
      <div>
        {eyebrow && <p className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</p>}
        <h2 className="h2">{title}</h2>
        {center && text && <p className="lead" style={{ marginTop: 16 }}>{text}</p>}
      </div>
      {!center && text && <p className="lead">{text}</p>}
      {aside}
    </Reveal>
  );
}

/** Three brand-colored icon circles — stands in for Lexio's avatar stack. */
export function IconStack() {
  return (
    <div className="avatar-stack" aria-hidden="true">
      <span className="av-blue"><Icon name="book" /></span>
      <span className="av-violet"><Icon name="hammer" /></span>
      <span className="av-green"><Icon name="rocket" /></span>
    </div>
  );
}

/** Renders trusted markdown HTML and adds a Copy button to every code block. */
export function Markdown({ html, className = '' }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pre.querySelector('code')?.textContent || pre.textContent || '');
          btn.textContent = 'Copied';
          setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
        } catch { /* clipboard blocked */ }
      });
      pre.appendChild(btn);
    });
  }, [html]);
  return <div ref={ref} className={`prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | LetsVibeAI` : 'LetsVibeAI | The AI Skills Institution';
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
