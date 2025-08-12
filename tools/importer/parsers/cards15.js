/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches exactly the block name in the example
  const headerRow = ['Cards (cards15)'];
  const rows = [];

  // Find all card containers directly inside the block
  const cardContainers = element.querySelectorAll(':scope > .set-width > .directions-detail-container');

  cardContainers.forEach((card) => {
    // Get the video (media element) from each card
    const video = card.querySelector('video');
    let mediaElement = null;
    if (video) {
      mediaElement = video;
    } else {
      // Fallback: if no video, try to find an image
      const img = card.querySelector('img');
      if (img) mediaElement = img;
    }

    // Get the text content container
    const textContainer = card.querySelector('.directions-detail-text-container');

    // Title (as heading)
    let title = textContainer && textContainer.querySelector('.directions-heading-font');
    // Duration (small text)
    let duration = textContainer && textContainer.querySelector('.duration-container');
    // Description (paragraphs inside .directions-detail-font)
    let descSpan = textContainer && textContainer.querySelector('.directions-detail-font');

    // Compose the text cell content with existing elements only
    const textParts = [];
    if (title) {
      // Use existing heading element, preserving semantic meaning
      textParts.push(title);
    }
    if (duration) {
      textParts.push(duration);
    }
    if (descSpan) {
      // Add all <p> elements to textParts
      descSpan.querySelectorAll('p').forEach((p) => {
        if (p.textContent && p.textContent.trim() !== '') {
          textParts.push(p);
        }
      });
    }
    // Only add the row if at least the media and text are present
    if (mediaElement && textParts.length > 0) {
      rows.push([mediaElement, textParts]);
    }
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
