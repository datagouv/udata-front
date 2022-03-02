<template>
  <div
    class="fr-col fr-grid-row"
  >
    <input
      class="fr-input fr-col"
      :placeholder="$t('Search')"
      type="search"
      ref="input"
      autocomplete="off"
      role="combobox"
      aria-autocomplete="list"
      :aria-controls="uid"
      :aria-expanded="expanded"
      id="search-input"
      :aria-activedescendant="selected"
      name="q"
      v-model="q"
      @click.stop.capture="show"
      @keypress="show"
      @blur="focusOut"
    />
    <button
      type="button"
      ref="button"
      class="fr-btn"
      :title="$t('Search')"
      tabindex="-1"
      :aria-controls="uid"
      :aria-expanded="expanded"
      @click.prevent.stop.capture="showAndFocus"
    >
      {{  $t('Search') }}
    </button>
    <div
      class="fr-menu fr-collapse autocomplete"
      :id="uid"
      ref="list"
      role="listbox"
      aria-labelledby="search-label"
    >
      <ul class="fr-menu__list" role="listbox">
        <li id="dataset-option" role="option" :aria-selected="isSelected('dataset-option')">
          <MenuSearchOption :icon="datasetIcon" :query="q" :type="$t('datasets')" :link="datasetUrl"/>
        </li>
        <li id="reuse-option" role="option" :aria-selected="isSelected('reuse-option')">
          <MenuSearchOption :icon="reuseIcon" :query="q" :type="$t('reuses')" :link="reuseUrl"/>
        </li>
        <li id="organization-option" role="option" :aria-selected="isSelected('organization-option')">
          <MenuSearchOption :icon="organizationIcon" :query="q" :type="$t('organizations')" :link="organizationUrl"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted} from "vue";
import {useCollapse} from "../../composables/useCollapse";
import MenuSearchOption from "./menu-search-option";
import datasetIcon from "svg/search/dataset.svg";
import reuseIcon from "svg/search/reuse.svg";
import organizationIcon from "svg/search/organization.svg";
import useSearchUrl from "../../composables/useSearchUrl";
import useActiveDescendant from "../../composables/useActiveDescendant";

export default {
  components: {MenuSearchOption},
  setup() {
    const {expanded, uid, show, registerBackgroundEvent, removeBackgroundEvent} = useCollapse();
    const {select, selected, isSelected, focusOut} = useActiveDescendant();
    const q = ref('');
    const input = ref(null);
    const button = ref(null);
    const list = ref(null);

    const {datasetUrl, reuseUrl, organizationUrl} = useSearchUrl(q);

    onMounted(() => registerBackgroundEvent(input, list, button));
    onUnmounted(() => removeBackgroundEvent());

    const showAndFocus = () => {
      input.value.focus();
      show();
    }

    return {
      datasetUrl,
      reuseUrl,
      organizationUrl,
      button,
      input,
      list,
      expanded,
      selected,
      isSelected,
      uid,
      q,
      datasetIcon,
      reuseIcon,
      organizationIcon,
      focusOut,
      show,
      showAndFocus,
    }
  },
}
</script>
