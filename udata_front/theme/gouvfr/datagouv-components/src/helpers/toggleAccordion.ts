import { easing, tween, styler } from "popmotion";

export function toggleAccordion (target: HTMLElement, opened: boolean, padding = 0) {
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
