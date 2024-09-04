/** @param button {HTMLElement} */
function getButtonUrlHash(button)
{
  return `#/${button.dataset.updateUrl || button.getAttribute("aria-controls")}`
}

/** @param tabButtons {NodeListOf<HTMLElement>} */
function selectCorrectTab(tabButtons)
{
  tabButtons.forEach((button) => {
    const hash = getButtonUrlHash(button);
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
  })
}

export default function fixupTabsOnStartup()
{
  /** @type {NodeListOf<HTMLElement>} */
  const tabButtons = document.querySelectorAll("[data-update-url]")

  window.addEventListener("hashchange", () => {
    selectCorrectTab(tabButtons)
  });

  // Listen for changes to update the hash
  tabButtons.forEach((button) => {
    const hash = getButtonUrlHash(button);
    
    button.addEventListener('click', () => {
      if (! window.location.hash.includes(hash)) {
        let url = new URL(window.location.href);
        url.hash = hash;
        window.history.pushState(null, "", url);
        globalThis._paq?.push(['trackEvent', 'Move page to hash', window.location.pathname, hash]);
      }
    })
  })

  // Need to add a random setTimeout of a few thousands of ms to wait 
  // for DSFR to be ready to listen to our `.disclose()` call.
  setTimeout(() => {
    selectCorrectTab(tabButtons)
  }, 100)
}