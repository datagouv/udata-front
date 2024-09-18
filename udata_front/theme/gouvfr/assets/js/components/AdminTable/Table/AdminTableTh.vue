<template>
  <th class="fr-text--bold">
    <slot v-if="!sortable"></slot>
    <div class="fr-grid-row fr-grid-row--middle justify-between" v-else>
      <slot></slot>
      <button
        class="fr-ml-1w fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
        :class="{
          'fr-icon-arrow-down-line': !sorted || sorted === 'asc',
          'fr-icon-arrow-up-line': sorted === 'desc',
          'text-grey-500': sorted,
          'text-mention-grey': !sorted,
        }"
        @click="toggleSort"
        :title="t('Sort')"
      >
        {{ t("Sort") }}
      </button>
    </div>
  </th>
</template>

<script lang="ts">
import type { SortDirection } from "../../../types";
import { computed } from "vue";
export type AdminTableThProps = {
  sorted?: SortDirection | null;
};
</script>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<AdminTableThProps>();

const emit = defineEmits<{
  (event: 'sort', direction: SortDirection): void
}>();

const { t } = useI18n();

const sortable = computed(() => props.sorted !== undefined);

function toggleSort() {
  if(props.sorted === "desc") {
    return emit("sort", "asc");
  }
  return emit("sort", "desc");
}
</script>

<style scoped>
th {
  padding: 0.34375rem !important;
  text-transform: uppercase;
}
.fr-btn--sm[class*=" fr-icon-"]:not([class*=fr-btn--icon-]) {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  max-width: 1.5rem;
  min-height: 1.5rem;
  max-height: 1.5rem;
  line-height: 1rem;
}
</style>
