/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the block name
  const headerRow = ['Columns (columns32)'];

  // Locate all directions-detail-container blocks (steps)
  const stepContainers = element.querySelectorAll('.directions-detail-container');

  // For each step, extract left & right column content
  const rows = Array.from(stepContainers).map(step => {
    // Left column: heading, duration, instructions (can be p or ul)
    const detail = step.querySelector('.directions-detail');
    const textContainer = detail && detail.querySelector('.directions-detail-text-container');
    const leftCol = [];
    if (textContainer) {
      // Heading
      const heading = textContainer.querySelector('.directions-heading-font');
      if (heading) leftCol.push(heading);
      // Duration (icon + text)
      const duration = textContainer.querySelector('.duration-container');
      if (duration) leftCol.push(duration);
      // Instructions (span with p or ul)
      const instructionSpan = textContainer.querySelector('.directions-detail-font');
      if (instructionSpan) leftCol.push(instructionSpan);
    }
    // Use empty string if nothing found
    const leftContent = leftCol.length ? leftCol : [''];

    // Right column: video as link to its src (only if not <img>)
    const video = step.querySelector('video');
    let rightContent;
    if (video) {
      const source = video.querySelector('source');
      if (source && source.src) {
        // Create a link
        const link = document.createElement('a');
        link.href = source.src;
        link.textContent = 'Video';
        rightContent = [link];
      } else {
        rightContent = [''];
      }
    } else {
      rightContent = [''];
    }

    return [leftContent, rightContent];
  });

  // Compose cell array: header row then all rows
  const cells = [headerRow, ...rows];

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
