import type { Metadata } from 'next';
import HomeView from '@/views/HomeView';

export const metadata: Metadata = {
  title: { absolute: 'angeloperera - software engineer' },
  description: 'Angelo Perera è uno sviluppatore iOS, web e di videogiochi a Napoli. Crea app con Swift, SwiftUI, ARKit, RealityKit e Unity. Disponibile per lavoro freelance e full-time.',
  alternates: { languages: { en: '/', it: '/it/' } },
};

export default function HomePageIt() {
  return <HomeView lang="it" />;
}
