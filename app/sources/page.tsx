import type { Metadata } from "next";
import { PageHero, SectionHeading, SourceList } from "@/components/editorial";
import { sources } from "@/lib/content";
export const metadata: Metadata = { title: "Sources & Bibliography", description: "A bibliography of country guidance, research publications, historical reporting and secondary scholarship used by the archive." };
export default function SourcesPage() { const groups = [...new Set(sources.map((item) => item.kind))]; return <>
  <PageHero label="SOURCE REGISTER / 06" title={<>Follow the reference.<br /><em>Inspect the source.</em></>} description="The archive uses public country information, Congressional Research Service reports, academic publications and specialist historical scholarship. The type and date of each source are part of its meaning." meta={[`${sources.length} REFERENCES`, "PUBLICATIONS & REPORTS", "OUTBOUND SOURCE LINKS"]} />
  <section className="section-paper content-section"><div className="wrap"><SectionHeading kicker="BIBLIOGRAPHY" title="The research behind the record" description="Open any entry to visit the original publication or source page. A source link is not an endorsement; readers should inspect its methods, citations and limitations." />
    {groups.map((group) => <section className="source-group" key={group}><div className="source-group-heading"><span>{group.toUpperCase()}</span><small>{sources.filter((item) => item.kind === group).length.toString().padStart(2, "0")} RECORDS</small></div><SourceList items={sources.filter((item) => item.kind === group)} /></section>)}
    <div className="source-method"><span className="eyebrow">SOURCE HANDLING</span><p>Publication date and event date are recorded separately. Country guidance is treated as a synthesis, not a court judgment. Historical monographs and policy reports are secondary sources unless a specific primary document is identified. Where sources conflict, the archive preserves the disagreement.</p></div>
  </div></section>
</>; }
