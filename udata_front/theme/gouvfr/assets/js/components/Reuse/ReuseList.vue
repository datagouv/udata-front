<template>
  <div v-if="loading">
    <Loader />
  </div>
  <template v-else-if="totalResults">
    <ul ref="listRef" class="fr-grid-row fr-grid-row--gutters">
      <li
        class="fr-col-12"
        :class="{'fr-col-md-6': reuses.length <= 2, 'fr-col-md-4': reuses.length >= 3}"
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
      @change="changePage"
      class="fr-mt-2w"
    />
  </template>
</template>

<script lang="ts">
import type { Reuse } from "@datagouv/components/ts";
export type ReuseListProps = {
  reuses: Array<Reuse>,
  loading?: boolean,
  totalResults: number,
  pageSize?: number,
};

/** TODO : use a config when the component moved to data.gouv.fr-components */
const defaultPageSize = 20;
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from '@datagouv/components/ts';
import ReuseCard from "./Reuse.vue";
import Loader from "./loader.vue";

withDefaults(defineProps<ReuseListProps>(), {
  loading: false,
  pageSize: defaultPageSize,
});

const emit = defineEmits<{
  (event: 'changePage', page: number): void,
}>();

const currentPage = ref(1);

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
