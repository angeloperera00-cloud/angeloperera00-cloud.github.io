'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/icons/Icon';
import { navItems, site } from '@/content/site';
import { pad2 } from '@/lib/format';
import { lp, LANGS, LANG_LABEL, type Lang } from '@/i18n';
import { t } from '@/i18n/ui';

/* Sticky navigation: adapts its tone to the section underneath, tracks the
   active section on the home page, maps sub-pages to their section, and
   switches language while keeping the visitor on the same page. */
export default function Nav({ lang, path, hideWriting = false }: { lang: Lang; path: string; hideWriting?: boolean }) {
  const pathname = usePathname() ?? '/';
  const s = t(lang).nav;
  const base = path;
  const isHome = base === '/';
  const items = navItems.filter((i) => !(hideWriting && i.id === 'writing'));

  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [tone, setTone] = useState<'light' | 'dark'>('light');
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [ink, setInk] = useState<{ x: number; o: number }>({ x: 0, o: 0 });
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState('');

  const routeSection = base.startsWith('/projects') ? 'projects' : base.startsWith('/articles') ? 'writing' : null;

  /* Tone + active section */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(scrollY > 8);
      const probe = (navRef.current?.offsetHeight ?? 84) / 2;
      const line = innerHeight * 0.36;
      let tn = 'light' as 'light' | 'dark';
      let a = null as string | null;
      document.querySelectorAll<HTMLElement>('main [data-tone], .footer').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) tn = el.classList.contains('footer') ? 'dark' : (el.dataset.tone as 'light' | 'dark');
        if (el.id && r.top <= line && r.bottom > line) a = el.id;
      });
      if (isHome && innerHeight + scrollY >= document.documentElement.scrollHeight - 4) a = 'contact';
      setTone(tn);
      setActive(isHome ? (a === 'top' ? null : a) : routeSection);
      const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
      if (meta) meta.content = tn === 'dark' ? '#060606' : '#F6F5F3';
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(update); };
    kick();
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick);
    return () => { removeEventListener('scroll', kick); removeEventListener('resize', kick); cancelAnimationFrame(raf); };
  }, [isHome, routeSection, pathname]);

  /* Keep the section anchor when switching language on the home page. */
  useEffect(() => {
    const onHash = () => setHash(location.hash);
    onHash();
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);
  const langHref = (to: Lang) => lp(to, base) + (isHome && active ? `#${active}` : isHome ? hash : '');

  /* Sliding indicator under the active link */
  const placeInk = useCallback(() => {
    const el = active ? linkRefs.current[active] : null;
    setInk(el ? { x: el.offsetLeft + el.offsetWidth / 2 - 9, o: 1 } : (v) => ({ ...v, o: 0 }));
  }, [active]);
  useEffect(() => {
    placeInk();
    document.fonts?.ready.then(placeInk);
    addEventListener('resize', placeInk);
    return () => removeEventListener('resize', placeInk);
  }, [placeInk, lang]);

  /* Mobile menu */
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const first = menuRef.current?.querySelector('a');
    const tm = setTimeout(() => first?.focus({ preventScroll: true }), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); burgerRef.current?.focus({ preventScroll: true }); }
    };
    addEventListener('keydown', onKey);
    return () => { clearTimeout(tm); removeEventListener('keydown', onKey); };
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const mq = matchMedia('(min-width: 1101px)');
    const fn = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  const href = (id: string) => (id === 'writing' && !isHome ? lp(lang, '/articles/') : lp(lang, `/#${id}`));
  const label = (id: string) => s[id as keyof typeof s];

  const Switch = ({ className }: { className: string }) => (
    <div className={className} role="group" aria-label={s.language}>
      {LANGS.map((l) => (
        <a key={l} href={langHref(l)} hrefLang={l} lang={l} aria-current={l === lang ? 'true' : undefined} aria-label={LANG_LABEL[l]}>
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );

  return (
    <>
      <header ref={navRef} className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' menu-on' : ''}`} data-tone={tone}>
        <div className="container nav__inner">
          <Link className="logo" href={lp(lang, '/#top')} aria-label={`${site.name}, ${s.backToTop}`}>AP<span>.</span></Link>
          <nav className="nav__menu" aria-label="Primary" style={{ ['--ink-x' as string]: `${ink.x}px`, ['--ink-o' as string]: ink.o }}>
            <ul className="nav__links">
              {items.map((i) => (
                <li key={i.id}>
                  <Link href={href(i.id)} ref={(el) => { linkRefs.current[i.id] = el; }} aria-current={active === i.id ? 'true' : undefined}>
                    {label(i.id)}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="nav__ink" aria-hidden="true" />
          </nav>
          <Switch className="langswitch" />
          <Link className="btn btn--red btn--sm nav__cta magnetic" href={lp(lang, '/#contact')}>
            {s.letsTalk} <Icon name="i-arrow-right" />
          </Link>
          <button ref={burgerRef} className="nav__burger" type="button" aria-expanded={open} aria-controls="mmenu" onClick={() => setOpen((o) => !o)}>
            <span /><span /><span className="sr-only">{open ? s.closeMenu : s.openMenu}</span>
          </button>
        </div>
      </header>

      <div ref={menuRef} className={`mmenu${open ? ' is-open' : ''}`} id="mmenu" aria-hidden={!open}>
        <nav aria-label="Mobile">
          <ol className="mmenu__links">
            {items.map((i, n) => (
              <li key={i.id} style={{ ['--i' as string]: n }}>
                <Link href={href(i.id)} onClick={() => setOpen(false)}>
                  <small>{pad2(n + 1)}</small>
                  {label(i.id)}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mmenu__foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Switch className="langswitch langswitch--menu" />
        </div>
      </div>
    </>
  );
}
