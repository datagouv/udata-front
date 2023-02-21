<template>
  <form @submit.prevent="searchWithoutAutocomplete">
    <div class="fr-search-bar" role="search" :aria-label="$t('Search resources')">
      <label class="fr-label" :for="eventName">
        {{ $t('Search resources') }}
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
import {reactive, watch, onUnmounted, defineComponent} from 'vue';
import {bus, RESOURCES_SEARCH} from "../../plugins/eventbus";
import useDebouncedRef from "../../composables/useDebouncedRef";
import {search_autocomplete_debounce, search_autocomplete_enabled} from "../../config";
export default defineComponent({
  props: {
    eventName: {
      type: /** @type {import("vue").PropType<import("../../plugins/eventbus").UdataSearchEventType>} */ (String),
      default: RESOURCES_SEARCH
    }
  },
  setup(props) {
    const searchValue = useDebouncedRef('', search_autocomplete_debounce);
    const totalResults = reactive(new Map());
    const search = () => bus.emit(props.eventName, searchValue.value);
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
    bus.on(/** @type {import("../../plugins/eventbus").UdataSearchResultUpdatedEventType} */ (props.eventName + "ResultsUpdated"), ({type, count}) => {
      totalResults.set(type, count);
    });
    watch(totalResults, results => {
      const total = Array.from(results.values()).reduce((total, resultPerType) => total + resultPerType, 0);
      bus.emit(/** @type {import("../../plugins/eventbus").UdataSearchResultTotalEventType} */ (props.eventName + 'ResultsTotal'), total);
    });
    return {
      search,
      searchWithoutAutocomplete,
      searchValue,
    }
  }
});
</script>
