import data from "./archive-data.json";

export type ArchiveSource = (typeof data.sources)[number];
export type ArchiveImage = (typeof data.images)[number];
export type ArchiveRole = (typeof data.roles)[number];
export type ArchiveTimelineItem = (typeof data.timeline)[number];
export type ArchiveCase = (typeof data.cases)[number];
export type ArchiveArticle = (typeof data.articles)[number];

export const archive = data;
export const sources = data.sources;
export const images = data.images;
export const roles = data.roles;
export const timeline = data.timeline;
export const cases = data.cases;
export const articles = data.articles;

export function sourceById(id: string) {
  return sources.find((source) => source.id === id);
}

export function sourcesFor(ids: string[]) {
  return ids.map(sourceById).filter((source): source is ArchiveSource => Boolean(source));
}

export function imageById(id: string) {
  return images.find((image) => image.id === id);
}

export function articleBySlug(slug: string) {
  return articles.find((article) => article.id === slug);
}

export function caseBySlug(slug: string) {
  return cases.find((entry) => entry.id === slug);
}

export const navigation = [
  { label: "Home", href: "/" },
  { label: "History", href: "/history" },
  { label: "Documented roles", href: "/roles" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Gallery", href: "/gallery" },
  { label: "Research", href: "/articles" },
  { label: "About", href: "/about" }
];

export function titleCaseStatus(status: string) {
  if (/reported/i.test(status)) return "Reported";
  if (/disputed|contested|debated/i.test(status)) return "Disputed";
  if (/documented/i.test(status)) return "Documented";
  return status;
}
