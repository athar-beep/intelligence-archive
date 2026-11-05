import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync(new URL("../lib/archive-data.json", import.meta.url), "utf8"));
const failures = [];
const sourceIds = new Set(data.sources.map((item) => item.id));

function unique(items, label) {
  const ids = items.map((item) => item.id ?? item.n);
  if (new Set(ids).size !== ids.length) failures.push(`${label}: duplicate identifiers found`);
}
function checkSourceRefs(items, label) {
  for (const item of items) {
    for (const id of item.sources ?? []) {
      if (!sourceIds.has(id)) failures.push(`${label} "${item.title}": missing source reference ${id}`);
    }
  }
}

unique(data.sources, "sources");
unique(data.images, "images");
unique(data.roles, "roles");
unique(data.cases, "case studies");
unique(data.articles, "articles");
checkSourceRefs(data.timeline, "timeline");
checkSourceRefs(data.roles, "roles");
checkSourceRefs(data.cases, "case studies");
checkSourceRefs(data.articles, "articles");

for (const image of data.images) {
  for (const field of ["title", "creator", "sourcePage", "assetUrl", "license", "attribution", "depicts", "alt", "caption"]) {
    if (!image[field]) failures.push(`image ${image.id}: required field "${field}" is empty`);
  }
  if (!image.assetUrl.startsWith("https://upload.wikimedia.org/")) failures.push(`image ${image.id}: unexpected asset host`);
  if (!image.sourcePage.startsWith("https://commons.wikimedia.org/wiki/File:")) failures.push(`image ${image.id}: invalid Commons file page URL`);
}

for (const article of data.articles) if (!Array.isArray(article.body) || article.body.length === 0) failures.push(`article ${article.id}: body is empty`);
for (const item of data.cases) if (!Array.isArray(item.body) || item.body.length === 0) failures.push(`case ${item.id}: body is empty`);

if (failures.length) {
  console.error("Archive content validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Archive content validation passed.");
console.log(`${data.sources.length} sources · ${data.images.length} image records · ${data.roles.length} role entries · ${data.timeline.length} timeline entries · ${data.cases.length} case studies · ${data.articles.length} research articles`);
