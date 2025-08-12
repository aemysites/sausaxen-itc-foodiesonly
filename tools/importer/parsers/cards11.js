/* global WebImporter */
export default function parse(element, { document }) {
  // Header row according to example, single column
  const headerRow = ['Cards (cards11)'];

  // Each card is a direct child div of element
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  const cardRows = cardDivs.map((cardDiv) => {
    // Try to find text bubble element inside this cardDiv
    let bubble = cardDiv.querySelector('.orange-shadow-box, .grey-blank-box');
    let bubbleText = '';
    if (bubble) {
      bubbleText = bubble.textContent.trim();
    } else {
      // Fallback: use all text from cardDiv (if no bubble found)
      bubbleText = cardDiv.textContent.trim();
    }

    // Make a strong element for the card title
    const strong = document.createElement('strong');
    strong.textContent = bubbleText;

    // For this HTML, the only real content is the bubble (visual) and its text
    // Place the bubble element (visual) and the text (title) in the same cell
    // This preserves semantic meaning and all text content
    const cellContent = bubble ? [bubble, strong] : [strong];

    return [cellContent];
  });

  // Compose cells: header + cards
  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
