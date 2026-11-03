'use client';

import { createContext, createElement, useContext, type ReactNode } from 'react';
import type { Lang } from './index';

/* The page's language comes from the route that rendered it (passed down by
   each view), not from parsing the URL, so it is correct on any host. */
const LangContext = createContext<Lang>('en');

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return createElement(LangContext.Provider, { value: lang }, children);
}

export function useLang(): Lang {
  return useContext(LangContext);
}
