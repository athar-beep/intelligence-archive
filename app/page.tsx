import Link from "next/link";
import type { CSSProperties } from "react";
import { ArticleRow, CaseCard, Evidence, RoleGrid, SectionHeading, TimelineList } from "@/components/editorial";
import { ArchivePhoto } from "@/components/archive-photo";
import { articles, cases, images, roles, timeline } from "@/lib/content";

export default function HomePage() {
  const heroImage = images[0];
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow" data-reveal><span>PAKISTAN</span><i /> INTELLIGENCE HISTORY / PUBLIC RECORD</div>
            <h1 data-reveal>Behind the<br /><em>pages</em> of history.</h1>
            <p className="hero-lede" data-reveal>An independent archive examining the publicly documented history, institutional context and contested narratives surrounding Pakistan’s Inter-Services Intelligence Directorate.</p>
            <div className="hero-actions" data-reveal>
              <Link href="/history" className="button button-bronze">EXPLORE THE ARCHIVE <span>↗</span></Link>
              <Link href="/about" className="button button-outline">OUR METHODOLOGY <span>→</span></Link>
            </div>
            <div className="hero-index" data-reveal><span>01 / 09</span><i /> A RECORD OF PUBLIC HISTORY</div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap"><ArchivePhoto src={heroImage.assetUrl} alt={heroImage.alt} priority sizes="(max-width: 900px) 100vw, 52vw" className="hero-image" /></div>
            <div className="hero-image-vignette" />
            <div className="hero-side-note">ARCHIVAL CONTEXT · PAKISTAN · 2016</div>
            <div className="hero-visual-top"><span>FIG. 001</span><span>PUBLIC ARCHIVE SERIES</span></div>
            <div className="hero-caption"><span>{heroImage.caption}</span><Link href="/image-credits">IMAGE RECORD ↗</Link></div>
            <div className="hero-frame-corner corner-tl" /><div className="hero-frame-corner corner-br" />
          </div>
        </div>
        <div className="hero-bottomline"><span>AN INDEPENDENT HISTORICAL PROJECT</span><span>PUBLIC SOURCES ONLY <i /> NO CLASSIFIED MATERIAL</span><span>EST. 1948 / HISTORICAL CONTEXT</span></div>
      </section>

      <section className="fact-ribbon" aria-label="Archive facts">
        <div className="wrap fact-grid">
          <div className="fact-item" data-reveal><span className="fact-number">1948</span><span className="fact-label">ESTABLISHMENT YEAR<br />AS REPORTED BY EUAA</span></div>
          <div className="fact-item" data-reveal><span className="fact-number">05</span><span className="fact-label">SELECTED HISTORICAL<br />TIMELINE ENTRIES</span></div>
          <div className="fact-item" data-reveal><span className="fact-number">04</span><span className="fact-label">REVIEWED ARCHIVAL<br />IMAGE RECORDS</span></div>
          <div className="fact-item fact-note" data-reveal><span className="fact-label">EDITORIAL PRINCIPLE</span><strong>Evidence before<br />interpretation.</strong></div>
        </div>
      </section>

      <section className="intro-section section-paper">
        <div className="wrap intro-grid">
          <div className="intro-aside" data-reveal><span className="eyebrow">01 / THE ARCHIVE</span><span className="vertical-index">A RECORD OF PUBLIC HISTORY</span></div>
          <div className="intro-main" data-reveal>
            <h2>A history told through<br /><em>what can be established.</em></h2>
            <div className="intro-lower"><p>The public record around an intelligence institution is necessarily incomplete. This archive brings together published research, country-of-origin information, historical reporting and carefully attributed military imagery to help readers examine the record without confusing fact with assumption.</p><div className="intro-quote"><span>“</span><strong>Historical literacy begins with knowing what a source can — and cannot — prove.</strong><small>EDITORIAL STANDARD / 001</small></div></div>
            <Link href="/about" className="text-link">READ OUR EDITORIAL STANDARD <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="roles-section section-navy">
        <div className="wrap">
          <SectionHeading index="02" kicker="INSTITUTIONAL CONTEXT" title={<>Publicly documented<br /><em>areas of work.</em></>} description="Broad functions described in open country information and historical research. These are not a disclosure of current internal departments, operational methods or classified capabilities." light action={{ label: "VIEW ALL PUBLIC ROLES", href: "/roles" }} />
          <RoleGrid items={roles.slice(0, 3)} />
          <div className="section-footnote light"><span>NOTE / 02.01</span><p>Public descriptions cannot establish the agency’s complete internal structure or current tasking. Each function is linked to its supporting public references.</p><Link href="/roles">READ THE LIMITATIONS ↗</Link></div>
        </div>
      </section>

      <section className="timeline-section section-paper">
        <div className="wrap">
          <SectionHeading index="03" kicker="A SELECTED CHRONOLOGY" title={<>Milestones in the<br /><em>public record.</em></>} description="A short chronology of selected institutional and regional turning points. Dates are kept at the level supported by the cited sources." action={{ label: "EXPLORE FULL HISTORY", href: "/history" }} />
          <TimelineList items={timeline.slice(0, 4)} compact />
          <div className="timeline-endnote"><span>CHRONOLOGY CONTINUES</span><Link href="/history">OPEN THE FULL TIMELINE <span>↗</span></Link></div>
        </div>
      </section>

      <section className="case-section section-warm">
        <div className="wrap">
          <SectionHeading index="04" kicker="HISTORICAL CASE STUDIES" title={<>Context before<br /><em>conclusion.</em></>} description="Selected episodes examined through chronology, source attribution and the limits of what public documentation establishes." action={{ label: "ALL CASE STUDIES", href: "/case-studies" }} />
          <div className="case-grid">{cases.map((item, index) => <CaseCard key={item.id} item={item} index={index} />)}</div>
        </div>
      </section>

      <section className="gallery-section section-navy">
        <div className="wrap">
          <SectionHeading index="05" kicker="PHOTOGRAPHIC RECORD" title={<>Images with a<br /><em>traceable provenance.</em></>} description="A small selection of Pakistani military-related photographs. Each item has its own caption, creator credit, original file page and licence record." light action={{ label: "OPEN THE GALLERY", href: "/gallery" }} />
          <div className="home-gallery-grid">{images.slice(0, 3).map((item, index) => <Link key={item.id} href="/gallery" className="home-gallery-item" data-reveal style={{ "--item-index": index } as CSSProperties}><div className="home-gallery-image"><ArchivePhoto src={item.assetUrl} alt={item.alt} sizes="(max-width: 700px) 100vw, 33vw" /><span>{item.id} / IMAGE</span><b>↗</b></div><div className="home-gallery-caption"><span>{item.date}</span><strong>{item.title}</strong></div></Link>)}</div>
          <div className="gallery-disclaimer"><span>IMAGE POLICY</span><p>General military photographs are contextual images only. They are not evidence of ISI personnel, headquarters or specific operations.</p><Link href="/image-credits">VIEW LICENCE REGISTER ↗</Link></div>
        </div>
      </section>

      <section className="research-section section-paper">
        <div className="wrap">
          <SectionHeading index="06" kicker="RESEARCH DESK" title={<>Reading the record,<br /><em>not repeating the myth.</em></>} description="Short editorial guides and historical analysis built around traceable public references." action={{ label: "ALL ARTICLES", href: "/articles" }} />
          <div className="article-list">{articles.map((item, index) => <ArticleRow key={item.id} item={item} index={index} />)}</div>
        </div>
      </section>

      <section className="method-section section-warm">
        <div className="wrap method-grid">
          <div className="method-title" data-reveal><span className="eyebrow">07 / HOW WE WORK</span><h2>Four labels.<br /><em>One standard.</em></h2><p>Evidence labels help readers distinguish between what is established, what is attributed and what remains open to debate.</p><Link href="/about#methodology" className="text-link">OUR RESEARCH METHOD <span>↗</span></Link></div>
          <div className="method-labels">
            <div data-reveal><Evidence value="Documented"/><p>Supported by strong primary evidence or multiple reliable independent sources.</p></div>
            <div data-reveal><Evidence value="Reported"/><p>Attributed to credible sources, but not fully confirmed by public primary evidence.</p></div>
            <div data-reveal><Evidence value="Disputed"/><p>Credible sources materially disagree or the attribution is contested.</p></div>
            <div data-reveal><Evidence value="Unverified"/><p>Insufficient reliable evidence. Not published as established fact.</p></div>
          </div>
        </div>
      </section>

      <section className="closing-section section-navy">
        <div className="wrap closing-inner" data-reveal><span className="eyebrow">THE RECORD REMAINS OPEN</span><h2>Read carefully.<br /><em>Question precisely.</em></h2><p>This archive is a starting point for informed reading, not a substitute for the source material itself.</p><div className="closing-actions"><Link href="/sources" className="button button-bronze">BROWSE THE SOURCE REGISTER ↗</Link><Link href="/about" className="button button-outline">ABOUT THE ARCHIVE</Link></div></div>
      </section>
    </>
  );
}
