import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import logger from "../config/logger.config.js";
import TurnDownService from "turndown";

export async function sanitizeMarkdown(markdown: string): Promise<string> {
  if (!markdown || typeof markdown !== "string") {
    return "";
  }

  try {
    const convertedHtml = await marked.parse(markdown);
    const sanitizedHtml = sanitizeHtml(convertedHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "pre",
        "code",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "width", "height"],
        a: ["href", "target", "rel"],
        pre: ["class"],
        code: ["class"],
      },
      allowedSchemes: ["http", "https", "data"],
      allowedSchemesByTag: {
        img: ["data", "http", "https"],
      },
    });

    const tds = new TurnDownService();
    const sanitizedMarkdown = tds.turndown(sanitizedHtml);

    return sanitizedMarkdown;
  } catch (error) {
    logger.error("Error sanitizing markdown:", error);
    return "";
  }
}
