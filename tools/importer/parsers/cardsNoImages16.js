/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match example
  const headerRow = ['Cards (cardsNoImages16)'];
  const rows = [headerRow];

  // Safely extract slick-track containing cards
  const slickTrack = element.querySelector('.slick-track');
  if (slickTrack) {
    // Each card is a .slick-slide
    const slides = slickTrack.querySelectorAll(':scope > .slick-slide');
    slides.forEach((slide) => {
      // Each slide has .blurbCardDiv > .blogTextDiv (content)
      const blogTextDiv = slide.querySelector('.blurbCardDiv .blogTextDiv');
      if (blogTextDiv) {
        // Reference all children of blogTextDiv (usually just a <p>)
        const content = Array.from(blogTextDiv.childNodes)
          .filter(node =>
            (node.nodeType === Node.ELEMENT_NODE) ||
            (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
          );
        // Only reference existing elements/text, don't clone or create new
        // If only one node, use it directly, else use array
        rows.push([content.length === 1 ? content[0] : content]);
      }
    });
  }

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
