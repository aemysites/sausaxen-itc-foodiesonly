/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have the correct header as per the requirements
  const headerRow = ['Hero (hero6)'];

  // Helper: Find the image in the current carousel structure
  let imgEl = null;
  let slide = null;
  const ulSlider = element.querySelector('.carousel .slider');
  if (ulSlider) {
    slide = ulSlider.querySelector('li.slide');
    if (slide) {
      imgEl = slide.querySelector('img');
    }
  }
  // 2nd row: Background image (optional). Only add if exists.
  const imageRow = [imgEl ? imgEl : ''];

  // 3rd row: Title, subheading, CTA (all optional)
  // In the HTML, these are usually inside .absolute-content-carousel as <p> or heading tags.
  let contentNodes = [];
  if (slide) {
    const absContent = slide.querySelector('.absolute-content-carousel');
    if (absContent) {
      // Only include non-empty elements (strip fade-out class elements with empty text)
      contentNodes = Array.from(absContent.children).filter(el => {
        return el.textContent && el.textContent.trim() !== '';
      });
    }
  }
  // If nothing found, insert empty string for cell
  const contentRow = [contentNodes.length ? contentNodes : ''];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the table block using referenced elements
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
