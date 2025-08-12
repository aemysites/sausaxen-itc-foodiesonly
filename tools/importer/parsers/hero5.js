/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const header = ['Hero (hero5)'];

  // 2nd row: Background image - none present in the HTML, so blank
  const bgRow = [''];

  // 3rd row: Title + subheading, from the .heading-text div (preserves all structure)
  let mainContent;
  // Defensive: find the heading text block, fallback to the overall container if missing
  const headingText = element.querySelector('.heading-text');
  if (headingText) {
    mainContent = headingText;
  } else {
    mainContent = element;
  }

  const rows = [
    header,
    bgRow,
    [mainContent]
  ];

  // Build table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
