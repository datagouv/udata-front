import { type Ref, onMounted, onUnmounted } from 'vue';
import { useCollapse } from './useCollapse';
import useActiveDescendant from './useActiveDescendant';

export function useDropdown(options: Ref, inputRef: Ref<HTMLElement | null>, listRef: Ref<HTMLElement | null>, buttonRef: Ref<HTMLElement | null>) {
  const { expanded, handleKeyPressForCollapse, hide, registerBackgroundEvent, removeBackgroundEvent, show, uid } = useCollapse();
  const { focusOut, handleKeyPressForActiveDescendant, isSelected, select, selected, selectedOption, NOT_MOVED_YET, ALREADY_MOVED_DOWN } = useActiveDescendant(options);

  function showAndSelectIfQuery(q: Ref<string>) {
    if(q.value) {
      show();
      select(selected.value);
    }
  };

  function handleKeyDown(e: KeyboardEvent, q: Ref<string>) {
    showAndSelectIfQuery(q);
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
    expanded,
    focusOut,
    handleFocusOut,
    handleKeyDown,
    handleKeyPressForActiveDescendant,
    handleKeyPressForCollapse,
    hide,
    isSelected,
    registerBackgroundEvent,
    removeBackgroundEvent,
    select,
    selected,
    selectedOption,
    show,
    showAndSelectIfQuery,
    uid,
    NOT_MOVED_YET,
    ALREADY_MOVED_DOWN,
  };
};
