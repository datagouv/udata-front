<template>
  <form @submit.prevent="$bus.emit(eventName, search)">
    <div class="fr-search-bar" role="search">
      <label class="fr-label" for="search-resources">
        {{ $t('Search resources') }}
      </label>
      <input class="fr-input" placeholder="Rechercher" type="search" id="search-resources" v-model="search">
      <button class="fr-btn" :title="$t('Search')" type="submit">
        {{ $t('Search') }}
      </button>
    </div>
  </form>
</template>

<script>
import {ref, reactive, watch} from 'vue';
import {bus} from "../../plugins/eventbus";
export default {
  props: {
    eventName: {
      type: String,
      default: 'search'
    }
  },
  setup(props) {
    const search = ref('');
    const totalResults = reactive(new Map());
    bus.on(props.eventName + ".results.updated", ({type, count}) => {
      totalResults.set(type, count);
    });
    watch(totalResults, results => {
      const total = Array.from(results.values()).reduce((total, resultPerType) => total + resultPerType, 0);
      bus.emit(props.eventName + '.results.total', total);
    });
    return {
      search,
    }
  }
}
</script>

<style scoped>

</style>
