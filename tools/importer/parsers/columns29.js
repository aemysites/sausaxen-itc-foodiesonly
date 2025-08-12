/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: Must match the example EXACTLY
  const headerRow = ['Columns (columns29)'];

  // 2. Get all major child elements of the block
  // We'll use immediate children to maintain structure and be resilient to variations.
  const children = Array.from(element.querySelectorAll(':scope > *'));

  // LEFT COLUMN: Heading, subtext, fruit bowl (column icons)
  // Find the heading (h2)
  const heading = children.find(el => el.tagName === 'H2');
  // Find main promo text (class="textDiv")
  const subText = children.find(el => el.classList.contains('textDiv'));
  // Find the fruit bowl div (with all column icons/links)
  const fruitBowlDiv = children.find(el => el.classList.contains('fruitBowlDiv'));

  const leftCol = [];
  if (heading) leftCol.push(heading);
  if (subText) leftCol.push(subText);
  if (fruitBowlDiv) leftCol.push(fruitBowlDiv);

  // RIGHT COLUMN: Full width desktop image only (as in example)
  // Pick desktop image (class="imageCLass_desktop")
  const desktopImg = children.find(el => el.tagName === 'IMG' && el.classList.contains('imageCLass_desktop'));

  const rightCol = [];
  if (desktopImg) rightCol.push(desktopImg);

  // 3. Compose the block table
  // If both columns are empty, do nothing
  if (leftCol.length === 0 && rightCol.length === 0) return;

  // If only one column present, still make 2 columns for resiliency
  const row = [leftCol, rightCol];

  // 4. Create the table with the header
  const cells = [
    headerRow,
    row
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the element in the DOM
  element.replaceWith(block);
}
