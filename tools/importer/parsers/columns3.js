/* global WebImporter */
export default function parse(element, { document }) {
  // Find all step containers (immediate children)
  const stepContainers = element.querySelectorAll(':scope > .set-width > .directions-detail-container');

  // We'll construct two arrays for each column per row
  const leftColumn = [];
  const rightColumn = [];

  stepContainers.forEach(step => {
    // Find the directions-detail-text-container (left content)
    const textContainer = step.querySelector('.directions-detail-text-container');
    if (textContainer) {
      leftColumn.push(textContainer);
    } else {
      leftColumn.push('');
    }
    // Find the video (right content)
    const video = step.querySelector('video');
    if (video) {
      rightColumn.push(video);
    } else {
      rightColumn.push('');
    }
  });

  // Header row as in the requirements and example
  const headerRow = ['Columns (columns3)'];

  // Each step is a row with two columns (left: text, right: video)
  const tableRows = [headerRow];
  for (let i = 0; i < stepContainers.length; i++) {
    tableRows.push([leftColumn[i], rightColumn[i]]);
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
