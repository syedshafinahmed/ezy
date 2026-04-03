/** True when HTML has no meaningful text and no images (empty or placeholder paragraphs). */
export function isRichTextEmpty(html: string): boolean {
  if (!html || !html.trim()) return true;
  if (/<img\s/i.test(html)) return false;
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text === "";
}
