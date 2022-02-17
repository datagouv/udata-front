<template>
  <div class="fr-search-bar" role="search">
    <label class="fr-label" for="search-resources">
      {{ $t('Search resources') }}
    </label>
    <input class="fr-input" placeholder="Rechercher" type="search" id="search-resources" v-model="search">
    <button class="fr-btn" :title="$t('Search')" @click.prevent="$bus.emit(eventName, search)">
      {{ $t('Search') }}
    </button>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  props: {
    eventName: {
      type: String,
      default: 'search'
    }
  },
  setup() {
    const search = ref('');
    return {
      search,
    }
  }
}
</script>

<style scoped>

</style>
