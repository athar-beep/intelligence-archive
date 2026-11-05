import type { Metadata } from "next";
import { CaseCard, PageHero, SectionHeading } from "@/components/editorial";
import { cases } from "@/lib/content";
export const metadata: Metadata = { title: "Historical Case Studies", description: "Selected episodes in Pakistan's intelligence and security history, examined through public evidence and careful attribution." };
export default function CaseStudiesPage() { return <>
  <PageHero label="HISTORICAL CASE STUDIES / 03" title={<>Episodes, examined<br /><em>in context.</em></>} description="These case studies explore selected episodes in Pakistan’s intelligence and security history. They distinguish public documentation from interpretation and do not assume that every major security event was an ISI operation." meta={["03 SELECTED STUDIES", "PUBLIC ATTRIBUTION ONLY", "SOURCE-LINKED"]} />
  <section className="section-paper content-section"><div className="wrap"><SectionHeading kicker="THE CASE FILES" title={<>A careful reading of<br /><em>complex events.</em></>} description="Open a case file for its historical setting, source-supported chronology, attribution note and further references." /><div className="case-grid case-grid-wide">{cases.map((item, index) => <CaseCard key={item.id} item={item} index={index} />)}</div><div className="case-method-note"><span>ATTRIBUTION STANDARD</span><p>A case study may discuss the ISI where public sources support that connection. It will not convert contextual involvement, secondary reporting or disputed allegations into a confirmed operational claim.</p></div></div></section>
</>; }
