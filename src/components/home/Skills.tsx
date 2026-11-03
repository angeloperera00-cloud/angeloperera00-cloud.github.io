import Icon from '@/components/icons/Icon';
import { Display, SecLabel } from '@/components/ui/Display';
import SkillTile from './SkillTile';
import { getProfile } from '@/lib/profile';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';

export default function Skills({ lang }: { lang: Lang }) {
  const { skills, skillKpis } = getProfile(lang);
  const s = t(lang).skills;
  const delays = ['0s', '.08s', '.16s', '.04s', '.12s', '.2s'];
  return (
    <section className="skills" id="skills" data-tone="light">
      <div className="container">
        <header className="sec-head skills__head">
          <div>
            <SecLabel num="04" label={s.label} />
            <Display lines={[s.titleA, { text: <>{s.titleB} <em className="accent">{s.titleC}</em></> }]} />
          </div>
          <p className="sec-lede" data-reveal style={{ ['--d' as string]: '.15s' }}>{s.lede}</p>
          <ul className="kpis">
            {skillKpis.map((k, i) => (
              <li key={k.label} data-reveal style={{ ['--d' as string]: `${0.1 + i * 0.08}s` }}>
                <Icon name={k.icon} />
                <strong><span data-count={k.count}>{k.count}</span>{k.suffix}</strong>
                <span className="kpi__label">{k.label}</span>
              </li>
            ))}
          </ul>
        </header>

        <div className="skill-grid">
          {skills.map((group, i) => (
            <section className="skill-card" key={group.title} data-reveal="card" style={{ ['--d' as string]: delays[i] }} aria-label={group.title}>
              <h3>{group.title}</h3>
              <ul className="tiles">{group.tiles.map((x) => <SkillTile key={x.label} tile={x} />)}</ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
