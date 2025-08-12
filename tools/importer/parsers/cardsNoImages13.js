/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row from the block name & variant
  const headerRow = ['Cards (cardsNoImages13)'];
  const rows = [headerRow];

  // Get all direct box-containers, each is a card
  const cardContainers = element.querySelectorAll(':scope > .box-container');
  cardContainers.forEach((card) => {
    // The card text is in the .blank-box div inside the container
    const labelDiv = card.querySelector('.blank-box');
    if (labelDiv && labelDiv.textContent.trim()) {
      // Do not clone, reference the actual element
      const strong = document.createElement('strong');
      strong.textContent = labelDiv.textContent.trim();
      rows.push([strong]);
    }
  });

  // Edge case: if no cards found, don't output anything
  if (rows.length === 1) return;

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
