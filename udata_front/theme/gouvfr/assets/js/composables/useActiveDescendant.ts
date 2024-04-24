import {ref, computed, Ref} from "vue";
import useKeyCodes from "./useKeyCodes";

interface Option {
  id: string;
  [key: string]: string | number | boolean | undefined;
}

export default function useActiveDescendant(options: Ref<Option[]>) {

  const {KEYCODES} = useKeyCodes();

  const selected = ref<string | undefined>();

  /** @type {import("vue").Ref<T | undefined>} */
  const selectedOption = computed(() => options.value.find(option => option.id === selected.value));

  const isSelected = (id: string | null) => selected.value === id;

  const select = (id: string | null = null) => {
    if(id === null) {
      return selectAtPosition(0);
    }
    selected.value = id;
  };

  const focusOut = () => {
    selected.value = undefined;
  };

  const selectAtPosition = (position: number) => {
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

  const handleKeyPressForActiveDescendant = (key: KeyboardEvent, alreadyMovedDown = false) => {
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
