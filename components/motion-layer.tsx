"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionLayer() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((target) => observer.observe(target));
    });
    mutationObserver.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutationObserver.disconnect(); };
  }, [pathname]);

  return null;
}

export function ScrollProgress() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        document.documentElement.style.setProperty("--scroll-progress", `${Math.min(100, Math.max(0, progress * 100))}%`);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}

export function BackToTop() {
  useEffect(() => {
    const button = document.querySelector<HTMLElement>(".back-to-top");
    if (!button) return;
    const update = () => button.classList.toggle("visible", window.scrollY > 620);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <a className="back-to-top" href="#main-content" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }} aria-label="Back to top">↑</a>;
}
