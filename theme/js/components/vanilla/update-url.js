export default (() => {
  /** @type {Map<string, HTMLElement>} */
  const targets = new Map();

  function moveToHash() {
    if(!window.location.hash) {
      return;
    }
    let hash = window.location.hash.slice(1);
    if(hash.includes("/")) {
      hash = hash.split("/").shift() || "";
    }
    let button;
    if(button = targets.get(hash)) {
      button.click();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    /** @type {NodeListOf<HTMLElement>} */
    const buttons = document.querySelectorAll("[data-update-url]");

    buttons.forEach((button) => {
      const target = button.dataset.dataUpdateUrl || button.getAttribute("aria-controls");
      if(target) {
        targets.set(target, button);
      }
      let url = new URL(window.location.href);
      url.hash = "#" + target;
      button.addEventListener("click", () => window.history.pushState(null, "", url));
    });
    moveToHash();
  });
  window.addEventListener("hashchange", () => {
    moveToHash();
  });
})();
