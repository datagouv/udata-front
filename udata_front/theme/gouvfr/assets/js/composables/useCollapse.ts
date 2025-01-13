import { MaybeRefOrGetter, ref, toValue } from 'vue'
import { getRandomId } from '@datagouv/components/ts';
import { CommonKeyboardKeys } from '../types';

export function useCollapse() {
  const collapseId = getRandomId("collapse");
  const expanded = ref(false);

  const show = () => expanded.value = true;

  const hide = () => expanded.value = false;

  const toggle = () => expanded.value = !expanded.value;

  let registeredEventHandler: ((event: PointerEvent) => void) | null = null;

  const registerBackgroundEvent = (inputRef: MaybeRefOrGetter<HTMLElement | null>, listRef: MaybeRefOrGetter<HTMLElement | null>, buttonRef: MaybeRefOrGetter<HTMLElement | null>) => {
    const input = toValue(inputRef);
    const list = toValue(listRef);
    const button = toValue(buttonRef);
    registeredEventHandler = onBackgroundPointerUp(input, list, button);
    document.body.addEventListener(
      'pointerup',
      registeredEventHandler,
      true
    );
  };

  const removeBackgroundEvent = (): void => {
    if (registeredEventHandler) {
      document.body.removeEventListener('pointerup', registeredEventHandler, true);
    }
  };

  const isTargetOutside = (element: HTMLElement | null, target: Node): boolean => {
    return element ? !element.contains(target) : true;
  };

  const onBackgroundPointerUp = (input: HTMLElement | null, list: HTMLElement | null, button: HTMLElement | null) => (event: PointerEvent) => {
    const eventTarget = event.target as Node;
    if (isTargetOutside(input, eventTarget) &&
        isTargetOutside(list, eventTarget) &&
        isTargetOutside(button, eventTarget)) {
      hide();
    }
  };

  const handleKeyPressForCollapse = (key: KeyboardEvent) => {
    switch (key.key as CommonKeyboardKeys) {
      case 'Alt':
      case 'Control':
      case 'Shift':
      case 'CapsLock':
        break;
      case 'Escape':
      case 'Tab':
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
  };
}
