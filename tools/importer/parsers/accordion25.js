/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion container
  const accordionDiv = element.querySelector('.accordionDiv');
  if (!accordionDiv) return;

  // Find all direct accordion blocks
  const accordions = accordionDiv.querySelectorAll(':scope > .MuiPaper-root.MuiAccordion-root');

  const rows = [['Accordion']]; // Header, matches example

  // Iterate each accordion item
  accordions.forEach((acc) => {
    // Title cell: look for the summary text
    let titleCell;
    const summaryContent = acc.querySelector('.MuiAccordionSummary-content');
    if (summaryContent) {
      // Prefer using the <p> element inside summary if present (retains markup)
      const p = summaryContent.querySelector('p');
      if (p) {
        titleCell = p;
      } else {
        titleCell = summaryContent;
      }
    } else {
      // Fallback to acc's text
      titleCell = acc.textContent.trim();
    }

    // Content cell: find all non-empty Details blocks (do not add empty ones)
    const details = Array.from(acc.querySelectorAll('.MuiAccordionDetails-root'))
      .filter((det) => {
        // Non-empty text OR contains images/media/links
        return det.textContent.trim().length > 0 || det.querySelector('img,video,iframe,audio,object,a');
      });
    let contentCell;
    if (details.length === 1) {
      contentCell = details[0];
    } else if (details.length > 1) {
      contentCell = details;
    } else {
      contentCell = '';
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
