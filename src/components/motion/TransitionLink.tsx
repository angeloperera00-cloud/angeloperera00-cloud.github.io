'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, type ComponentProps, type MouseEvent } from 'react';
import { jumpTo, restoreView } from '@/lib/viewKeeper';

/* ==========================================================================
   Client navigation wrapped in the View Transitions API, so elements that
   share a `view-transition-name` (a project's cover on the card and on its
   case-study page) morph between pages. Falls back to a normal Link.
   ========================================================================== */

let pending: (() => void) | null = null;

/** Mount once (root layout): resolves the transition when the new route commits,
    opens every new page at the top (or at its #section), and keeps the same
    spot after a language switch. Back/forward keeps the browser's position. */
export function RouteTransitionListener() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => { popped.current = true; };
    addEventListener('popstate', onPop);
    return () => removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const toTarget = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      jumpTo(el ? el.getBoundingClientRect().top + scrollY : 0);
    };
    if (first.current) {
      first.current = false;
      if (!restoreView()) {
        // A fresh visit (link click, not reload or back/forward) always opens at the top.
        const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
        if ((!nav || nav.type === 'navigate') && !location.hash) {
          jumpTo(0);
          requestAnimationFrame(() => jumpTo(0));
        }
      }
    } else if (popped.current) {
      popped.current = false;
    } else {
      toTarget();
      requestAnimationFrame(toTarget);
    }
    // Rendering is paused during the transition's update phase, so resolve
    // directly (no requestAnimationFrame): the new route is already committed.
    if (!pending) return;
    const resolve = pending;
    pending = null;
    resolve();
  }, [pathname]);
  return null;
}

type Props = ComponentProps<typeof Link> & { href: string };

export default function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const target = new URL(href, location.href);
    const samePage = target.pathname.replace(/\/$/, '') === pathname.replace(/\/$/, '');
    if (samePage || !document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    e.preventDefault();
    document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          pending = resolve;
          router.push(href);
          setTimeout(() => { if (pending === resolve) pending = null; resolve(); }, 1500);
        }),
    );
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
