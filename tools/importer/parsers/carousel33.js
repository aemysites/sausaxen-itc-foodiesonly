/* global WebImporter */
export default function parse(element, { document }) {
  // Table header per requirements - exactly one column, block name only
  const headerRow = ['Carousel'];

  // Find the video element
  const video = element.querySelector('video');

  // Only reference the video element directly (do not clone)
  // If there is no video, handle gracefully
  let tableRow;
  if (video) {
    // Compose the row with the video element ONLY, as per the example
    tableRow = [video];
  } else {
    // If no video, leave cell empty
    tableRow = [''];
  }

  // Compose the table: always two rows, each with exactly one column
  const cells = [
    headerRow,
    tableRow
  ];

  // Build and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
