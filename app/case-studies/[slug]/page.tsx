import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CitationStrip, Evidence, PageHero } from "@/components/editorial";
import { BookmarkButton, ReadingProgress } from "@/components/interactive";
import { cases, caseBySlug } from "@/lib/content";
export function generateStaticParams() { return cases.map((item) => ({ slug: item.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = caseBySlug(slug); return { title: item?.title || "Case study", description: item?.summary }; }
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = caseBySlug(slug); if (!item) notFound();
  const related = cases.filter((entry) => entry.id !== item.id);
  return <><ReadingProgress />
    <PageHero label={`CASE STUDY / ${item.year}`} title={<>{item.title.split(":")[0]}<br /><em>{item.title.includes(":") ? item.title.split(":").slice(1).join(":").trim() : "Historical context"}</em></>} description={item.summary} meta={[item.category.toUpperCase(), item.year.toUpperCase(), item.status.toUpperCase()]} />
    <section className="section-paper article-body-section"><div className="wrap article-detail-layout"><aside className="detail-aside"><span className="eyebrow">CASE FILE</span><Evidence value={item.status} /><span className="detail-aside-label">IN THIS FILE</span>{item.body.map((section, index) => <a href={`#section-${index + 1}`} key={section.h}>{String(index + 1).padStart(2, "0")} / {section.h}</a>)}<div className="detail-save"><BookmarkButton id={`case-${item.id}`} title={item.title} /></div></aside><article className="longform-copy detail-copy">
      <div className="detail-meta"><span>HISTORICAL ANALYSIS</span><span>{item.year}</span><span>{item.body.length} SECTIONS</span></div>
      {item.body.map((section, index) => <section key={section.h} id={`section-${index + 1}`}><div className="eyebrow">SECTION {String(index + 1).padStart(2, "0")}</div><h2>{section.h}</h2><p>{section.p}</p></section>)}
      <div className="attribution-box"><span className="eyebrow">ATTRIBUTION & CONFIDENCE NOTE</span><p>This case study is limited to the public evidence linked below. It is not a claim to possess classified records or a complete operational account. Where a source describes a relationship or allegation, the wording remains attributed to that source.</p></div>
      <CitationStrip ids={item.sources} /><div className="related-reading"><span className="eyebrow">RELATED CASE FILES</span>{related.map((entry) => <Link href={`/case-studies/${entry.id}`} key={entry.id}>{entry.title} <span>↗</span></Link>)}</div><Link href="/case-studies" className="back-link">← BACK TO CASE STUDIES</Link>
    </article></div></section>
  </>;
}
