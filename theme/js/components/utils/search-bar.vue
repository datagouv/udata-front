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
