/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row exactly as example
  const headerRow = ['Cards (cards2)'];
  // Find the slick-track which contains the slides (cards)
  const slickTrack = element.querySelector('.slick-track');
  // Defensive: if not found, don't fail
  const cardDivs = slickTrack ? slickTrack.querySelectorAll(':scope > div.slick-slide') : [];
  const rows = [headerRow];
  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains an anchor wrapping the card
    const anchor = cardDiv.querySelector('a');
    if (!anchor) return; // Defensive: skip if not found

    // IMAGE: from .blog-card-img-container img (reference the actual element)
    let img = null;
    const imgContainer = anchor.querySelector('.blog-card-img-container');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Defensive: if no image, create an empty cell
    if (!img) img = document.createElement('span');

    // TEXT CELL: Compose in order: category badge, date, likes, title (bolded)
    // Reference existing text nodes directly where possible
    const textCellContent = [];
    // CATEGORY badge
    const catElem = anchor.querySelector('.smallImageDiv .text .name');
    if (catElem && catElem.textContent.trim()) {
      const catBadge = document.createElement('p');
      catBadge.textContent = catElem.textContent.trim();
      catBadge.style.fontWeight = 'bold';
      textCellContent.push(catBadge);
    }
    // DATE
    const dateElem = anchor.querySelector('.recipeTextDiv .bottomText .text');
    if (dateElem && dateElem.textContent.trim()) {
      const dateP = document.createElement('p');
      dateP.textContent = dateElem.textContent.trim();
      dateP.style.fontSize = '0.9em';
      textCellContent.push(dateP);
    }
    // LIKES
    const likesSpan = anchor.querySelector('.recipeTextDiv .bottomText span');
    if (likesSpan && likesSpan.textContent.trim()) {
      const likesP = document.createElement('p');
      likesP.textContent = `❤ ${likesSpan.textContent.trim()}`;
      textCellContent.push(likesP);
    }
    // TITLE (bold)
    const titleDiv = anchor.querySelector('.bigTextDiv .bigText');
    if (titleDiv && titleDiv.textContent.trim()) {
      const titleStrong = document.createElement('strong');
      titleStrong.textContent = titleDiv.textContent.trim();
      textCellContent.push(titleStrong);
    }
    // Defensive: if no text content, add empty span
    if (textCellContent.length === 0) {
      textCellContent.push(document.createElement('span'));
    }
    rows.push([img, textCellContent]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
