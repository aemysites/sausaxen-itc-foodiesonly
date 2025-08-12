/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell array
  const headerRow = ['Columns (columns1)'];

  // Extract three logical columns from the footer block
  // 1. Logo
  let logoAnchor = element.querySelector('a.footer_foodiesImage__qwpQH');
  // 2. Subscribe Form
  let subscribeDiv = element.querySelector('.footer_subscribeMainDiv__Bg4Bv');
  // 3. Page links/flex div
  let flexDiv = null;
  Array.from(element.children).forEach((child) => {
    if (child.style && child.style.display === 'flex') {
      flexDiv = child;
    }
  });
  // Fallback: if no flex div found, try by class
  if (!flexDiv) {
    flexDiv = element.querySelector('.footer_pagesList__SpW_J');
  }

  // Defensive: if any are missing, replace with empty div
  const col1 = logoAnchor || document.createElement('div');
  const col2 = subscribeDiv || document.createElement('div');
  const col3 = flexDiv || document.createElement('div');

  // Compose table: header row single cell, second row three columns
  const cells = [
    headerRow,
    [col1, col2, col3]
  ];

  // Build and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
