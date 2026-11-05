# The Intelligence Archive — Pakistan

**Next.js App Router · React · TypeScript · Responsive editorial archive**

An independent historical and educational archive about Pakistan’s Inter-Services Intelligence Directorate and related publicly documented security history.

> **Non-affiliation notice:** This is an independent project. It is not affiliated with, endorsed by, or operated by the Government of Pakistan, ISI, Pakistan Army, Pakistan Navy, Pakistan Air Force, ISPR, or another public authority. It does not claim access to classified material or privileged contacts.

## Technology

- Next.js App Router (React Server Components by default)
- React 19 and TypeScript
- CSS motion system using Intersection Observer, CSS transitions/keyframes and requestAnimationFrame
- Next.js metadata, route-level metadata, `robots.ts` and `sitemap.ts`
- No database, login, analytics service, API key, paid UI kit or external animation dependency

The visual and motion system intentionally uses platform APIs instead of shipping a large animation runtime. Client components are limited to the controls that require browser state.

## What is included

### Pages and routes

| Route | Content |
|---|---|
| `/` | Cinematic split-screen homepage, archive indicators, roles, chronology, case studies, gallery and research previews |
| `/history` | Founding context, institutional history and selected timeline |
| `/roles` | Five high-level, source-attributed areas of publicly described work and limitations |
| `/case-studies` | Three selected historical case files |
| `/case-studies/[slug]` | Full case-study detail, attribution note and source citations |
| `/gallery` | Filterable archival gallery and keyboard-operable lightbox |
| `/articles` | Research desk and article index |
| `/articles/[slug]` | Long-form research article, section navigation, reading progress and local bookmark |
| `/sources` | Grouped public bibliography with external source links |
| `/image-credits` | Four individual image-source and licence records |
| `/about` | Editorial methodology, image policy, corrections-note generator and disclaimer |

### Interaction and animation

- Scroll-aware top progress rule.
- Staggered section reveals with Intersection Observer.
- Cinematic hero image entrance and restrained page entrance.
- Hover movement and image zoom on editorial cards and gallery imagery.
- Mobile navigation drawer with sequential link entrance.
- Global archive search with `Ctrl + K` / `⌘ + K` shortcut.
- Gallery category filters and modal viewer with previous/next, arrow keys, Escape, focus return and tab trapping.
- Local reading-list bookmarks stored only in the visitor’s browser.
- Reading progress for long-form articles.
- Correction-note text file generated locally; nothing is transmitted.
- `prefers-reduced-motion` support and keyboard-visible focus states.

## Requirements

- Node.js **20.9 or later** (Node.js 22 LTS recommended).
- npm 10 or a compatible package manager.
- Internet access for the first dependency install and for the remotely hosted Wikimedia photographs / optional Google Fonts.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run validate:content
npm run typecheck
npm run lint
npm run build
npm run start
```

The production server normally listens on `http://localhost:3000`.

## Deployment configuration

Before deployment, set the final public URL:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

`app/sitemap.ts` and the metadata base use this variable. The default `https://example.com` is a placeholder and must be replaced for a real deployment. Configure the same variable in the hosting provider’s build environment.

This project uses the standard Next.js server runtime (`next start`); it is not configured as a static HTML export. Deploy to a platform that supports Next.js, such as Vercel or a compatible Node.js host.

## Content maintenance

- Structured content and metadata: `lib/archive-data.json`
- Shared content types and selectors: `lib/content.ts`
- App Router pages: `app/`
- Reusable React UI: `components/`
- Visual system and responsive behaviour: `app/globals.css`
- Image-credit register: `docs/IMAGE-CREDITS.md`
- Source bibliography: `docs/SOURCES.md`
- Fallback image and favicon: `public/`

For each significant historical claim, preserve the citation ID and the status label. Use `Documented`, `Reported`, `Disputed` and `Unverified` carefully. Keep publication dates separate from event dates. Do not infer ISI attribution from general military imagery or contextual events.

## Image delivery and licensing note

The four image records retain their original Wikimedia Commons file pages, creator/author credits, stated licence, attribution wording and depiction notes. The photographs are requested directly from `upload.wikimedia.org` and are **not bundled locally** in this package. This preserves the original asset without creating an unreviewed derivative, but it means gallery images require an internet connection and remain dependent on Wikimedia image delivery.

Before redistributing or monetising the site, revisit every individual Commons file-description page and verify that its licence, copyright rationale and attribution requirements remain valid for the intended use. Do not assume category membership or public availability grants reuse permission. If you later store images locally, preserve the exact licence conditions and update the register and `assetUrl` values.

## Evidence and editorial limitations

- The archive is a selective introduction, not a complete institutional history.
- Public reporting cannot establish every internal structure, current classified capability, confidential source, active target or operational detail.
- The EUAA country-guidance source is a synthesis, not a court judgment.
- Congressional Research Service reports are historical policy sources and should be read in their original publication context.
- Historical case studies distinguish documented cooperation from disputed attribution and do not claim that every later Afghan or regional event was an ISI action.

## Validation status

- [x] Original source dataset migrated into JSON and preserved.
- [x] App Router page and dynamic route files created.
- [x] All TS/TSX source files passed a TypeScript transpilation syntax scan.
- [x] Structured JSON parsed successfully; counts checked (10 sources, 4 images, 5 role entries, 5 timeline entries, 3 case studies, 3 articles).
- [x] Responsive breakpoints include 320px layouts; reduced-motion CSS is present.
- [ ] Dependency installation and `next build` could not be completed in the creation environment because npm registry access timed out. Run the production commands above after `npm install` on a machine with registry access.
- [ ] Perform final browser visual review on desktop, tablet and Android mobile after install; remote image delivery and font availability depend on the deployment network.
