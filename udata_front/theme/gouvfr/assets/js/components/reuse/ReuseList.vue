<template>
  <div v-if="loading">
    <Loader />
  </div>
  <template v-else-if="totalResults">
    <ul ref="listRef" class="fr-grid-row fr-grid-row--gutters">
      <li
        class="fr-col-12"
        :class="{'fr-col-md-6': totalResults <= 2, 'fr-col-md-4': totalResults >= 3}"
        v-for="reuse in reuses"
        :key="reuse.id"
      >
        <ReuseCard :reuse="reuse" />
      </li>
    </ul>
    <Pagination
      v-if="totalResults > pageSize"
      :page="currentPage"
      :pageSize="pageSize"
      :totalResults="totalResults"
      :changePage="changePage"
      class="fr-mt-2w"
    />
  </template>
</template>

<script lang="ts">
import type { Reuse } from '../../types';
export type ReuseListProps = {
  reuses: Array<Reuse>,
  loading?: boolean,
  totalResults: number,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from '@etalab/udata-front-plugins-helper';
import Loader from "./loader.vue";
import ReuseCard from './Reuse.vue';


withDefaults(defineProps<ReuseListProps>(), {
  loading: false,
});

const emit = defineEmits<{
  (event: 'changePage', page: number): void,
}>();

const currentPage = ref(1);

/** TODO : use a config when the component moved to data.gouv.fr-components */
const pageSize = 20;

const listRef = ref<HTMLElement | undefined>();

function scrollToTop () {
  if (listRef.value) {
    listRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

function changePage (page: number) {
  currentPage.value = page;
  emit("changePage", page);
  scrollToTop();
}

</script>
