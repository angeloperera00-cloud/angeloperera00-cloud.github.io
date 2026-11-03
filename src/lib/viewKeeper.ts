/* ==========================================================================
   Keeps the visitor on the same spot when they switch language.
   Before leaving, it stores which block (section/footer) is at the top of the
   screen and how far into it they had scrolled; the other-language page has
   the same blocks in the same order, so the new page restores that position.
   ========================================================================== */

export const VIEW_KEY = 'ap-lang-view';

interface SavedView { to: string; i: number; ratio: number }

const blocks = () => Array.from(document.querySelectorAll<HTMLElement>('main [data-tone], .footer'));
const absTop = (el: HTMLElement) => el.getBoundingClientRect().top + scrollY;
const norm = (p: string) => p.replace(/\/+$/, '') || '/';

/** Jump without animation. Works in every browser (Safari ignores or rejects
    behavior: 'instant' in some versions, and the page uses smooth scrolling). */
export function jumpTo(top: number) {
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, top);
  document.body.scrollTop = top; // older WebKit
  root.style.scrollBehavior = prev;
}

/** Call just before navigating to `to` (a path like /it/ or /projects/). */
export function saveView(to: string) {
  try {
    const list = blocks();
    let i = 0;
    list.forEach((el, n) => { if (absTop(el) <= scrollY + 1) i = n; });
    const el = list[i];
    const ratio = el ? Math.min(1, Math.max(0, (scrollY - absTop(el)) / Math.max(1, el.offsetHeight))) : 0;
    sessionStorage.setItem(VIEW_KEY, JSON.stringify({ to: norm(new URL(to, location.href).pathname), i, ratio } satisfies SavedView));
  } catch { /* storage blocked: the new page simply opens at the top */ }
}

/** Call once on page load. Returns true when a saved position was restored. */
export function restoreView(): boolean {
  let saved: SavedView | null = null;
  try {
    const raw = sessionStorage.getItem(VIEW_KEY);
    sessionStorage.removeItem(VIEW_KEY);
    saved = raw ? (JSON.parse(raw) as SavedView) : null;
  } catch { return false; }
  if (!saved || saved.to !== norm((window as Window & { __canonPath?: string }).__canonPath ?? location.pathname)) return false;

  const { i, ratio } = saved;
  const jump = () => {
    const el = blocks()[i];
    if (!el) return;
    jumpTo(Math.round(absTop(el) + ratio * el.offsetHeight));
  };
  jump();
  // Fonts and images can shift the layout slightly once they arrive.
  document.fonts?.ready.then(jump).catch(() => {});
  const done = () => { jump(); try { history.scrollRestoration = 'auto'; } catch { /* ignore */ } };
  if (document.readyState === 'complete') setTimeout(done, 0);
  else addEventListener('load', done, { once: true });
  return true;
}
