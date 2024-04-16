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
      @keydown="handleKeyDown"
      @blur="handleFocusOut"
      @focus="showAndFocus"
    />
    <div
      class="fr-collapse autocomplete w-100 fr-mt-1w"
      :id="uid"
      ref="list"
      role="listbox"
      :aria-labelledby="labelId"
      @mousedown.prevent
    >
      <ul class="w-100" role="listbox">
        <li
          v-for="(option, index) in options"
          :key="option.id"
          :id="option.id"
          role="option"
          :aria-selected="selectedIndex === index"
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
import { useCollapse } from "../../../composables/useCollapse";
import OrganizationSearchOption from "./OrganizationSearchOption.vue";
import useUid from "../../../composables/useUid";
import { api } from "../../../plugins/api";
import type { Organization } from "@etalab/data.gouv.fr-components";
import { watchDebounced } from "@vueuse/core";

const { t } = useI18n();
const { expanded, uid, show, hide, registerBackgroundEvent, removeBackgroundEvent } = useCollapse();
const q = ref('');
const { id } = useUid("search");
const inputId = computed(() => `${id}-input`);
const labelId = computed(() => `${id}-label`);

const options = ref<Array<Organization>>([]);
const selectedIndex = ref(-1);

const onClickOutside = (event) => {
  if (!event.target.closest(`#${id}`) && expanded.value) {
    hide();
  }
};

onMounted(async () => {
  await fetchOptions();
  registerBackgroundEvent(input, list, button);
  document.addEventListener('click', onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
  removeBackgroundEvent()
});

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
}

const input = ref<HTMLElement | null>(null);
const button = ref<HTMLElement | null>(null);
const list = ref<HTMLElement | null>(null);

function showAndFocus () { 
  if (!expanded.value) {
    input.value?.focus();
    showAndSelectIfQuery();
  } else {
    searchSelectedOption();
  }
}

function showAndSelectIfQuery() {
  if (q.value && options.value.length > 0) {
    show();
    selectedIndex.value = 0;
  }
}

function handleKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      selectNextOption();
      break;
    case "ArrowUp":
      e.preventDefault();
      selectPreviousOption();
      break;
    case "Enter":
      e.preventDefault();
      searchSelectedOption();
      break;
    default:
      showAndSelectIfQuery();
      break;
  }
};

function handleFocusOut() {
  hide();
};

function searchSelectedOption() {
  const selectedOption = options.value[selectedIndex.value];
  if (selectedOption) {
    window.open(selectedOption.page, '_blank');
  }
};

function selectNextOption() {
  if (options.value.length === 0) return;
  selectedIndex.value = (selectedIndex.value + 1) % options.value.length;
};

function selectPreviousOption() {
  if (options.value.length === 0) return;
  selectedIndex.value = (selectedIndex.value - 1 + options.value.length) % options.value.length;
};

watchDebounced(q, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchOptions();
  }
}, { debounce: 300 });
</script>
