import type { Metadata } from 'next';
import HomeView from '@/views/HomeView';

export const metadata: Metadata = { alternates: { languages: { en: '/', it: '/it/' } } };

export default function HomePage() {
  return <HomeView lang="en" />;
}
