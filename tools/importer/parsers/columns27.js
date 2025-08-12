/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with all suggestion items
  const suggestionContainer = element.querySelector('.home-carousel_mainSuggestionDiv__OZ8e_');
  if (!suggestionContainer) return;

  // Select all immediate suggestion items for columns
  const suggestions = suggestionContainer.querySelectorAll(':scope > .suggestion-list_filterContainerSuggestion__8sPsh');

  // Each suggestion becomes a column cell in the second row
  const columnCells = [];
  suggestions.forEach((suggestion) => {
    columnCells.push(suggestion);
  });

  // Fix: Header row must have exactly one column matching the example
  const tableRows = [
    ['Columns (columns27)'], // header row: single cell
    columnCells             // content row: one cell for each column
  ];

  // Create the block table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
