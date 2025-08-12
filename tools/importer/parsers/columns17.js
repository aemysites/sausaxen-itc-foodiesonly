/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Must exactly match the example
  const headerRow = ['Columns (columns17)'];

  // Select both directions-detail-container blocks (each represents a column)
  const containers = Array.from(element.querySelectorAll(':scope > .set-width > .directions-detail-container'));

  // Defensive: If no columns, just remove element
  if (!containers.length) {
    element.remove();
    return;
  }

  // Each column will contain both text and video, as in screenshot
  const columnCells = containers.map((container) => {
    // Get the text content block
    const detail = container.querySelector('.directions-detail');
    let textBlock = null;
    if (detail) {
      const textContainer = detail.querySelector('.directions-detail-text-container');
      if (textContainer) textBlock = textContainer;
    }

    // Get the video element (not a link)
    const video = container.querySelector('video');

    // Compose a div to hold both the text and video in the same cell
    const colDiv = document.createElement('div');
    if (textBlock) colDiv.appendChild(textBlock);
    if (video) colDiv.appendChild(video);

    return colDiv;
  });

  // Compose table rows
  const cells = [
    headerRow,
    columnCells
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
