<template>
  <div
    :id="id"
    class="fr-col fr-search-bar wrap"
    role="search"
  >
    <label class="fr-label" :for="inputId" :id="labelId">
      {{ t('Search for data') }}
    </label>
    <input
      class="fr-input fr-col"
      :placeholder="t('Search')"
      ref="inputRef"
      autocomplete="off"
      role="combobox"
      aria-autocomplete="list"
      :aria-controls="uid"
      :aria-expanded="expanded"
      :id="inputId"
      data-cy="search-input"
      :aria-activedescendant="selected"
      name="q"
      v-model="q"
      @click.stop.capture="showAndSelectIfQuery"
      @keydown="handleKeyDown"
      @keypress.enter.prevent="searchSelectedOption"
      @blur="handleFocusOut"
    />
    <button
      type="button"
      ref="buttonRef"
      class="fr-btn"
      tabindex="-1"
      :aria-controls="uid"
      :aria-expanded="expanded"
      @click.prevent.stop.capture="showAndFocus"
    >
      {{  t('Search') }}
    </button>
    <div
      class="fr-menu fr-collapse autocomplete"
      :id="uid"
      ref="listRef"
      role="listbox"
      :aria-labelledby="labelId"
      @mousedown.prevent
    >
      <ul class="fr-menu__list" role="listbox">
        <li
          v-for="option in options"
          :key="option.id"
          :id="option.id"
          role="option"
          :aria-selected="isSelected(option.id)"
        >
          <MenuSearchOption :icon="option.icon" :query="q" :type="option.type" :link="option.link"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, ComputedRef, computed} from "vue";
import { useI18n } from 'vue-i18n';
import MenuSearchOption from "./MenuSearchOption.vue";
import datasetIcon from "../../../../../templates/svg/search/dataset.svg";
import reuseIcon from "../../../../../templates/svg/search/reuse.svg";
import organizationIcon from "../../../../../templates/svg/search/organization.svg";
import useSearchUrl from "../../../composables/useSearchUrl";
import { useDropdown } from "../../../composables/useDropdown";
import useUid from "../../../composables/useUid";

type MenuOption = {
  id: string;
  icon: string;
  type: string;
  link: ComputedRef<string>;
};

const { t } = useI18n();
const q = ref('');
const { datasetUrl, reuseUrl, organizationUrl } = useSearchUrl(q);
const { id } = useUid("search");
const inputId = computed(() => `${id}-input`);
const labelId = computed(() => `${id}-label`);

const options = ref<Array<MenuOption>>([
  {
    id: "dataset-option",
    icon: datasetIcon,
    type: t('datasets'),
    link: datasetUrl,
  },
  {
    id: "reuse-option",
    icon: reuseIcon,
    type: t('reuses'),
    link: reuseUrl,
  },
  {
    id: "organization-option",
    icon: organizationIcon,
    type: t('organizations'),
    link: organizationUrl,
  },
]);

const { buttonRef, expanded, handleFocusOut, handleKeyDown, inputRef, isSelected, listRef, searchSelectedOption, selected, showAndFocus, showAndSelectIfQuery, uid} = useDropdown(options, q);
</script>
