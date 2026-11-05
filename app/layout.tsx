import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { BackToTop, MotionLayer, ScrollProgress } from "@/components/motion-layer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Intelligence Archive — Pakistan",
    template: "%s | The Intelligence Archive — Pakistan"
  },
  description: "An independent historical and educational archive exploring Pakistan’s Inter-Services Intelligence Directorate through publicly documented history, research and archival imagery.",
  applicationName: "The Intelligence Archive — Pakistan",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  keywords: ["Pakistan", "ISI", "intelligence history", "historical archive", "research", "public sources"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "The Intelligence Archive — Pakistan",
    description: "A public-facing record of institutional history, historical context and documented debate.",
    siteName: "The Intelligence Archive — Pakistan"
  },
  twitter: { card: "summary_large_image", title: "The Intelligence Archive — Pakistan" },
  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = {
  themeColor: "#101d2b",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">SKIP TO CONTENT</a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main-content" className="page-shell">{children}</main>
        <SiteFooter />
        <MotionLayer />
        <BackToTop />
      </body>
    </html>
  );
}
