/*
---
name: Tabs JS
category: 5 - Interactions
---

# Interaction
Tabs are a two parts system : tabs, with a tag shape (or any style you'd like) buttons, and tabpanel, that the buttons will show.
Only one tabpanel can be shown at a time, and toggling a new tabpanel will make the previous active tabpanel no longer visible.
You only need to specify an `id` in the `aria-controls` attribute of the button, then add this `id` to the tabpanel.

Tip : don't forget to add both `aria-pressed="true"` and `aria-selected="true"`attributes to the default-active tab and `fr-unhidden` to the tabpanel.
Tip : if the `aria-controls` is invalid (no div with specified `id`), the tabs will kinda crash. Don't do that.

```tabs-interactive.html
<nav data-tabs>
    <button class="fr-tag" aria-controls="tab-content-1" role="tab" aria-pressed="true" aria-selected="true">Jeux de données</button>
    <button class="fr-tag" aria-controls="tab-content-2" role="tab">Réutilisations</button>
</nav>
<ul>
  <li class="fr-hidden fr-unhidden" role="tabpanel"id="tab-content-1">Tab content 1 (jeux de données)</li>
  <li class="fr-hidden" id="tab-content-2">Tab content 2 (reuse)</li>
</ul>
```
*/

const tabs = document.querySelectorAll("[data-tabs]");
tabs.forEach((tab) => {
  const tabsButtons = tab.querySelectorAll("[role=tab]");
  tabsButtons.forEach((tabButton) => {
    tabButton.addEventListener("click", (el) => {
      el.preventDefault();
      const target = /** @type {HTMLElement} */ (el.target);

      const previouslyActive = Array.from(tabsButtons).find((tab) =>
        tab.getAttribute("aria-selected") === "true"
      );
      if (previouslyActive) {
        previouslyActive.setAttribute("aria-selected", "false");
        const previousAriaControls = previouslyActive.getAttribute("aria-controls") || "";
        document
          .getElementById(previousAriaControls)
          ?.classList.remove("fr-unhidden");
      }

      const ariaControls = target.getAttribute("aria-controls") || "";
      target.setAttribute("aria-selected", "true");
      document
        .getElementById(ariaControls)
        ?.classList.add("fr-unhidden");
      globalThis._paq?.push(['trackEvent', 'Move page to tab', window.location.pathname, tabButton.textContent]);
    });
  });
});
