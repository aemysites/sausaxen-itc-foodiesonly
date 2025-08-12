/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the example
  const headerRow = ['Search (search19)'];

  // Collect all direct children to ensure all content and text is retained
  // This captures heading, search input placeholder, button, and any other visible text
  // Do not clone, reference existing nodes
  const contentEls = Array.from(element.children);

  // Fallback: If for some reason contentEls is empty, use the element itself
  const contentCell = contentEls.length ? contentEls : [element];

  // Add query index link as required by block spec/example
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // The cell should include all the block's content and then the link
  // This ensures all text is maintained and no text is missed
  const cellContents = [...contentCell, link];

  // Create the block table
  const cells = [
    headerRow,
    [cellContents]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
