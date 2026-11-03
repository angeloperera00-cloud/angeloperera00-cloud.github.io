'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import Icon from '@/components/icons/Icon';
import { site } from '@/content/site';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

type Field = 'name' | 'email' | 'message';
export default function ContactForm({ lang }: { lang: Lang }) {
  const s = t(lang).contact;
  const rules: Record<Field, (v: string) => string> = {
    name: (v) => (v.length >= 2 ? '' : s.errName),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : s.errEmail),
    message: (v) => (v.length >= 10 ? '' : s.errMsg),
  };
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [attempted, setAttempted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ text: string; kind: '' | 'ok' | 'err' }>({ text: '', kind: '' });
  const refs = { name: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null), message: useRef<HTMLTextAreaElement>(null) };

  const validate = (v = values) => {
    const next = { name: rules.name(v.name.trim()), email: rules.email(v.email.trim()), message: rules.message(v.message.trim()) };
    setErrors(next);
    return next;
  };
  const change = (k: Field, val: string) => {
    const v = { ...values, [k]: val };
    setValues(v);
    if (attempted) validate(v);
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setAttempted(true);
    const errs = validate();
    const firstBad = (Object.keys(errs) as Field[]).find((k) => errs[k]);
    if (firstBad) { refs[firstBad].current?.focus(); setStatus({ text: '', kind: '' }); return; }

    const data = { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() };
    if (site.formEndpoint) {
      setBusy(true);
      setStatus({ text: '', kind: '' });
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setValues({ name: '', email: '', message: '' });
        setAttempted(false);
        setStatus({ text: s.ok(data.name.split(' ')[0], data.email), kind: 'ok' });
      } catch {
        setStatus({ text: s.fail(site.email), kind: 'err' });
      } finally {
        setBusy(false);
      }
      return;
    }
    const subject = s.subject(data.name);
    const body = `${data.message}\n\n${data.name}\n${data.email}`;
    location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ text: s.mailto(site.email), kind: '' });
  }

  const field = (k: Field, el: ReactNode) => (
    <div className={`field${errors[k] ? ' is-invalid' : ''}`}>
      {el}
      <p className="field__err" id={`cf-${k}-err`} aria-live="polite">{errors[k]}</p>
    </div>
  );
  const aria = (k: Field) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `cf-${k}-err` } : {});

  return (
    <form className="cform" noValidate onSubmit={onSubmit} data-reveal style={{ ['--d' as string]: '.2s' }}>
      <div className="cform__row">
        {field('name', <>
          <label className="sr-only" htmlFor="cf-name">{s.nameLabel}</label>
          <input ref={refs.name} id="cf-name" name="name" type="text" autoComplete="name" placeholder={s.name} required maxLength={120} value={values.name} onChange={(e) => change('name', e.target.value)} {...aria('name')} />
        </>)}
        {field('email', <>
          <label className="sr-only" htmlFor="cf-email">{s.emailLabel}</label>
          <input ref={refs.email} id="cf-email" name="email" type="email" autoComplete="email" placeholder={s.email} required maxLength={160} value={values.email} onChange={(e) => change('email', e.target.value)} {...aria('email')} />
        </>)}
      </div>
      {field('message', <>
        <label className="sr-only" htmlFor="cf-message">{s.messageLabel}</label>
        <textarea ref={refs.message} id="cf-message" name="message" rows={6} placeholder={s.message} required maxLength={4000} value={values.message} onChange={(e) => change('message', e.target.value)} {...aria('message')} />
      </>)}
      <div className="cform__foot">
        <button className="btn btn--red magnetic cform__submit" type="submit" aria-busy={busy || undefined}>
          <span className="cform__label">{busy ? s.sending : s.send}</span> <Icon name="i-arrow-right" />
        </button>
        <p className={`cform__status${status.kind ? ` is-${status.kind}` : ''}`} role="status" aria-live="polite">{status.text}</p>
      </div>
    </form>
  );
}
