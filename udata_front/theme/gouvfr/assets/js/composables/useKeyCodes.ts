type keyCodesModel = {
  TAB: number;
  ESCAPE: number;
  END: number;
  HOME: number;
  LEFT: number;
  UP: number;
  RIGHT: number;
  DOWN: number;
}


export default function useKeyCodes() {
  const KEYCODES: keyCodesModel = window.dsfr.core.KeyCodes;
  return {
    KEYCODES: {
      ...KEYCODES,
      ALT: 18,
      CTRL: 17,
      SHIFT: 16,
      CAPS_LOCK: 20,
    },
  }
}
