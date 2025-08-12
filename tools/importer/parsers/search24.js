/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must match example exactly
  const headerRow = ['Search (search24)'];

  // preserve ALL text and structure from the source block
  // Reference the original element content rather than cloning or extracting pieces
  const contentContainer = document.createElement('div');
  // Move all children of the element into the container, preserving all text and HTML
  while (element.firstChild) {
    contentContainer.appendChild(element.firstChild);
  }

  // Required: include the query index link in the cell
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // Final: both content and link are referenced directly in a single cell
  const cells = [
    headerRow, // header is always a single column
    [[contentContainer, link]], // content cell: all block content + required link
  ];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}