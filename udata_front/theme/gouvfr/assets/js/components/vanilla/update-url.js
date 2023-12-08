/** @type {Map<string, HTMLElement>} */
const targets = new Map();

/** @type {Map<string, string>} */
const redirects = new Map();

/**
 * Update UI to match hash
 * @param {string} target - formatted hash
 */
function moveToCurrentHash(target) {
  if(target.includes("/")) {
    target = target.split("/").shift() || "";
  }
  let button;
  if(button = targets.get(target)) {
    button.click();
  }
}

/**
 * Try to update UI to match hash
 * This assumes that `data-previous-url` start the hash.
 * The rest of the hash is added at the end of the new hash to allow ids or params to pass the redirect.
 * This adds a `/` between the new hash and the rest of the previous one to match new hash format.
 * @param {string} target - formatted hash
 */
function tryPreviousHashes(target) {
  for (const [key, newHash] of redirects) {
    if(target && target.startsWith(key)) {
      window.location.hash = "#/" + newHash + "/" + target.slice(key.length);
      break;
    }
  }
}

/**
 * Update UI to match hash.
 * This is done on page launch with hash and when the hash is updated with a link or manual edition.
 * It isn't triggered on hash update from `handleUpdateUrlButtons` below.
 */
function moveToHash() {
  const hash = window.location.hash;
  if(!hash) {
    return;
  }
  globalThis._paq?.push(['trackEvent', 'Move page to hash', window.location.pathname, hash]);
  if(hash.startsWith("#/")) {
    moveToCurrentHash(hash.slice(2));
  } else {
    tryPreviousHashes(hash.slice(1));
  }
}

export default function handleUpdateUrlButtons() {
  /** @type {NodeListOf<HTMLElement>} */
  const buttons = document.querySelectorAll("[data-update-url]");

  buttons.forEach((button) => {
    const target = button.dataset.updateUrl || button.getAttribute("aria-controls");
    const previous = button.dataset.previousUrl;
    if(target) {
      targets.set(target, button);
      if(previous) {
        redirects.set(previous, target);
      }
    }
    button.addEventListener("click", () => {
      let url = new URL(window.location.href);
      const targetHash = "#/" + target;
      if(!url.hash.includes(targetHash)) {
        url.hash = targetHash;
        window.history.pushState(null, "", url);
        globalThis._paq?.push(['trackEvent', 'Move page to hash', window.location.pathname, targetHash]);
      }
    });
  });
  moveToHash();

  window.addEventListener("hashchange", () => {
    moveToHash();
  });
}
