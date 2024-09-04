/** @param button {HTMLElement} */
function getButtonUrlHash(button)
{
  return `#/${button.dataset.updateUrl || button.getAttribute("aria-controls")}`
}

/** @param button {HTMLElement} */
function selectTabFromButton(button)
{
  const tabPanelId = button.getAttribute('aria-controls');
  if (! tabPanelId) {
    console.error("TabButton without `aria-controls` ID.", button)
  }

  const tabPanel = document.getElementById(tabPanelId);
  if (! tabPanel) {
    console.error(`Unknown TabPanel with id '${tabPanelId}'.`, button)
  }

  dsfr(tabPanel).tabPanel.disclose()
}

export default function fixupTabsOnStartup()
{
  /** @type {NodeListOf<HTMLElement>} */
  const tabButtons = document.querySelectorAll("[data-update-url]")

  window.addEventListener("hashchange", () => {
    tabButtons.forEach((button) => {
      if (window.location.hash.includes(getButtonUrlHash(button))) {
        selectTabFromButton(button)
      }
    })
  });

  // Need to add a random setTimeout of a few thousands of ms to wait 
  // for DSFR to be ready to listen to our `.disclose()` call.
  setTimeout(() => {
    tabButtons.forEach((button) => {
      const hash = getButtonUrlHash(button);
      const oldHash = `#${button.dataset.previousUrl}`;

      if (oldHash && window.location.hash.startsWith(oldHash)) {
        // Remove the old hash prefix
        const subId = window.location.hash.slice(oldHash.length)
        window.location.hash = `${hash}/${subId}`;
      }

      if (window.location.hash.includes(hash)) {
        selectTabFromButton(button)
      }

      button.addEventListener('click', () => {
        if (! window.location.hash.includes(hash)) {
          let url = new URL(window.location.href);
          url.hash = hash;
          window.history.pushState(null, "", url);
          globalThis._paq?.push(['trackEvent', 'Move page to hash', window.location.pathname, hash]);
        }
      })
    })
  }, 100)
}