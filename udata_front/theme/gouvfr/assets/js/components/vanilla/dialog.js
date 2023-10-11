/**
 *
 * @param {HTMLElement} dialog
 */
function showDialog (dialog) {
  if (dialog) {
    dialog.classList.remove("fr-hidden");
  }
};

/**
 *
 * @param {HTMLElement} dialog
 */
function closeDialog (dialog) {
  if (dialog) {
    dialog.classList.add("fr-hidden");
  }
  window.localStorage.setItem(dialog.id, "true");
};

/**
 *
 * @param {HTMLElement} dialog
 * @param {number} triggerCount
 * @param {string} startsWithString
 */
function triggerDialog(dialog, triggerCount = 3, startsWithString = '/') {
  const path = window.location.pathname;
  const dialogId = dialog.id;
  const hasAlreadyBeenTriggered = window.localStorage.getItem(dialogId) || false;
  if (hasAlreadyBeenTriggered) {
    return;
  }

  if (path.indexOf(startsWithString) === -1) {
    return;
  }

  // page-view counter increment
  const pvKey = 'pv-' + dialogId;
  let pageViewCount = parseInt(window.sessionStorage.getItem(pvKey) || "0", 10);

  if (pageViewCount >= triggerCount) {
    showDialog(dialog);
  }
  pageViewCount++;
  window.sessionStorage.setItem(pvKey, pageViewCount.toFixed(0));
}

/**
 * @type {NodeListOf<HTMLElement>}
 */
const dialogs = document.querySelectorAll("[data-dialogs]");
dialogs.forEach((dialog) => {
  triggerDialog(dialog);
  const buttons = dialog.querySelectorAll("[data-dialogs-close]");
  buttons.forEach((button) => {
    if(button instanceof HTMLElement) {
      button.addEventListener("click", () => closeDialog(dialog));
    }
  });
});
