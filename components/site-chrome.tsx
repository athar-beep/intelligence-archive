"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { articles, cases, images, navigation, roles, sources, timeline } from "@/lib/content";

const searchable = [
  ...articles.map((item) => ({ title: item.title, detail: `${item.category} · ${item.reading}`, href: `/articles/${item.id}`, text: item.summary })),
  ...cases.map((item) => ({ title: item.title, detail: `${item.category} · ${item.year}`, href: `/case-studies/${item.id}`, text: item.summary })),
  ...timeline.map((item) => ({ title: item.title, detail: `Timeline · ${item.date}`, href: "/history", text: item.summary })),
  ...images.map((item) => ({ title: item.title, detail: `Gallery · ${item.license}`, href: "/gallery", text: item.caption })),
  ...roles.map((item) => ({ title: item.title, detail: "Publicly documented role", href: "/roles", text: `${item.summary} ${item.evidence}` })),
  ...sources.map((item) => ({ title: item.title, detail: `${item.publisher} · ${item.date}`, href: `/sources#${item.id}`, text: `${item.short} ${item.note}` }))
];

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="The Intelligence Archive — home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span className="brand-type"><strong>THE INTELLIGENCE</strong><em>ARCHIVE · PAKISTAN</em></span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const savedEntries = useMemo(() => savedIds.flatMap((id) => {
    if (id.startsWith("article-")) { const item = articles.find((entry) => entry.id === id.slice(8)); return item ? [{ id, title: item.title, href: `/articles/${item.id}` }] : []; }
    if (id.startsWith("case-")) { const item = cases.find((entry) => entry.id === id.slice(5)); return item ? [{ id, title: item.title, href: `/case-studies/${item.id}` }] : []; }
    return [];
  }), [savedIds]);

  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    if (!q) return searchable.slice(0, 5);
    return searchable.filter((item) => `${item.title} ${item.detail} ${item.text}`.toLocaleLowerCase().includes(q)).slice(0, 7);
  }, [query]);

  const closeOverlays = useCallback(() => {
    setSearchOpen(false);
    setSavedOpen(false);
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    closeOverlays();
  }, [pathname, closeOverlays]);

  useEffect(() => {
    const syncSaved = () => {
      try { setSavedIds(JSON.parse(localStorage.getItem("archive-reading-list") || "[]") as string[]); }
      catch { setSavedIds([]); }
    };
    syncSaved();
    window.addEventListener("storage", syncSaved);
    window.addEventListener("archive:bookmarks", syncSaved);
    return () => { window.removeEventListener("storage", syncSaved); window.removeEventListener("archive:bookmarks", syncSaved); };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSavedOpen(false);
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setSavedOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => inputRef.current?.focus(), 40);
  }, [searchOpen]);

  return (
    <>
      <div className="independent-notice"><span className="notice-dot" /> Independent historical & educational archive <span className="notice-divider">/</span> Not affiliated with any government or military organisation</div>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <Link key={item.href} href={item.href} className={active ? "nav-link active" : "nav-link"}>{item.label}</Link>;
            })}
          </nav>
          <div className="header-actions">
            <button className="saved-trigger" onClick={() => { setSearchOpen(false); setSavedOpen(true); }} aria-label={`Open reading list, ${savedEntries.length} saved items`}><span>READING LIST</span><b>{savedEntries.length.toString().padStart(2, "0")}</b></button>
            <button className="search-trigger" onClick={() => { setSavedOpen(false); setSearchOpen(true); }} aria-label="Search the archive"><span className="search-glyph" /> <span>Search</span><kbd>⌘ K</kbd></button>
            <button className={`menu-trigger ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
          </div>
        </div>
        <div className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
          {navigation.map((item, index) => <Link key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1} style={{ "--menu-index": index } as CSSProperties}>{item.label}<span>↗</span></Link>)}
          <p>Public record. Independent research. Responsible attribution.</p>
        </div>
      </header>

      {savedOpen && (
        <div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSavedOpen(false); }}>
          <section className="search-panel saved-panel" role="dialog" aria-modal="true" aria-label="Your local reading list">
            <div className="search-panel-top"><span className="eyebrow">YOUR READING LIST · THIS DEVICE</span><button onClick={() => setSavedOpen(false)}>CLOSE <b>×</b></button></div>
            <div className="saved-panel-heading"><strong>Saved for<br /><em>later reading.</em></strong><span>{savedEntries.length.toString().padStart(2, "0")} ITEMS</span></div>
            {savedEntries.length ? <div className="search-results">{savedEntries.map((item, index) => <div className="saved-result" key={item.id}><span className="result-number">{String(index + 1).padStart(2, "0")}</span><Link href={item.href} className="result-copy"><strong>{item.title}</strong><small>{item.id.startsWith("article-") ? "RESEARCH ARTICLE" : "HISTORICAL CASE FILE"}</small></Link><button type="button" onClick={() => { const next = savedIds.filter((entry) => entry !== item.id); localStorage.setItem("archive-reading-list", JSON.stringify(next)); setSavedIds(next); window.dispatchEvent(new Event("archive:bookmarks")); }} aria-label={`Remove ${item.title} from reading list`}>×</button></div>)}</div> : <div className="search-empty">Your reading list is empty. Open any article or case file and use “Save” to keep it here.</div>}
            <div className="search-panel-foot"><span>STORED LOCALLY IN YOUR BROWSER</span><span>NO ACCOUNT REQUIRED</span></div>
          </section>
        </div>
      )}

      {searchOpen && (
        <div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
          <section className="search-panel" role="dialog" aria-modal="true" aria-label="Search the archive">
            <div className="search-panel-top"><span className="eyebrow">ARCHIVE INDEX</span><button onClick={() => setSearchOpen(false)} aria-label="Close search">ESC <b>×</b></button></div>
            <div className="search-input-wrap"><span className="search-glyph"/><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people, dates, topics, sources…" aria-label="Search query" /></div>
            <div className="search-results-label">{query ? `${results.length} MATCHING RECORD${results.length === 1 ? "" : "S"}` : "SUGGESTED RECORDS"}</div>
            <div className="search-results">
              {results.length ? results.map((item, index) => <Link key={`${item.href}-${item.title}`} href={item.href} className="search-result"><span className="result-number">0{index + 1}</span><span className="result-copy"><strong>{item.title}</strong><small>{item.detail}</small></span><span className="result-arrow">↗</span></Link>) : <div className="search-empty">No matching records. Try a broader term or a year such as “1948”.</div>}
            </div>
            <div className="search-panel-foot"><span>SEARCH IS LOCAL TO THIS ARCHIVE</span><span>ESC TO CLOSE</span></div>
          </section>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main wrap">
        <div className="footer-brand-block"><Brand /><p>A public-facing record of institutional history, historical context and documented debate. Carefully sourced. Independently maintained.</p><span className="footer-index">ARCHIVE EDITION 02 <i /> UPDATED 05 NOV 2026</span></div>
        <div className="footer-col"><span className="footer-label">EXPLORE</span><Link href="/history">Institutional history</Link><Link href="/roles">Publicly documented roles</Link><Link href="/case-studies">Historical case studies</Link><Link href="/gallery">Photographic archive</Link></div>
        <div className="footer-col"><span className="footer-label">RESEARCH</span><Link href="/articles">Research desk</Link><Link href="/sources">Source register</Link><Link href="/image-credits">Image credits & licences</Link><Link href="/about">Editorial methodology</Link></div>
        <div className="footer-note"><span className="footer-label">EDITORIAL NOTICE</span><p>This is an independent historical and educational project. It is not affiliated with, endorsed by, or operated by the Government of Pakistan, ISI, Pakistan Armed Forces or ISPR.</p><Link href="/about#corrections" className="footer-correction">Corrections & enquiries <span>↗</span></Link></div>
      </div>
      <div className="footer-bottom wrap"><span>© {new Date().getFullYear()} THE INTELLIGENCE ARCHIVE</span><span>PUBLIC SOURCES ONLY <i /> NO CLASSIFIED MATERIAL</span><Link href="/sources">SOURCE INDEX ↗</Link></div>
    </footer>
  );
}
