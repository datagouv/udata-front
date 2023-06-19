/*
---
name: Accordion
category: 5 - Interactions
---

# Interaction
Because accordion are not only seen in the subway, you can use this tidbit to create collapsible ARIA-compatible accordions.

The button must have :
- `data-accordion-button` attribute
- `aria-controls` and `href` set to a valid `#id` on the page
- `aria-label` to explain what the button does if there's not enough text in the button itself (like an icon)
- `aria-expanded` attribute if the accordion is visible by default

The accordion panel must have :
- `aria-labelledby` set to the button's `#id`
- A valid `#id` corresponding to the button's `aria-controls`


```accordion.html
<button data-accordion-button aria-controls="toggle-me" aria-expanded="true">Toggle the thingies</button>
<section class="accordion-content active" aria-labelledby="resource-header" id="toggle-me">Nice collapsible section (visible by default, click the button to hide)</h1>
```
*/

import { easing, tween, styler } from "popmotion";

const togglers = document.querySelectorAll("[data-accordion-button]");
togglers.forEach((toggler) => {
  toggler.addEventListener("click", (ev) => {
    ev.preventDefault();
    const button = ev.target;
    if (button instanceof HTMLElement) {
      // Toggling the aria-expanded attribute on the button
      button.toggleAttribute("aria-expanded");

      /** @type {HTMLElement | null} */
      const target = document.querySelector("#" + button.getAttribute("aria-controls"));
      if (target) {
        target.classList.toggle("active");
        toggleAccordion(target, button.hasAttribute("aria-expanded"));
      }
    }
  });
});

/**
 * @param {HTMLElement} target
 * @param {boolean} opened
 */
export function toggleAccordion (target, opened, padding = 0) {
  if (target) {
    const divStyler = styler(target);
    if (opened) {
      divStyler.set({ display: "block" });
      divStyler.render(true);
      tween({
        from: { height: 0, padding: 0 },
        to: { height: target.scrollHeight + 2 * padding, padding: padding },
        duration: 300,
        ease: easing.anticipate,
      }).start({
        update: divStyler.set,
        complete: () => divStyler.set({ height: "auto" }),
      });
    } else {
      tween({
        from: { height: target.scrollHeight, padding: padding },
        to: { height: 0, padding: 0 },
        duration: 300,
        ease: easing.anticipate,
      }).start({
        update: divStyler.set,
        complete: () => divStyler.set({ height: 0, display: "none" }),
      });
    }
  }
}
