<template>
  <form @submit.prevent="searchWithoutAutocomplete">
    <div class="fr-search-bar" role="search" :aria-label="$t('Search files')">
      <label class="fr-label" :for="eventName">
        {{ $t('Search files') }}
      </label>
      <input
        class="fr-input"
        placeholder="Rechercher"
        type="search"
        :id="eventName"
        v-model="searchValue"
      />
      <button class="fr-btn" type="submit">
        {{ $t('Search') }}
      </button>
    </div>
  </form>
</template>

<script>
import {watch, onUnmounted, defineComponent} from 'vue';
import {bus, RESOURCES_SEARCH} from "../../plugins/eventbus";
import useDebouncedRef from "../../composables/useDebouncedRef";
import {search_autocomplete_debounce, search_autocomplete_enabled} from "../../config";
export default defineComponent({
  props: {
    eventName: {
      type: /** @type {import("vue").PropType<import("../../plugins/eventbus").SearchEvents>} */ (String),
      default: RESOURCES_SEARCH
    },
    type: {
      type: String,
    }
  },
  setup(props) {
    const searchValue = useDebouncedRef('', search_autocomplete_debounce);
    const search = () => {
      bus.emit(props.eventName, {
        type: props.type,
        value: searchValue.value,
      });
    };
    if(search_autocomplete_enabled) {
      watch(searchValue, search);
    }
    let timeoutId;
    const searchWithoutAutocomplete = () => {
      timeoutId = setTimeout(() => {
        search();
      }, search_autocomplete_debounce);
    };
    onUnmounted(() => clearTimeout(timeoutId));
    return {
      search,
      searchWithoutAutocomplete,
      searchValue,
    }
  }
});
</script>
