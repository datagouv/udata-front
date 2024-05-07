<template>
  <div :id="id" class="fr-col fr-search-bar wrap" role="search">
    <label class="fr-label" :for="inputId" :id="labelId">
      {{ t('Search for data') }}
    </label>
    <input
      class="fr-input fr-col-12"
      :placeholder="t('Search an organization on data.gouv.fr')"
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
    <div
      class="fr-collapse autocomplete w-100 fr-mt-1w shadow"
      :id="uid"
      ref="listRef"
      role="listbox"
      :aria-labelledby="labelId"
    >
      <ul class="w-100" role="listbox">
        <li
          v-for="option in options"
          :key="option.id"
          :id="option.id"
          role="option"
          :aria-selected="isSelected(option.id)"
        >
          <OrganizationSearchOption :logo="option.image_url" :name="option.name" :link="option.page"/>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from 'vue-i18n';
import OrganizationSearchOption from "./OrganizationSearchOption.vue";
import useUid from "../../../composables/useUid";
import { api } from "../../../plugins/api";
import type { Organization } from "@etalab/data.gouv.fr-components";
import { watchDebounced } from "@vueuse/core";
import { useDropdown } from "../../../composables/useDropdown";

const { t } = useI18n();
const q = ref('');
const { id } = useUid("search");
const inputId = computed(() => `${id}-input`);
const labelId = computed(() => `${id}-label`);

const options = ref<Array<Organization>>([]);
const selectedIndex = ref(-1);

async function fetchOptions() {
  try {
    const response = await api.get('/organizations/suggest/', { params: { q: q.value, size: 50 } });
    options.value = response.data.map((option: Organization) => ({
      ...option,
      id: option.id,
      page: `${option.page}#/information/membres`,
      link: option.page
    }));
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

const { expanded, handleFocusOut, handleKeyDown, inputRef, isSelected, listRef, selected, searchSelectedOption, showAndSelectIfQuery, uid} = useDropdown(options, q);

watchDebounced(q, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchOptions();
  }
}, { debounce: 300 });
</script>

<style scoped>
  .shadow {
    box-shadow: 0px 4px 2px var(--border-default-grey);
  }
</style>
