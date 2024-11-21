import { toggleAccordion } from "@datagouv/components/ts";

const togglers = document.querySelectorAll("[data-accordion-button]");
togglers.forEach((toggler) => {
  toggler.addEventListener("click", (ev) => {
    ev.preventDefault();
    const button = ev.target;
    if (button instanceof HTMLElement) {
      // Toggling the aria-expanded attribute on the button
      button.toggleAttribute("aria-expanded");

      const target: HTMLElement | null = document.querySelector("#" + button.getAttribute("aria-controls"));
      if (target) {
        target.classList.toggle("active");
        toggleAccordion(target, button.hasAttribute("aria-expanded"));
      }
    }
  });
});
