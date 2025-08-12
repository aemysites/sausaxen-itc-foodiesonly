/* global WebImporter */
export default function parse(element, { document }) {
  // Header row uses exact block name
  const headerRow = ['Hero (hero7)'];

  // Image row: None present in these HTMLs, so keep empty string
  const imageRow = [''];

  // Title row: Use the element itself, preserving structure & formatting.
  // DO NOT clone, reference the actual element to preserve styles and allow for future modification.
  // However, if we replace element, we need something to put in the table.
  // So, move its children to a new container (h1), preserving semantic meaning and all text
  const h1 = document.createElement('h1');
  // Move children instead of clone so we don't duplicate content
  while (element.firstChild) {
    h1.appendChild(element.firstChild);
  }
  
  // Table cells: each row is a 1-item array
  const cells = [
    headerRow,
    imageRow,
    [h1]
  ];
  
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element with the block table
  element.replaceWith(block);
}
