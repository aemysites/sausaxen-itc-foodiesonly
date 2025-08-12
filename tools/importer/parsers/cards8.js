/* global WebImporter */
export default function parse(element, { document }) {
  // There is no content in the provided HTML elements (they are just empty divs), so only the header row will be created
  const headerRow = ['Cards (cards8)'];
  const cells = [headerRow];
  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
