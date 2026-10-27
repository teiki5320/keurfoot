import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import { marked } from "marked";
import { withBase } from "@/lib/config";
import { CONSEIL_IMAGES } from "@/lib/data/conseils-images";
import { illustration } from "@/lib/illustrations";
import { anchorId, isPublished, parseConseil, relatedConseils, todayInParis, type Conseil } from "@/lib/conseils/article";

const DIR = join(process.cwd(), "content", "conseils");

/** Tous les articles, publiés ou programmés, du plus récent au plus ancien. */
export const getAllConseils = cache((): Conseil[] =>
  readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const image = illustration(`conseil-${slug}`);
      return { ...parseConseil(slug, readFileSync(join(DIR, f), "utf8")), image, imageCredit: image ? (CONSEIL_IMAGES[slug] ?? null) : null };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "fr")),
);

/** Articles publiés à la date du jour (heure de Paris). */
export function getConseils(today = todayInParis()): Conseil[] {
  return getAllConseils().filter((c) => isPublished(c, today));
}

export function getConseilBySlug(slug: string, today = todayInParis()): Conseil | null {
  return getConseils(today).find((c) => c.slug === slug) ?? null;
}

export function getRelatedConseils(conseil: Conseil, today = todayInParis()): Conseil[] {
  return relatedConseils(conseil, getConseils(today));
}

const escapeAttr = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Corps de l'article en HTML : ancres sur les parties, liens sûrs uniquement, pas de HTML brut. */
export function renderConseil(body: string): string {
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth, text }) {
    const inner = this.parser.parseInline(tokens);
    return depth === 2 ? `<h2 id="${anchorId(text)}">${inner}</h2>\n` : `<h${depth}>${inner}</h${depth}>\n`;
  };
  renderer.link = function ({ href, title, tokens }) {
    const inner = this.parser.parseInline(tokens);
    // Seuls les liens web, internes, ancres et e-mails sont acceptés (pas de « javascript: » ni de « //autre-site »).
    if (!/^(https?:|\/(?!\/)|#|mailto:)/i.test(href)) href = "#";
    const external = /^https?:/.test(href);
    const attrs = external ? ` target="_blank" rel="${/amazon\./.test(href) ? "sponsored nofollow " : ""}noopener noreferrer"` : "";
    if (href.startsWith("/")) href = withBase(href);
    return `<a href="${escapeAttr(href)}"${title ? ` title="${escapeAttr(title)}"` : ""}${attrs}>${inner}</a>`;
  };
  renderer.html = ({ text }) => escapeAttr(text);
  return marked.parse(body, { renderer, async: false });
}
