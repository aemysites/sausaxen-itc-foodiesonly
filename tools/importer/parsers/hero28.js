/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Hero (hero28)'];

  // Locate the image (background/decorative)
  let imageEl = null;
  // Find direct child img or descendant img
  imageEl = element.querySelector('img'); // Safe for both direct and nested

  // Edge case: no image found
  const imageRow = [imageEl ? imageEl : ''];

  // Locate the text/content container (usually a div)
  // Use direct child div if present, else fallback to element itself
  let textContainer = null;
  const directDiv = Array.from(element.children).find((child) => child.tagName === 'DIV');
  textContainer = directDiv || element;

  // Compose content row (all direct children of textContainer except any image)
  // This will include headings, paragraphs, buttons, etc.
  const contentParts = [];
  for (const node of textContainer.children) {
    // Exclude images (those are in imageRow)
    if (node.tagName !== 'IMG') {
      contentParts.push(node);
    }
  }
  // Edge case: If nothing found (e.g. all content is text nodes)
  if (contentParts.length === 0) {
    // If textContainer has text, put that in a <p>
    if (textContainer.textContent && textContainer.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = textContainer.textContent.trim();
      contentParts.push(p);
    } else {
      contentParts.push('');
    }
  }
  const contentRow = [contentParts.length === 1 ? contentParts[0] : contentParts];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with new table block
  element.replaceWith(block);
}
