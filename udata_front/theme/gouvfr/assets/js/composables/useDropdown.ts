import { ref, onMounted, onUnmounted, MaybeRefOrGetter, toValue } from 'vue';
import { useCollapse } from './useCollapse';
import useActiveDescendant from './useActiveDescendant';
import type { OptionWithId } from './useActiveDescendant';

export function useDropdown<T extends OptionWithId>(options: MaybeRefOrGetter<Array<T>>, q: MaybeRefOrGetter<string>) {
  const inputRef = ref<HTMLElement | null>(null);
  const listRef = ref<HTMLElement | null>(null);
  const buttonRef = ref<HTMLElement | null>(null);

  const { expanded, handleKeyPressForCollapse, hide, registerBackgroundEvent, removeBackgroundEvent, show, uid } = useCollapse();
  const { focusOut, handleKeyPressForActiveDescendant, isSelected, select, selected, selectedOption, NOT_MOVED_YET, ALREADY_MOVED_DOWN } = useActiveDescendant(options);

  function showAndSelectIfQuery() {
    if(toValue(q)) {
      show();
      select(selected.value);
    }
  };

  function showAndFocus() {
    if(expanded.value) {
      searchSelectedOption();
    } else {
      inputRef.value?.focus();
      showAndSelectIfQuery();
    }
  };

  function searchSelectedOption() {
    if(selectedOption.value) {
      window.location.href = selectedOption.value.link;
    }
  };

  function handleKeyDown(e: KeyboardEvent) {
    showAndSelectIfQuery();
    let moved = NOT_MOVED_YET;
    if (!expanded.value) {
      moved = ALREADY_MOVED_DOWN;
    }
    handleKeyPressForCollapse(e);
    handleKeyPressForActiveDescendant(e, moved);
  };

  function handleFocusOut() {
    focusOut();
    hide();
  };

  onMounted(() => {
    registerBackgroundEvent(inputRef, listRef, buttonRef);
  });

  onUnmounted(() => {
    removeBackgroundEvent();
  });

  return {
    buttonRef,
    expanded,
    focusOut,
    handleFocusOut,
    handleKeyDown,
    handleKeyPressForActiveDescendant,
    handleKeyPressForCollapse,
    hide,
    inputRef,
    isSelected,
    listRef,
    registerBackgroundEvent,
    removeBackgroundEvent,
    searchSelectedOption,
    select,
    selected,
    show,
    showAndFocus,
    showAndSelectIfQuery,
    uid,
    NOT_MOVED_YET,
    ALREADY_MOVED_DOWN,
  };
};
