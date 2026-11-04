import Icon from '@/components/icons/Icon';
import { Display, SecLabel } from '@/components/ui/Display';
import SmartLink from '@/components/ui/SmartLink';
import CopyButton from '@/components/ui/CopyButton';
import ContactForm from './ContactForm';
import { site } from '@/content/site';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export default function Contact({ num = '09', lang }: { num?: string; lang: Lang }) {
  const s = t(lang).contact;
  const h = t(lang).hero;
  return (
    <section className="contact" id="contact" data-tone="light">
      <div className="container contact__grid">
        <header className="sec-head contact__head">
          <SecLabel num={num} label={s.label} />
          <Display lines={[s.titleA, s.titleB, { text: s.titleC, accent: true }]} />
        </header>

        <div className="contact__info" data-reveal style={{ ['--d' as string]: '.12s' }}>
          <p>{s.lede1}<br />{s.lede2}</p>
          <ul className="contact__list">
            <li><Icon name="i-mail" /><a href={`mailto:${site.email}`} data-copy-src>{site.email}</a><CopyButton value={site.email} label={h.copyEmail} /></li>
            <li><Icon name="i-map-pin" /><span>{lang === 'it' ? 'Napoli, Italia' : site.location}</span></li>
          </ul>
          <ul className="socials">
            <li><SmartLink href={site.links.github} setting="site.links.github" ariaLabel="GitHub"><Icon name="b-github" /></SmartLink></li>
            <li><SmartLink href={site.links.linkedin} setting="site.links.linkedin" ariaLabel="LinkedIn"><Icon name="b-linkedin" /></SmartLink></li>
            <li><SmartLink href={site.links.youtube} setting="site.links.youtube" ariaLabel="YouTube"><Icon name="b-youtube" /></SmartLink></li>
            <li><SmartLink href={site.links.medium} setting="site.links.medium" ariaLabel="Medium"><Icon name="b-medium" /></SmartLink></li>
          </ul>
        </div>

        <ContactForm lang={lang} />
      </div>
    </section>
  );
}
