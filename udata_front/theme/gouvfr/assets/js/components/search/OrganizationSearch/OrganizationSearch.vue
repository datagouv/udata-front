<template>
  <div :id="id" class="fr-col fr-search-bar wrap" role="search">
    <label class="fr-label" :for="inputId" :id="labelId">
      {{ t('Search for data') }}
    </label>
    <input
      class="fr-input fr-col-12"
      :placeholder="t('Search an organization on data.gouv.fr')"
      ref="input"
      autocomplete="off"
      role="combobox"
      aria-autocomplete="list"
      :aria-controls="uid"
      :aria-expanded="expanded"
      :id="inputId"
      data-cy="search-input"
      :aria-activedescendant="options[selectedIndex]?.id"
      name="q"
      v-model="q"
      @click.stop.capture="showAndSelectIfQuery"
      @keydown="handleKeyDownEvent"
      @keypress.enter.prevent="searchSelectedOption"
      @blur="handleFocusOut"
    />
    <div
      class="fr-collapse autocomplete w-100 fr-mt-1w"
      :id="uid"
      ref="list"
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
import { ref, computed, onMounted, onUnmounted } from "vue";
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

const { expanded, handleFocusOut, handleKeyDown, isSelected, registerBackgroundEvent, removeBackgroundEvent, selectedOption, showAndSelectIfQuery, uid} = useDropdown(options);

async function fetchOptions() {
  try {
    const response = await api.get('/organizations/suggest/', { params: { q: q.value, size: 50 } });
    options.value = response.data.map((option: Organization) => ({
      ...option,
      id: option.id,
      page: `${option.page}#/information/membres`
    }));
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

const input = ref<HTMLElement | null>(null);
const list = ref<HTMLElement | null>(null);
const button = ref<HTMLElement | null>(null);

onMounted(() => registerBackgroundEvent(input, list, button));
onUnmounted(() => removeBackgroundEvent());

const searchSelectedOption = () => {
  if(selectedOption.value) {
    window.location.href = selectedOption.value.page;
  }
};

function handleKeyDownEvent(e: KeyboardEvent) {
  handleKeyDown(e, q);
}

watchDebounced(q, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchOptions();
  }
}, { debounce: 300 });
</script>
