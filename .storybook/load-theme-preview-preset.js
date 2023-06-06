// preset.js

import { getTheme } from "../vite.config";

export function previewAnnotations(entry = []) {
  const theme = getTheme();
  return [...entry, require.resolve(`../udata_front/theme/${theme}/assets/js/.storybook/preview.js`)];
}

export default { previewAnnotations }
