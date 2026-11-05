import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookmarkButton, ReadingProgress } from "@/components/interactive";
import { CitationStrip, PageHero } from "@/components/editorial";
import { articleBySlug, articles } from "@/lib/content";
export function generateStaticParams() { return articles.map((item) => ({ slug: item.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = articleBySlug(slug); return { title: item?.title || "Research article", description: item?.summary }; }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = articleBySlug(slug); if (!item) notFound();
  const related = articles.filter((entry) => entry.id !== item.id);
  return <><ReadingProgress />
    <PageHero label={`RESEARCH / ${item.category.toUpperCase()}`} title={<>{item.title.split(":")[0]}<br /><em>{item.title.includes(":") ? item.title.split(":").slice(1).join(":").trim() : "A research note"}</em></>} description={item.summary} meta={[item.date.toUpperCase(), item.reading.toUpperCase(), item.category.toUpperCase()]} />
    <section className="section-paper article-body-section"><div className="wrap article-detail-layout"><aside className="detail-aside"><span className="eyebrow">ON THIS PAGE</span>{item.body.map((section, index) => <a key={section.h} href={`#section-${index + 1}`}>{String(index + 1).padStart(2, "0")} / {section.h}</a>)}<div className="detail-save"><BookmarkButton id={`article-${item.id}`} title={item.title} /></div><span className="detail-aside-note">Saved items stay on this device only.</span></aside><article className="longform-copy detail-copy">
      <div className="detail-meta"><span>{item.category.toUpperCase()}</span><span>{item.date}</span><span>{item.reading}</span></div>
      <p className="article-standfirst">{item.summary}</p>
      {item.body.map((section, index) => <section key={section.h} id={`section-${index + 1}`}><div className="eyebrow">SECTION {String(index + 1).padStart(2, "0")}</div><h2>{section.h}</h2><p>{section.p}</p></section>)}
      <div className="attribution-box"><span className="eyebrow">EDITORIAL NOTE</span><p>This article is an independent synthesis of the references listed below. It is not an official statement, and it does not claim access to classified material. Read the underlying sources for their full context and limitations.</p></div>
      <CitationStrip ids={item.sources} /><div className="related-reading"><span className="eyebrow">MORE FROM THE RESEARCH DESK</span>{related.map((entry) => <Link href={`/articles/${entry.id}`} key={entry.id}>{entry.title} <span>↗</span></Link>)}</div><Link href="/articles" className="back-link">← BACK TO RESEARCH DESK</Link>
    </article></div></section>
  </>;
}
