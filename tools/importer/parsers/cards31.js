/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards31)'];

  // Find the cards container, robustly
  let cardsBlock = element.querySelector('.must-try-options');
  if (!cardsBlock) {
    // Traverse direct children to find .must-try-options
    const candidates = element.querySelectorAll(':scope > div, :scope > * > div');
    for (const c of candidates) {
      const found = c.querySelector('.must-try-options');
      if (found) {
        cardsBlock = found;
        break;
      }
    }
  }
  if (!cardsBlock) return;

  // Collect all cards (each is an <a> inside cardsBlock)
  const cardLinks = Array.from(cardsBlock.querySelectorAll(':scope > a'));
  if (cardLinks.length === 0) return;

  const rows = [headerRow];
  cardLinks.forEach((a) => {
    const cardContainer = a.querySelector('.must-try-container');
    if (!cardContainer) return;
    const img = cardContainer.querySelector('img');
    // Image is always present and used as-is
    // Text cell logic
    const textDiv = cardContainer.querySelector('.option1-text');
    let textCell = document.createElement('div');
    if (textDiv) {
      // Move heading and content into the textCell, preserving their structure
      const heading = textDiv.querySelector('.option1-heading');
      if (heading) textCell.appendChild(heading);
      const content = textDiv.querySelector('.option1-content');
      if (content) textCell.appendChild(content);
    }
    // If nothing was appended, fallback to the textDiv itself
    if (!textCell.hasChildNodes() && textDiv) textCell = textDiv;
    // Both cells must be present
    if (img && textCell) {
      rows.push([img, textCell]);
    }
  });

  // Only create and replace if we have at least one card row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
