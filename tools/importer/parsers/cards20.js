/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all card anchors for each card
  const cardAnchors = [];
  element.querySelectorAll(':scope > .filterMainDiv').forEach(mainDiv => {
    mainDiv.querySelectorAll('.loadMoreCards > .topRecipesDiv > a').forEach(a => cardAnchors.push(a));
  });

  // Header row exactly as in the example
  const rows = [['Cards (cards20)']];

  cardAnchors.forEach(anchor => {
    // --- IMAGE CELL ---
    // Use first .topRecipeImage inside the anchor; fallback to any image in .recipe-image-container
    let img = anchor.querySelector('.topRecipeImage');
    if (!img) {
      const imgContainer = anchor.querySelector('.recipe-image-container');
      if (imgContainer) img = imgContainer.querySelector('img');
    }
    // If not found, fallback to first image inside anchor
    if (!img) img = anchor.querySelector('img');

    // --- TEXT CELL ---
    // Gather all content from .bigTextDiv, .recipeTextDiv, and .yellowDiv (in visual order, as on card)
    // Use direct references to existing nodes (do not clone)
    const content = [];
    // .recipeTextDiv (top left: Veg/Non Veg, likes, etc)
    const recipeTextDiv = anchor.querySelector('.recipeTextDiv');
    if (recipeTextDiv) content.push(recipeTextDiv);
    // .bigTextDiv (main title)
    const bigTextDiv = anchor.querySelector('.bigTextDiv');
    if (bigTextDiv) content.push(bigTextDiv);
    // .yellowDiv (meta: time, difficulty)
    const yellowDiv = anchor.querySelector('.yellowDiv');
    if (yellowDiv) content.push(yellowDiv);
    // Add CTA (View Recipe link)
    const cta = document.createElement('div');
    const link = document.createElement('a');
    link.href = anchor.href;
    link.textContent = 'View Recipe';
    cta.appendChild(link);
    content.push(cta);

    // Add the row to table, using direct element references for maximal resilience
    rows.push([
      img || '',
      content
    ]);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
