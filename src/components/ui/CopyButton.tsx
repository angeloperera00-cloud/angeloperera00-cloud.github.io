'use client';

import Icon from '@/components/icons/Icon';
import { useToast } from './Toast';
import { useLang } from '@/i18n/useLang';
import { t } from '@/i18n/ui';

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const toast = useToast();
  const s = t(useLang()).toast;
  return (
    <button
      className="copy"
      type="button"
      aria-label={label}
      onClick={async (e) => {
        try {
          await navigator.clipboard.writeText(value);
          toast(`${s.copied} ${value}`);
        } catch {
          const target = (e.currentTarget.parentElement?.querySelector('[data-copy-src]') ?? null) as Node | null;
          if (target) {
            const range = document.createRange();
            range.selectNodeContents(target);
            const sel = getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
          }
          toast(s.selected);
        }
      }}
    >
      <Icon name="i-copy" />
    </button>
  );
}
