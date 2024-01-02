/**
 * When loading, DSFR check for custom settings in `window.dsfr`
 * Then, they overwrite it with the DSFR object
 * We use a manual mode to load all our vue instances before starting the DSFR engine.
 */
window.dsfr = {
  mode: 'manual',
}

/**
 * This function returns the dsfr alignment to use for flex main axis alignment.
 *
 * @remarks
 * It abstracts the fact that the dsfr name is made for flex-direction row and is odd for flex-direction column.
 *
 * @param {import("./types").AxisAlignment} alignment
 */
export function getMainAxisAlignment(alignment) {
  switch(alignment) {
    case "start":
      return "left";
    case "center":
      return "center";
    case "end":
      return "right";
  }
}

/**
* This function returns the dsfr alignment to use for flex cross axis alignment.
 *
 * @remarks
 * It abstracts the fact that the dsfr name is made for flex-direction row and is odd for flex-direction column.
 *
 * @param {import("./types").AxisAlignment} alignment
 */
export function getCrossAxisAlignment(alignment) {
  switch(alignment) {
    case "start":
      return "top";
    case "center":
      return "middle";
    case "end":
      return "bottom";
  }
}
