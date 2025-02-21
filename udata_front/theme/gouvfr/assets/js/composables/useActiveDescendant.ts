import { ref, computed, MaybeRefOrGetter, toValue } from "vue";
import type { CommonKeyboardKeys } from "../types";

export type OptionWithId = {
  id: string;
  link: string;
}

export default function useActiveDescendant<T extends OptionWithId>(options: MaybeRefOrGetter<Array<T>>) {

  const selected = ref<string | undefined>();

  const selectedOption = computed<T | undefined>(() => toValue(options).find(option => option.id === selected.value));

  const isSelected = (id: string | null) => selected.value === id;

  const select = (id?: string) => {
    if(id === undefined) {
      return selectAtPosition(0);
    }
    selected.value = id;
  };

  const focusOut = () => {
    selected.value = undefined;
  };

  const selectAtPosition = (position: number) => {
    let optionsList = toValue(options)
    if (optionsList[position]) {
      select(optionsList[position].id);
    }
  }


  const selectNextOption = () => {
    let selectedPosition = 0;
    if(selected.value) {
      selectedPosition = toValue(options).findIndex(option => option.id === selected.value);
      selectedPosition++;
      if(selectedPosition === toValue(options).length) {
        selectedPosition = 0;
      }
    }
    selectAtPosition(selectedPosition);
  }

  const selectPreviousOption = () => {
    const lastOptionPosition = toValue(options).length - 1;
    let selectedPosition = lastOptionPosition;
    if(selected.value) {
      selectedPosition = toValue(options).findIndex(option => option.id === selected.value);
      selectedPosition--;
      if(selectedPosition < 0) {
        selectedPosition = lastOptionPosition;
      }
    }
    selectAtPosition(selectedPosition);
  }

  const handleKeyPressForActiveDescendant = (key: KeyboardEvent, alreadyMovedDown = false) => {
    switch (key.key as CommonKeyboardKeys) {
      case 'ArrowDown':
        if(!alreadyMovedDown && !key.altKey) {
          selectNextOption();
        }
        break;
      case 'ArrowUp':
        selectPreviousOption();
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
      case 'Escape':
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
