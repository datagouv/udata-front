export const PAGES_AROUND = 3;

/**
 *
 * @param {number} size
 * @param {number} startAt
 * @returns {Array<number>}
 */
function range(size, startAt = 1) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

/**
 *
 * @param {number} pageCount
 * @returns {Array<number>}
 */
function getPages(pageCount) {
  return range(pageCount);
}

/**
 * Get the number of pages to show inside the pagination based on the total number of pages and the current one.
 * We want 3 pages around the current one with some exceptions :
 * - we want to show at most all pages except the first and last
 * - if we're close to the first page, we'll show less than 3 pages on the left
 * - if we're close to the last page, we'll show less than 3 pages on the right
 * @param {{length: number}} pages
 * @param {number} currentPage
 * @returns {number}
 */
function getPagesShown(pages, currentPage) {
  return Math.min(
    PAGES_AROUND * 2 + 1,
    pages.length - 2,
    PAGES_AROUND + currentPage - 1,
    PAGES_AROUND + pages.length - currentPage
  );
}

/**
 * Get the first page to show
 * We want to start 3 pages before the current one but we don't want to start below page 2
 * @param {number} currentPage
 * @returns {number}
 */
function getStartPage(currentPage) {
  return Math.max(
    currentPage - PAGES_AROUND, // we want to start 3 pages before the current one
    2 // we don't want to start below page 2
  )
}

/**
 * Return an array of page number to show in pagination
 * @param {number} currentPage - Current page
 * @param {number} pageCount - Number of pages
 * @returns {Array<number>}
 */
export default function getVisiblePages(currentPage, pageCount) {
  const pages = getPages(pageCount);
  const start = getStartPage(currentPage);
  if (pageCount <= 2) {
     return [];
  }
  let pagination = range(getPagesShown(pages, currentPage), start);
  if(!pagination.includes(2)) {
    pagination.unshift(null);
  }
  if(!pagination.includes(pageCount - 1)) {
    pagination.push(null);
  }
  return pagination;
}
