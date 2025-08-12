/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by the block spec and example
  const headerRow = ['Hero (hero12)'];

  // Row 2: Background image (none in this HTML, so empty string)
  const imageRow = [''];

  // Row 3: Title/subheading etc. Use the full <h2> tree as a reference.
  // Reference the <h2> element only if it exists, else empty string for robustness
  const h2 = element.querySelector('h2');
  const contentRow = [h2 ? h2 : ''];

  // Compose table cells array
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}