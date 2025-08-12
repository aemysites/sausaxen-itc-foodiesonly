/* global WebImporter */
export default function parse(element, { document }) {
  // All card containers
  const containers = element.querySelectorAll('.directions-detail-container');
  const rows = [['Cards (cards35)']]; // Header row exactly as required

  containers.forEach((container) => {
    // 1. LEFT CELL: Video as a link to its src
    let leftCell = '';
    const video = container.querySelector('video');
    if (video) {
      const source = video.querySelector('source');
      if (source) {
        const videoSrc = source.getAttribute('src');
        if (videoSrc) {
          // Use a link element with href to video src
          const a = document.createElement('a');
          a.href = videoSrc;
          a.textContent = 'Video';
          a.target = '_blank';
          leftCell = a;
        }
      }
    }

    // 2. RIGHT CELL: Title, Duration, Description (use existing elements for semantics)
    const textCont = container.querySelector('.directions-detail-text-container');
    const rightCell = [];
    if (textCont) {
      // Title
      const heading = textCont.querySelector('.directions-heading-font');
      if (heading) {
        // Use <strong> for title, as in example markdown
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        rightCell.push(strong);
      }
      // Duration
      const durationDiv = textCont.querySelector('.duration-container');
      if (durationDiv) {
        // Remove icon, keep textual duration
        const durationText = Array.from(durationDiv.childNodes)
          .filter(n => n.nodeType === Node.TEXT_NODE)
          .map(n => n.textContent.trim())
          .join(' ')
          .trim();
        if (durationText) {
          // Add a span for duration (keep as text, with clock emoji for scanability)
          const durationSpan = document.createElement('span');
          durationSpan.textContent = '⏱️ ' + durationText;
          rightCell.push(document.createElement('br'));
          rightCell.push(durationSpan);
        }
      }
      // Description: all content in .directions-detail-font
      const desc = textCont.querySelector('.directions-detail-font');
      if (desc) {
        // Remove empty paragraphs
        desc.querySelectorAll('p').forEach(p => {
          if (!p.textContent.trim()) p.remove();
        });
        // Add all element children (ul, p, etc) in order, preserving list semantics
        Array.from(desc.childNodes).forEach(child => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            rightCell.push(document.createElement('br'));
            rightCell.push(child);
          }
        });
      }
    }
    // Only add the row if there's meaningful content
    rows.push([leftCell, rightCell]);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
