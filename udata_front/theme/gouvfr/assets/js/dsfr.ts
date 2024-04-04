/**
 * When loading, DSFR check for custom settings in `window.dsfr`
 * Then, they overwrite it with the DSFR object
 * We use a manual mode to load all our vue instances before starting the DSFR engine.
 */

/// <reference types="vite/client" />

import type { AxisAlignment } from "./types";

// @ts-ignore La propriété `dsfr` est comprise par @gouvfr/dsfr
window.dsfr = {
  mode: 'manual',
  verbose: import.meta.env.DEV,
}

/**
 * This function returns the dsfr alignment to use for flex main axis alignment.
 *
 * @remarks
 * It abstracts the fact that the dsfr name is made for flex-direction row and is odd for flex-direction column.
 */
export function getMainAxisAlignment(alignment: AxisAlignment) {
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
 */
export function getCrossAxisAlignment(alignment: AxisAlignment) {
  switch(alignment) {
    case "start":
      return "top";
    case "center":
      return "middle";
    case "end":
      return "bottom";
  }
}
