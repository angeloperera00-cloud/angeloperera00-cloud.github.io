import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import WhatIDo from '@/components/home/WhatIDo';
import Skills from '@/components/home/Skills';
import Education from '@/components/home/Education';
import Certifications from '@/components/home/Certifications';
import YouTube from '@/components/home/YouTube';
import Contact from '@/components/home/Contact';
import ProjectsSection from '@/components/projects/ProjectsSection';
import WritingSection from '@/components/articles/WritingSection';
import { getArticles } from '@/lib/articles';
import type { Lang } from '@/i18n';
import Shell from './Shell';

export default function HomeView({ lang }: { lang: Lang }) {
  const hasWriting = getArticles().length > 0;
  return (
    <Shell lang={lang} path={'/'}>
    <>
      <Hero lang={lang} />
      <About lang={lang} />
      <WhatIDo lang={lang} />
      <ProjectsSection lang={lang} />
      <Skills lang={lang} />
      <Education lang={lang} />
      <Certifications lang={lang} />
      <YouTube lang={lang} />
      {hasWriting && <WritingSection num="08" lang={lang} />}
      <Contact num={hasWriting ? '09' : '08'} lang={lang} />
    </>
    </Shell>
  );
}
