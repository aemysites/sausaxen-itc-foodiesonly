/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct .box-container children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > .box-container'));

  // Each cell is the .box-container itself (to preserve bubble + text)
  const columnCells = columns.map(col => col);

  // Header row: single column only
  const headerRow = ['Columns (columns34)'];
  // Data row: as many columns as found
  const tableRows = [headerRow, columnCells];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
