import { useCollapse } from './useCollapse';
import useActiveDescendant from './useActiveDescendant';

export function useDropdown(options) {
  const { expanded, handleKeyPressForCollapse, hide, registerBackgroundEvent, removeBackgroundEvent, show, uid } = useCollapse();
  const { focusOut, handleKeyPressForActiveDescendant, isSelected, select, selected, selectedOption, NOT_MOVED_YET, ALREADY_MOVED_DOWN } = useActiveDescendant(options);

  return {
    expanded,
    focusOut,
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
    uid,
    NOT_MOVED_YET,
    ALREADY_MOVED_DOWN
  };
};
