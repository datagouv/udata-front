/*
---
name: Tabs JS
category: 5 - Interactions
---

# Interaction
Inspired by Bootstrap, tabs leverage the power of JavaScript® to enable quick tabs & tab-content interactivity.
The is a two parts systems : tabs, with individual pill-shaped (or any element you'd like) buttons, and tab-content, that the buttons will show.
Only one tab-content can be shown at a time, and toggling a new tab-content will make the previous active tab no longer visible.
You only need to specify an `id` in the `href` attribute of the button, then add this `id` to the tab-content.

Tip : don't forget to add an "active" class to the default-active button and tab content.
Tip : if the href is invalid (no div with specified `id`), the tabs will kinda crash. Don't do that.

```tabs-interactive.html
<nav class="tabs">
    <a href="#tab-content-1" class="tab active">Jeux de données</a>
    <a href="#tab-content-2" class="tab">Réutilisations</a>
</nav>
<ul>
  <li class="tab-content active" id="tab-content-1">Tab content 1 (jeux de données)</li>
  <li class="tab-content" id="tab-content-2">Tab content 2 (reuse)</li>
</ul>
```
*/

export default (() => {
  document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll("[data-tabs]");
    tabs.forEach((tab) => {
      const tabsButtons = tab.querySelectorAll("[role=tab]");
      tabsButtons.forEach((tabButton) => {
        tabButton.addEventListener("click", (el) => {
          el.preventDefault();

          const previouslyActive = Array.from(tabsButtons).find((tab) =>
            tab.getAttribute("aria-selected") === "true"
          );
          console.log(previouslyActive);
          if (previouslyActive) {
            previouslyActive.setAttribute("aria-selected", "false");
            previouslyActive.setAttribute("aria-pressed", "false");
            document
              .getElementById(previouslyActive.getAttribute("aria-controls"))
              .classList.remove("fr-unhidden");
          }

          el.target.setAttribute("aria-selected", "true");
          el.target.setAttribute("aria-pressed", "true");
          document
            .getElementById(el.target.getAttribute("aria-controls"))
            .classList.add("fr-unhidden");
        });
      });
    });
  });
})();
