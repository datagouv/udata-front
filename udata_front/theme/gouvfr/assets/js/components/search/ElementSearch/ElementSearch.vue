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
      @keydown.enter.prevent="searchSelectedOption"
      @blur="handleFocusOut"
    />
    <button
      type="button"
      ref="button"
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
      ref="list"
      role="listbox"
      :aria-labelledby="labelId"
      @mousedown.prevent
    >
      <ul class="fr-menu__list" role="listbox">
        <li
          v-for="(option, index) in options"
          :key="option.id"
          :id="option.id"
          role="option"
          :aria-selected="selectedIndex === index"
        >
          <ElementSearchOption :logo="option.image_url" :name="option.name" :link="option.link"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useI18n } from 'vue-i18n';
import { useCollapse } from "../../../composables/useCollapse";
import ElementSearchOption from "./ElementSearchOption.vue";
import useUid from "../../../composables/useUid";
import { api } from "../../../plugins/api";

const { t } = useI18n();
const { handleKeyPressForCollapse, expanded, uid, show, hide, registerBackgroundEvent, removeBackgroundEvent } = useCollapse();
const q = ref('');
const { id } = useUid("search");
const inputId = computed(() => `${id}-input`);
const labelId = computed(() => `${id}-label`);

const options = ref<Array<any>>([]);
const selectedIndex = ref(-1);

onMounted(async () => {
  await fetchOptions();
  registerBackgroundEvent(input, list, button);
});

onUnmounted(() => removeBackgroundEvent());

async function fetchOptions() {
  // Make API call to fetch options
  try {
    console.log(q.value)
    const response = await api.get('/organizations/suggest/', { params: { q: q.value, size: 50 } });
    console.log(response.data)
    options.value = response.data.map((option: any) => ({
      ...option,
      id: option.id
    }));
  } catch (error) {
    console.error('Error fetching options:', error);
  }
}

const input = ref<HTMLElement | null>(null);
const button = ref<HTMLElement | null>(null);
const list = ref<HTMLElement | null>(null);

const showAndFocus = () => {
  if (!expanded.value) {
    input.value?.focus();
    showAndSelectIfQuery();
  } else {
    searchSelectedOption();
  }
}

const showAndSelectIfQuery = () => {
  if (q.value && options.value.length > 0) {
    show();
    selectedIndex.value = 0;
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    e.preventDefault(); // Prevent default scrolling behavior
    selectNextOption();
  } else if (e.key === "ArrowUp") {
    e.preventDefault(); // Prevent default scrolling behavior
    selectPreviousOption();
  } else {
    showAndSelectIfQuery();
    handleKeyPressForCollapse(e);
  }
}

const handleFocusOut = () => {
  hide();
};

const searchSelectedOption = () => {
  const selectedOption = options.value[selectedIndex.value];
  if (selectedOption) {
    window.location.href = selectedOption.link;
  }
};

const selectNextOption = () => {
  if (options.value.length === 0) return;
  selectedIndex.value = (selectedIndex.value + 1) % options.value.length;
};

const selectPreviousOption = () => {
  if (options.value.length === 0) return;
  selectedIndex.value = (selectedIndex.value - 1 + options.value.length) % options.value.length;
};

watch(q, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchOptions(); 
  }
});
</script>
