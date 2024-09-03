export default function fixupTabsOnStartup()
{
  // Need to add a random setTimeout of a few thousands of ms to wait 
  // for DSFR to be ready to listen to our `.disclose()` call.
  setTimeout(() => {
    /** @type {NodeListOf<HTMLElement>} */
    const tabButtons = document.querySelectorAll("[data-update-url]")

    tabButtons.forEach((button) => {
      const hash = `#/${button.dataset.updateUrl || button.getAttribute("aria-controls")}`;
      const oldHash = `#${button.dataset.previousUrl}`;

      if (oldHash && window.location.hash.startsWith(oldHash)) {
        // Remove the old hash prefix
        const subId = window.location.hash.slice(oldHash.length)
        window.location.hash = `${hash}/${subId}`;
      }

      if (window.location.hash.includes(hash)) {
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