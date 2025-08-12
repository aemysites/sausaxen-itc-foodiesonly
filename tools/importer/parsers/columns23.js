/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must match the example exactly
  const headerRow = ['Columns (columns23)'];

  // 2. Get both column containers from the HTML
  const leftCol = element.querySelector('.vegLeftCurve');
  const rightCol = element.querySelector('.vegRightCurve');

  // Defensive: If either column is missing, fallback to empty content
  const leftCellContent = leftCol ? [
    ...leftCol.querySelectorAll('img'),
    leftCol.querySelector('.leftCurveTextDiv')
  ].filter(Boolean) : [];

  const rightCellContent = rightCol ? [
    ...rightCol.querySelectorAll('img'),
    rightCol.querySelector('.rightCurveTextDiv')
  ].filter(Boolean) : [];

  // Final table structure: header and one row with two columns
  const cells = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
