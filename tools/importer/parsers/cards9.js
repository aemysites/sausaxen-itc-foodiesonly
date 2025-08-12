/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all .slick-slide direct children inside .slick-track
  function getSlides(el) {
    const slickTrack = el.querySelector('.slick-track');
    if (!slickTrack) return [];
    return Array.from(slickTrack.children).filter(child => child.classList.contains('slick-slide'));
  }

  function buildRows(slides) {
    return slides.map(slide => {
      // Each slide has structure: <div><a ...><div class="bloggCardDiv">...</div></a></div>
      const cardLink = slide.querySelector('a');
      const cardDiv = cardLink ? cardLink.querySelector('.bloggCardDiv') : null;
      if (!cardDiv) return [null, null];

      // IMAGE CELL (always present)
      // Use the main blog image, not the icon
      const imageCell = cardDiv.querySelector('.blog-card-img-container img');

      // TEXT CELL
      const textFrag = document.createDocumentFragment();

      // Category label (from .smallImageDiv .name) - acts as a badge
      const catElem = cardDiv.querySelector('.smallImageDiv .name');
      if (catElem && catElem.textContent.trim()) {
        const badge = document.createElement('span');
        badge.textContent = catElem.textContent.trim();
        badge.style.display = 'inline-block';
        badge.style.fontWeight = 'bold';
        badge.style.fontSize = '0.9em';
        badge.style.marginBottom = '4px';
        textFrag.appendChild(badge);
        textFrag.appendChild(document.createElement('br'));
      }

      // Meta: Likes and Date
      // Likes: only show if available
      const bottomText = cardDiv.querySelector('.bottomText');
      let likesValue = null;
      if (bottomText) {
        const likeSpan = bottomText.querySelector('span');
        if (likeSpan && likeSpan.textContent.trim()) {
          likesValue = likeSpan.textContent.trim();
        }
      }
      // Date
      let dateValue = null;
      if (bottomText) {
        const dateDiv = bottomText.querySelector('.text');
        if (dateDiv && dateDiv.textContent.trim()) {
          dateValue = dateDiv.textContent.trim();
        }
      }
      // Row for meta info
      if (likesValue || dateValue) {
        const meta = document.createElement('div');
        if (likesValue) {
          const likeSpanElem = document.createElement('span');
          likeSpanElem.textContent = `❤ ${likesValue}`;
          meta.appendChild(likeSpanElem);
        }
        if (likesValue && dateValue) {
          meta.appendChild(document.createTextNode(' \u00A0 '));
        }
        if (dateValue) {
          const dateSpanElem = document.createElement('span');
          dateSpanElem.textContent = dateValue;
          meta.appendChild(dateSpanElem);
        }
        textFrag.appendChild(meta);
      }

      // Card Title (from .bigText), inside a link to the original article
      const bigText = cardDiv.querySelector('.bigText');
      if (bigText && bigText.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = bigText.textContent.trim();
        if (cardLink && cardLink.href) {
          const a = document.createElement('a');
          a.href = cardLink.href;
          a.appendChild(strong);
          textFrag.appendChild(document.createElement('br'));
          textFrag.appendChild(a);
        } else {
          textFrag.appendChild(document.createElement('br'));
          textFrag.appendChild(strong);
        }
      }
      return [imageCell, textFrag];
    });
  }

  const headerRow = ['Cards (cards9)'];
  const slides = getSlides(element);
  const cardRows = buildRows(slides);
  // If no slides/cards, just replace with an empty block
  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
