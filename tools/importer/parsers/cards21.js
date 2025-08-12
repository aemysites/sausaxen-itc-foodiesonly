/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards21)'];

  // Find the main card wrapper (could be a link or div)
  let cardWrapper = element.querySelector('a[href]') || element;

  // Find main image (typically the recipe image, not icon)
  let mainImg = cardWrapper.querySelector('.blog-card-img-container img');
  if (!mainImg) {
    // Fallback to any img not in options-icon class
    const imgs = cardWrapper.querySelectorAll('img');
    mainImg = Array.from(imgs).find(img => !img.classList.contains('options-icon')) || imgs[0];
  }

  // Text content cell
  const textCellElements = [];

  // Title (bigText)
  const titleEl = cardWrapper.querySelector('.bigText');
  if (titleEl && titleEl.textContent.trim()) {
    // Use strong for heading styling
    const titleStrong = document.createElement('strong');
    titleStrong.textContent = titleEl.textContent.trim();
    textCellElements.push(titleStrong);
    textCellElements.push(document.createElement('br'));
  }

  // Date (from .bottomText .text)
  const dateEl = cardWrapper.querySelector('.bottomText .text');
  if (dateEl && dateEl.textContent.trim()) {
    textCellElements.push(dateEl.textContent.trim());
    textCellElements.push(document.createElement('br'));
  }

  // Heart icon and count (from bottomText > div)
  const heartDiv = cardWrapper.querySelector('.bottomText > div');
  if (heartDiv) {
    const heartImg = heartDiv.querySelector('img');
    const heartCount = heartDiv.querySelector('span');
    if (heartImg && heartCount) {
      // Reference both elements directly
      textCellElements.push(heartImg);
      textCellElements.push(' ' + heartCount.textContent.trim());
      textCellElements.push(document.createElement('br'));
    }
  }

  // Category/Tag, e.g. "Create"
  const tagEl = cardWrapper.querySelector('.smallImageDiv .name');
  if (tagEl && tagEl.textContent.trim()) {
    textCellElements.push(tagEl.textContent.trim());
    textCellElements.push(document.createElement('br'));
  }

  // Compose row cells
  const rowCells = [mainImg, textCellElements.filter(Boolean)];

  // Compose table array
  const cells = [headerRow, rowCells];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
