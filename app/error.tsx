"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="error-screen section-navy">
      <div className="wrap">
        <span className="eyebrow">ARCHIVE / ACCESS INTERRUPTION</span>
        <h1>That record<br /><em>did not load.</em></h1>
        <p>An unexpected error interrupted this page. Retry the route, or return to the archive index.</p>
        <div className="error-actions"><button className="button button-bronze" onClick={() => reset()}>RETRY THIS PAGE ↗</button><Link className="button button-outline" href="/">RETURN TO HOME</Link></div>
      </div>
    </section>
  );
}
