/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Cards (cards26)'];
  const cells = [headerRow];

  // Select all visible card slides (handle both slick-current and slick-active)
  const slides = element.querySelectorAll('.slick-slide');
  slides.forEach(slide => {
    // Each card is inside a .topRecipesDiv descendant
    const cardLink = slide.querySelector('a');
    if (!cardLink) return;
    
    // Find the main card image (ignore icons)
    let mainImg = null;
    const recipeImg = slide.querySelector('.topRecipeImage');
    if (recipeImg) mainImg = recipeImg;

    // Gather all text for the right cell
    const textContent = [];

    // Veg/Non-Veg indicator
    const vegDiv = slide.querySelector('.bottomText .text');
    if (vegDiv && vegDiv.textContent.trim()) {
      const vegEl = document.createElement('div');
      vegEl.textContent = vegDiv.textContent.trim();
      textContent.push(vegEl);
    }
    // Title (bigText)
    const titleDiv = slide.querySelector('.bigTextDiv .bigText');
    if (titleDiv && titleDiv.textContent.trim()) {
      const titleEl = document.createElement('strong');
      titleEl.textContent = titleDiv.textContent.trim();
      textContent.push(titleEl);
    }
    // Likes (heart + count)
    const likeCount = slide.querySelector('.like-image span');
    if (likeCount && likeCount.textContent.trim()) {
      const likeEl = document.createElement('span');
      likeEl.textContent = '❤ ' + likeCount.textContent.trim();
      textContent.push(likeEl);
    }
    // Time and Difficulty (yellowDiv)
    const yellowDiv = slide.querySelector('.yellowDiv .yellowSubDiv');
    if (yellowDiv) {
      const timeElem = yellowDiv.querySelector('.leftText .leftSpan');
      const diffElem = yellowDiv.querySelector('.rightText .rightSpan');
      if (timeElem || diffElem) {
        const infoEl = document.createElement('div');
        infoEl.style.display = 'flex';
        infoEl.style.gap = '1em';
        if (timeElem && timeElem.textContent.trim()) {
          const timeSpan = document.createElement('span');
          timeSpan.textContent = timeElem.textContent.trim();
          infoEl.appendChild(timeSpan);
        }
        if (timeElem && diffElem) {
          const sep = document.createElement('span');
          sep.textContent = '|';
          infoEl.appendChild(sep);
        }
        if (diffElem && diffElem.textContent.trim()) {
          const diffSpan = document.createElement('span');
          diffSpan.textContent = diffElem.textContent.trim();
          infoEl.appendChild(diffSpan);
        }
        textContent.push(infoEl);
      }
    }
    // Compose this card row: [image, [text bits]]
    cells.push([
      mainImg,
      textContent
    ]);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
