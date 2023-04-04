/** @type {Map<string, HTMLElement>} */
const targets = new Map();

function moveToHash() {
  const hash = window.location.hash;
  if(!hash) {
    return;
  }
  let target = hash.slice(2);
  if(target.includes("/")) {
    target = target.split("/").shift() || "";
  }
  let button;
  if(button = targets.get(target)) {
    button.click();
  }
}

export default function handleUpdateUrlButtons() {
  /** @type {NodeListOf<HTMLElement>} */
  const buttons = document.querySelectorAll("[data-update-url]");

  buttons.forEach((button) => {
    const target = button.dataset.updateUrl || button.getAttribute("aria-controls");
    if(target) {
      targets.set(target, button);
    }
    button.addEventListener("click", () => {
      let url = new URL(window.location.href);
      const targetHash = "#/" + target;
      if(!url.hash.includes(targetHash)) {
        url.hash = targetHash;
        window.history.pushState(null, "", url);
      }
    });
  });
  moveToHash();

  window.addEventListener("hashchange", () => {
    moveToHash();
  });
}
