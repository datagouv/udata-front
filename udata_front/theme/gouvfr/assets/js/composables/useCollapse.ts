import { Ref, ref, unref } from 'vue'
import useKeyCodes from "./useKeyCodes";
import { getRandomId } from '@etalab/data.gouv.fr-components';

export function useCollapse() {
  const {KEYCODES} = useKeyCodes();
  const collapseId = getRandomId("collapse");
  const expanded = ref(false);

  const show = () => expanded.value = true;

  const hide = () => expanded.value = false;

  const toggle = () => expanded.value = !expanded.value;

  let registeredEventHandler: ((event: PointerEvent) => void) | null = null;

  const registerBackgroundEvent = (inputRef: Ref<HTMLElement> | null, listRef: Ref<HTMLElement> | null, buttonRef: Ref<HTMLElement> | null) => {
    const input = unref(inputRef);
    const list = unref(listRef);
    const button = unref(buttonRef);
    registeredEventHandler = onBackgroundPointerUp(input, list, button);
    document.body.addEventListener(
      'pointerup',
      registeredEventHandler,
      true
    );
  }

  const removeBackgroundEvent = (): void => {
    if (registeredEventHandler) {
      document.body.removeEventListener('pointerup', registeredEventHandler, true);
    }
  };

  const onBackgroundPointerUp = (input: HTMLElement | null, list: HTMLElement | null, button: HTMLElement | null) => (event: PointerEvent) => {
    const isTargetOutside = (element: HTMLElement | null, target: Node): boolean => {
      return element ? !element.contains(target) : true;
    };
  
    const eventTarget = event.target as Node;
  
    if (isTargetOutside(input, eventTarget) &&
        isTargetOutside(list, eventTarget) &&
        isTargetOutside(button, eventTarget)) {
      hide();
    }
  }

  const handleKeyPressForCollapse = (key: KeyboardEvent) => {
    switch (key.keyCode) {
      case KEYCODES.ALT:
      case KEYCODES.CTRL:
      case KEYCODES.SHIFT:
      case KEYCODES.CAPS_LOCK:
        break;
      case KEYCODES.ESCAPE:
      case KEYCODES.TAB:
        hide();
        break;
      default:
        show();
    }
  };

  return {
    expanded,
    uid: collapseId,
    show,
    hide,
    toggle,
    registerBackgroundEvent,
    removeBackgroundEvent,
    handleKeyPressForCollapse,
  }
}
