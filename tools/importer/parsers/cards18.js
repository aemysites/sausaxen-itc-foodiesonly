/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards18) block header
  const headerRow = ['Cards (cards18)'];
  const rows = [];

  // Select all card containers
  const cardContainers = element.querySelectorAll(':scope > div.exploreAllBlogsMainDiv');

  cardContainers.forEach((container) => {
    // The anchor contains all card content
    const aEl = container.querySelector('.loadMoreBlogCards > a');
    if (!aEl) return;
    // Card image (main, not icon)
    const cardImg = aEl.querySelector('.blog-card-img-container img.recipeImage');

    // Compose the text cell content
    const textParts = [];
    // Explore/Create tag (if present)
    const tagEl = aEl.querySelector('.smallImageDiv .text .name');
    if (tagEl && tagEl.textContent.trim()) {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tagEl.textContent.trim();
      tagSpan.setAttribute('data-card-tag', '');
      tagSpan.style.fontWeight = 'bold';
      tagSpan.style.fontSize = '0.9em';
      tagSpan.style.display = 'block';
      textParts.push(tagSpan);
    }
    // Likes (number after heart icon)
    const likeSpan = aEl.querySelector('.recipeTextDiv .bottomText span');
    if (likeSpan && likeSpan.textContent.trim()) {
      const likes = document.createElement('span');
      likes.textContent = `❤ ${likeSpan.textContent.trim()}`;
      likes.style.marginRight = '12px';
      likes.setAttribute('data-card-likes', '');
      textParts.push(likes);
    }
    // Date (first .text in bottomText)
    const dateDiv = aEl.querySelector('.recipeTextDiv .bottomText .text');
    if (dateDiv && dateDiv.textContent.trim()) {
      const dateSpan = document.createElement('span');
      dateSpan.textContent = dateDiv.textContent.trim();
      dateSpan.style.fontSize = '0.85em';
      dateSpan.style.marginRight = '12px';
      dateSpan.setAttribute('data-card-date', '');
      textParts.push(dateSpan);
    }
    // Card Title (.bigText)
    const bigTextDiv = aEl.querySelector('.bigTextDiv .bigText');
    if (bigTextDiv && bigTextDiv.textContent.trim()) {
      const title = document.createElement('div');
      title.innerHTML = `<strong>${bigTextDiv.textContent.trim()}</strong>`;
      title.setAttribute('data-card-title', '');
      title.style.marginTop = '9px';
      textParts.push(title);
    }
    // Compose card row: first column image (element), second column is all text/content
    rows.push([
      cardImg,
      textParts
    ]);
  });

  // Table structure: header, then each card row
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
