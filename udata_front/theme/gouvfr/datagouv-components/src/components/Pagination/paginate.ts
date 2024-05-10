export const PAGES_AROUND = 3;

function range(size: number, startAt = 1) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function getPages(pageCount: number) {
  return range(pageCount);
}

function getPagesShown(pages: { length: number }, currentPage: number) {
  return Math.min(
    PAGES_AROUND * 2 + 1,
    pages.length - 2,
    PAGES_AROUND + currentPage - 1,
    PAGES_AROUND + pages.length - currentPage
  );
}

function getStartPage(currentPage: number) {
  return Math.max(
    currentPage - PAGES_AROUND, // we want to start 3 pages before the current one
    2 // we don't want to start below page 2
  )
}

export function getVisiblePages(currentPage: number, pageCount: number) {
  const pages = getPages(pageCount);
  const start = getStartPage(currentPage);
  if (pageCount <= 2) {
    return [];
  }
  let pagination: Array<number | null> = range(getPagesShown(pages, currentPage), start);
  if(!pagination.includes(2)) {
    pagination.unshift(null);
  }
  if(!pagination.includes(pageCount - 1)) {
    pagination.push(null);
  }
  return pagination;
}
