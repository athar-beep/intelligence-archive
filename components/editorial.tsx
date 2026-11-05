import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArchivePhoto } from "@/components/archive-photo";
import { type ArchiveCase, type ArchiveImage, type ArchiveArticle, type ArchiveRole, type ArchiveTimelineItem, type ArchiveSource, sourcesFor } from "@/lib/content";

export function SectionHeading({ index, kicker, title, description, light = false, action }: { index?: string; kicker: string; title: ReactNode; description?: string; light?: boolean; action?: { label: string; href: string } }) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`} data-reveal>
      <div className="section-heading-copy">
        <div className="eyebrow"><span>{index || ""}</span>{kicker}</div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <Link href={action.href} className="text-link section-action">{action.label}<span>↗</span></Link>}
    </div>
  );
}

export function PageHero({ label, title, description, meta }: { label: string; title: ReactNode; description: string; meta?: string[] }) {
  return (
    <section className="page-hero">
      <div className="wrap page-hero-inner">
        <div className="eyebrow page-eyebrow"><span>ARCHIVE /</span>{label}</div>
        <h1 className="display-title" data-reveal>{title}</h1>
        <p className="page-deck" data-reveal>{description}</p>
        {meta && <div className="page-meta">{meta.map((item) => <span key={item}>{item}</span>)}</div>}
      </div>
      <div className="page-hero-index">THE INTELLIGENCE ARCHIVE · PAKISTAN</div>
    </section>
  );
}

export function Evidence({ value }: { value: string }) {
  const tone = /documented/i.test(value) ? "documented" : /disputed|contested|debated/i.test(value) ? "disputed" : /reported/i.test(value) ? "reported" : "context";
  return <span className={`evidence-pill ${tone}`}><i />{value}</span>;
}

export function SourceInline({ ids }: { ids: string[] }) {
  return <span className="source-inline">{ids.map((id) => <Link key={id} href={`/sources#${id}`} title={`Open source ${id}`}>{id}</Link>)}</span>;
}

export function SourceList({ items }: { items: ArchiveSource[] }) {
  return (
    <div className="source-list">
      {items.map((source, index) => (
        <a className="source-row" href={source.url} target="_blank" rel="noreferrer" key={source.id} id={source.id}>
          <span className="source-id">{source.id}</span>
          <span className="source-main"><strong>{source.title}</strong><small>{source.publisher} · {source.date} · {source.kind}</small><em>{source.note}</em></span>
          <span className="source-open">↗</span>
        </a>
      ))}
    </div>
  );
}

export function TimelineList({ items, compact = false }: { items: ArchiveTimelineItem[]; compact?: boolean }) {
  return (
    <div className={`timeline-list ${compact ? "compact" : ""}`}>
      {items.map((item, index) => (
        <article className="timeline-item" data-reveal key={`${item.date}-${item.title}`} style={{ "--item-index": index } as CSSProperties}>
          <div className="timeline-rail"><span>{String(index + 1).padStart(2, "0")}</span></div>
          <div className="timeline-entry">
            <div className="timeline-meta"><time>{item.date}</time><span>{item.era}</span><Evidence value={item.status} /></div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="timeline-bottom"><span>{item.topic}</span><SourceInline ids={item.sources} /></div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function RoleGrid({ items }: { items: ArchiveRole[] }) {
  return (
    <div className="role-grid">
      {items.map((item, index) => (
        <article className="role-card" data-reveal key={item.n} style={{ "--item-index": index } as CSSProperties}>
          <div className="role-card-top"><span>{item.n}</span><span className="role-mark">↗</span></div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <div className="role-card-foot"><Evidence value={item.evidence} /><SourceInline ids={item.sources} /></div>
        </article>
      ))}
    </div>
  );
}

export function CaseCard({ item, index = 0 }: { item: ArchiveCase; index?: number }) {
  return (
    <Link href={`/case-studies/${item.id}`} className="case-card" data-reveal style={{ "--item-index": index } as CSSProperties}>
      <div className="case-card-top"><span>CASE FILE / {String(index + 1).padStart(2, "0")}</span><span>{item.year}</span></div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <div className="case-card-foot"><Evidence value={item.status} /><span className="case-arrow">↗</span></div>
    </Link>
  );
}

export function ArticleRow({ item, index = 0 }: { item: ArchiveArticle; index?: number }) {
  return (
    <Link href={`/articles/${item.id}`} className="article-row" data-reveal style={{ "--item-index": index } as CSSProperties}>
      <span className="article-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="article-body"><span className="article-kicker">{item.category} <i /> {item.reading}</span><strong>{item.title}</strong><small>{item.summary}</small></span>
      <span className="article-date">{item.date}</span><span className="article-arrow">↗</span>
    </Link>
  );
}

export function ImageFigure({ item, className = "", priority = false }: { item: ArchiveImage; className?: string; priority?: boolean }) {
  return (
    <figure className={`image-figure ${className}`}>
      <div className="image-frame"><ArchivePhoto src={item.assetUrl} alt={item.alt} priority={priority} /></div>
      <figcaption><span>{item.caption}</span><Link href="/image-credits">CREDIT & LICENCE ↗</Link></figcaption>
    </figure>
  );
}

export function CitationStrip({ ids }: { ids: string[] }) {
  const records = sourcesFor(ids);
  return <div className="citation-strip"><span className="eyebrow">REFERENCES</span>{records.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>{source.id} · {source.publisher} ↗</a>)}</div>;
}
