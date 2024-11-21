<template>
  <div :id="id" class="fr-col fr-search-bar relative wrap" role="search">
    <label class="fr-label" :for="inputId" :id="labelId">
      {{ t('Search for data') }}
    </label>
    <span class="fr-icon-search-line absolute fr-m-1w" aria-hidden="true"></span>
    <input
      class="fr-input fr-col-12 fr-pl-10v"
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
      class="fr-collapse autocomplete w-100 fr-mt-1w shadow border-bottom-rounded"
      :id="uid"
      ref="listRef"
      role="listbox"
      :aria-labelledby="labelId"
      @mousedown.prevent
    >
      <ul class="w-100" role="listbox">
        <li
          v-for="option in options"
          :key="option.id"
          :id="option.id"
          role="option"
          :aria-selected="isSelected(option.id)"
        >
          <OrganizationSearchOption :logo="option.image_url" :name="option.name" :link="option.page" />
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
import type { Organization } from "@datagouv/components/ts";
import { watchDebounced } from "@vueuse/core";
import { useDropdown } from "../../../composables/useDropdown";
import { useToast } from "../../../composables/useToast";

const { t } = useI18n();
const { toast } = useToast();
const q = ref('');
const { id } = useUid("search");
const inputId = computed(() => `${id}-input`);
const labelId = computed(() => `${id}-label`);

const options = ref<Array<Organization>>([]);

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
    toast.error(t("An error occurred while fetching the options."));
  }
};

const { expanded, handleFocusOut, handleKeyDown, inputRef, isSelected, listRef, selected, searchSelectedOption, showAndSelectIfQuery, uid } = useDropdown(options, q);

watchDebounced(q, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchOptions();
  }
}, { debounce: 300 });
</script>

<style scoped>
  .fr-icon-search-line::before {
    height: 1.25rem;
  }
</style>
