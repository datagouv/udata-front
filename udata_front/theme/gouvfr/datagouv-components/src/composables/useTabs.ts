import { type Ref, onMounted, onUnmounted, reactive, readonly, ref } from "vue";
import { getRandomId } from "@gouvminint/vue-dsfr";

export default function useTabs(tabsRef: Ref<HTMLElement | null>, tablistRef: Ref<HTMLUListElement | null>, tabCount: number, initialSelectedIndex = 0) {
  const selectedIndex = ref(initialSelectedIndex);
  const generatedIds: Record<string, string> = reactive({});
  const asc = ref(true);
  const resizeObserver: Ref<ResizeObserver | null> = ref(null);

  const getTabPanels = () => tabsRef.value?.querySelectorAll('.fr-tabs__panel') || [];

  onMounted(() => {
    /*
      * Need to use a resize-observer as tab-content height can
      * change according to its inner components.
      */
    if (window.ResizeObserver) {
      resizeObserver.value = new window.ResizeObserver(() => {
        renderTabs();
      });
    }

    getTabPanels().forEach((element) => {
      if (element) {
        resizeObserver.value?.observe(element);
      }
    });
  });

  onUnmounted(() => {
    getTabPanels().forEach((element) => {
      if (element) {
        resizeObserver.value?.unobserve(element);
      }
    });
  });

  const isSelected = (idx: number) => {
    return selectedIndex.value === idx;
  };

  /*
  * Need to reimplement tab-height calc
  * @see https://github.com/GouvernementFR/dsfr/blob/main/src/component/tab/script/tab/tabs-group.js#L117
  */
  const renderTabs = () => {
    if (selectedIndex.value < 0) {
      return;
    }
    if (!tablistRef.value || !tablistRef.value.offsetHeight) {
      return;
    }
    const tablistHeight = tablistRef.value.offsetHeight;
    // Need to manually select tabs-content in case of manual slot filling
    const selectedTab = getTabPanels()[selectedIndex.value];
    if (!selectedTab || !(selectedTab as HTMLElement).offsetHeight) {
      return;
    }
    const selectedTabHeight = (selectedTab as HTMLElement).offsetHeight;
    tabsRef.value?.style.setProperty('--tabs-height', (tablistHeight + selectedTabHeight) + 'px');
  }

  const getIdFromIndex = (idx: number) => {
    if (generatedIds[idx]) {
      return generatedIds[idx];
    }
    const id = getRandomId('tab');
    generatedIds[idx] = id;
    return id;
  }

  const selectIndex = async (idx: number) => {
    asc.value = idx > selectedIndex.value;
    selectedIndex.value = idx;
  }

  const selectPrevious = async () => {
    const newIndex = selectedIndex.value === 0 ? tabCount - 1 : selectedIndex.value - 1;
    await selectIndex(newIndex);
  }

  const selectNext = async () => {
    const newIndex = selectedIndex.value === tabCount - 1 ? 0 : selectedIndex.value + 1;
    await selectIndex(newIndex);
  }

  const selectFirst = async () => {
    await selectIndex(0);
  }

  const selectLast = async () => {
    await selectIndex(tabCount - 1);
  }

  return {
    asc: readonly(asc),
    getIdFromIndex,
    isSelected,
    selectFirst,
    selectLast,
    selectNext,
    selectPrevious,
    selectIndex,
  };
};
