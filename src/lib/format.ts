export function formatDate(iso?: string, lang: 'en' | 'it' = 'en'): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
export const pad2 = (n: number) => String(n).padStart(2, '0');
export const telHref = (p: string) => 'tel:' + p.replace(/[^\d+]/g, '');
/** Stable small hash for deterministic per-item variation (generated covers). */
export function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
