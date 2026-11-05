import type { Metadata } from "next";
import Link from "next/link";
import { ArchivePhoto } from "@/components/archive-photo";
import { PageHero, SectionHeading } from "@/components/editorial";
import { images } from "@/lib/content";
export const metadata: Metadata = { title: "Image Credits & Licences", description: "Individual creator, source, reuse licence and attribution records for the archive's four selected photographs." };
export default function ImageCreditsPage() { return <>
  <PageHero label="IMAGE CREDITS / 07" title={<>Every image has<br /><em>a paper trail.</em></>} description="The following register records the exact file title, credited creator, source page, stated licence, caption and intended use for every photograph in this release." meta={["04 INDIVIDUAL RECORDS", "WIKIMEDIA COMMONS", "LICENCE REVIEW"]} />
  <section className="section-paper content-section"><div className="wrap"><SectionHeading kicker="IMAGE LICENCE REGISTER" title="Asset-by-asset attribution" description="Reuse permissions apply to each file individually. Verify the original file-description page and the licence terms again before redistribution or commercial use." />
    <div className="credit-register">{images.map((item, index) => <article className="credit-record" key={item.id} data-reveal><div className="credit-image"><ArchivePhoto src={item.assetUrl} alt={item.alt} sizes="(max-width: 760px) 100vw, 34vw"/><span>{item.id} / {String(index + 1).padStart(2, "0")}</span></div><div className="credit-body"><div className="eyebrow">{item.date} · {item.creator}</div><h3>{item.title}</h3><p>{item.depicts}</p><div className="credit-data"><div><span>LICENCE</span><strong>{item.license}</strong></div><div><span>CAPTION</span><strong>{item.caption}</strong></div><div><span>ATTRIBUTION</span><strong>{item.attribution}</strong></div><div><span>EDITS</span><strong>{item.edits}</strong></div></div><div className="credit-links"><Link href={item.sourcePage} target="_blank">ORIGINAL FILE PAGE ↗</Link><Link href={item.licenseUrl} target="_blank">LICENCE TERMS ↗</Link></div></div></article>)}</div>
    <div className="source-method"><span className="eyebrow">IMPORTANT REUSE NOTICE</span><p>Wikimedia Commons file-page licensing is not a blanket licence for every file in a category. This register records the stated status found on each individual file page. Public-domain status may depend on jurisdiction. The site does not bundle the original image binaries; the browser loads the files from Wikimedia Commons.</p></div>
  </div></section>
</>; }
