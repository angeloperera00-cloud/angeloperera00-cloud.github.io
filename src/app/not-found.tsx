import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Shell from '@/views/Shell';

export default function NotFound() {
  return (
    <Shell lang="en" path="/404/">
    <section className="notfound tone-dark" id="top" data-tone="dark">
      <div className="container">
        <p className="sec-num">404</p>
        <p className="sec-label">Page not found</p>
        <h1 className="display">This page<br /><span className="accent">doesn&apos;t exist.</span></h1>
        <Link className="btn btn--red magnetic" href="/">Back to home <Icon name="i-arrow-right" /></Link>
      </div>
    </section>
    </Shell>
  );
}
