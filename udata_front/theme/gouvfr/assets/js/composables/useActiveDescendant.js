import {ref, computed} from "vue";
import useKeyCodes from "./useKeyCodes";

/**
 * @template {{id: string}} T
 * @param {import("vue").Ref} options
 */
export default function useActiveDescendant(options) {
  const {KEYCODES} = useKeyCodes();

  /** @type {import("vue").Ref<string | undefined>} */
  const selected = ref();

  /** @type {import("vue").Ref<T | undefined>} */
  const selectedOption = computed(() => options.value.find(option => option.id === selected.value));

  /**
   *
   * @param {string | null} id
   * @returns {boolean}
   */
  const isSelected = (id) => selected.value === id;

  /**
   *
   * @param {?string} id
   */
  const select = (id = null) => {
    if(id === null) {
      return selectAtPosition(0);
    }
    selected.value = id;
  };

  const focusOut = () => {
    selected.value = undefined;
  };

  /**
   * Select option at position
   * @param {number} position
   */
  const selectAtPosition = (position) => {
    select(options.value[position].id);
  }

  const selectNextOption = () => {
    let selectedPosition = 0;
    if(selected.value) {
      selectedPosition = options.value.findIndex(option => option.id === selected.value);
      selectedPosition++;
      if(selectedPosition === options.value.length) {
        selectedPosition = 0;
      }
    }
    selectAtPosition(selectedPosition);
  }

  const selectPreviousOption = () => {
    const lastOptionPosition = options.value.length - 1;
    let selectedPosition = lastOptionPosition;
    if(selected.value) {
      selectedPosition = options.value.findIndex(option => option.id === selected.value);
      selectedPosition--;
      if(selectedPosition < 0) {
        selectedPosition = lastOptionPosition;
      }
    }
    selectAtPosition(selectedPosition);
  }

  /**
   *
   * @param {KeyboardEvent} key
   * @param {boolean} alreadyMovedDown
   */
  const handleKeyPressForActiveDescendant = (key, alreadyMovedDown = false) => {
    switch (key.keyCode) {
      case KEYCODES.DOWN:
        if(!alreadyMovedDown && !key.altKey) {
          selectNextOption();
        }
        break;
      case KEYCODES.UP:
        selectPreviousOption();
        break;
      case KEYCODES.LEFT:
      case KEYCODES.RIGHT:
      case KEYCODES.HOME:
      case KEYCODES.END:
      case KEYCODES.ESCAPE:
        focusOut();
        break;
    }
  };

  const ALREADY_MOVED_DOWN = true;
  const NOT_MOVED_YET = false;

  return {
    select,
    selected,
    selectedOption,
    isSelected,
    focusOut,
    handleKeyPressForActiveDescendant,
    ALREADY_MOVED_DOWN,
    NOT_MOVED_YET,
  }
}
