"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { images, type ArchiveImage } from "@/lib/content";

const filters = ["All images", "Army", "Historical", "Portrait"];
function categoryFor(item: ArchiveImage) {
  if (/Janjua|portrait/i.test(item.title)) return "Portrait";
  if (/1965|tank|soldier/i.test(`${item.title} ${item.depicts}`)) return "Historical";
  return "Army";
}

export function GalleryExplorer({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const [active, setActive] = useState("All images");
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected === null ? null : images[selected];
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const visible = useMemo(() => images.filter((item) => active === "All images" || categoryFor(item) === active), [active]);

  const move = useCallback((delta: number) => {
    setSelected((index) => {
      if (index === null) return null;
      return (index + delta + images.length) % images.length;
    });
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!nodes?.length) return;
        const first = nodes[0]; const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.classList.add("dialog-open");
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.classList.remove("dialog-open");
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [selected, move]);

  const displayImages = featuredOnly ? visible.slice(0, 3) : visible;

  return (
    <>
      <div className="gallery-toolbar">
        <div className="gallery-filters" role="group" aria-label="Filter photographs">
          {filters.map((filter) => <button type="button" key={filter} onClick={() => setActive(filter)} className={active === filter ? "filter-chip selected" : "filter-chip"} aria-pressed={active === filter}>{filter}<span>{filter === "All images" ? images.length : images.filter((item) => categoryFor(item) === filter).length}</span></button>)}
        </div>
        <span className="gallery-count">{displayImages.length.toString().padStart(2, "0")} RECORDS DISPLAYED</span>
      </div>
      <div className="gallery-grid">
        {displayImages.map((item) => {
          const index = images.findIndex((image) => image.id === item.id);
          return (
            <button type="button" className="gallery-tile" key={item.id} onClick={() => setSelected(index)} aria-label={`Open image: ${item.title}`}>
              <div className="gallery-tile-image"><Image src={item.assetUrl} alt={item.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" unoptimized onError={(event) => { event.currentTarget.src = "/archive-photograph-unavailable.svg"; }} /><span className="gallery-open-mark">↗</span><span className="gallery-image-id">{item.id} / ARCHIVE IMAGE</span></div>
              <div className="gallery-tile-copy"><span className="gallery-category">{categoryFor(item)} · {item.date}</span><strong>{item.title}</strong><small>{item.creator} <i /> {item.license.includes("Creative Commons") ? "CREATIVE COMMONS" : "PUBLIC DOMAIN CLAIM"}</small></div>
            </button>
          );
        })}
      </div>
      {displayImages.length === 0 && <div className="empty-state">No images in this category.</div>}
      {current && (
        <div className="lightbox-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label={`Image detail: ${current.title}`} tabIndex={-1}>
            <div className="lightbox-top"><span>ARCHIVE IMAGE / {current.id}</span><button ref={closeButtonRef} type="button" onClick={() => setSelected(null)} aria-label="Close image viewer">CLOSE <b>×</b></button></div>
            <div className="lightbox-visual"><Image src={current.assetUrl} alt={current.alt} fill sizes="90vw" priority unoptimized onError={(event) => { event.currentTarget.src = "/archive-photograph-unavailable.svg"; }} /></div>
            <div className="lightbox-caption"><div><span className="eyebrow">{current.date} · {current.creator}</span><h3>{current.title}</h3><p>{current.caption}</p></div><div className="lightbox-credit"><span>LICENCE</span><strong>{current.license}</strong><a href={current.sourcePage} target="_blank" rel="noreferrer">VIEW ORIGINAL FILE PAGE ↗</a><a href={current.licenseUrl} target="_blank" rel="noreferrer">READ LICENCE TERMS ↗</a></div></div>
            <div className="lightbox-controls"><button type="button" onClick={() => move(-1)}>← PREVIOUS</button><span>{String(selected! + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span><button type="button" onClick={() => move(1)}>NEXT →</button></div>
          </section>
        </div>
      )}
    </>
  );
}

export function BookmarkButton({ id, title }: { id: string; title: string }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem("archive-reading-list") || "[]") as string[];
      setSaved(savedItems.includes(id));
    } catch { setSaved(false); }
  }, [id]);

  const toggle = () => {
    try {
      const savedItems = JSON.parse(localStorage.getItem("archive-reading-list") || "[]") as string[];
      const next = saved ? savedItems.filter((item) => item !== id) : [...savedItems, id];
      localStorage.setItem("archive-reading-list", JSON.stringify(next));
      window.dispatchEvent(new Event("archive:bookmarks"));
      setSaved(!saved);
    } catch { setSaved(false); }
  };

  return <button type="button" className={`bookmark-button ${saved ? "saved" : ""}`} onClick={toggle} aria-pressed={saved}><span>{saved ? "✓" : "+"}</span>{saved ? "SAVED TO READING LIST" : `SAVE “${title.toUpperCase()}”`}</button>;
}

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const next = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
        setProgress(next);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div className="reading-progress" ref={bar} style={{ width: `${progress}%` }} aria-hidden="true" />;
}

export function CorrectionNote() {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [detail, setDetail] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = `THE INTELLIGENCE ARCHIVE — CORRECTION NOTE\n\nContact (optional): ${email || "Not supplied"}\nPage / reference: ${reference || "Not supplied"}\n\nSuggested correction:\n${detail}\n\nThis note was generated locally. It has not been sent to the archive.`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "archive-correction-note.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };
  return (
    <form className="correction-form" onSubmit={submit}>
      <label>YOUR EMAIL <span>OPTIONAL</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" /></label>
      <label>PAGE OR SOURCE REFERENCE<input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="e.g. History / S2" /></label>
      <label>DETAILS OF THE CORRECTION<textarea required minLength={20} rows={5} value={detail} onChange={(event) => setDetail(event.target.value)} placeholder="Describe the factual issue and provide a public source where possible…" /></label>
      <button type="submit" className="button button-bronze">{downloaded ? "DOWNLOAD ANOTHER NOTE ↗" : "GENERATE CORRECTION NOTE ↗"}</button>
      {downloaded && <p className="form-feedback">Your correction note has been downloaded locally. This form does not transmit data.</p>}
    </form>
  );
}
