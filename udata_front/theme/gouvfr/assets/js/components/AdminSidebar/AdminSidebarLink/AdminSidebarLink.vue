<template>
  <li class="fr-sidemenu__item">
    <div
      :class="{'fr-icon-svg fr-icon--sm': iconHtml}"
      class="fr-enlarge-link fr-sidemenu__link fr-mb-1w"
    >
      <div v-if="iconHtml" class="fr-mr-1w fr-grid-row" v-html="iconHtml"></div>
      <div v-else-if="icon" :class="icon" class="fr-mr-1w fr-icon--sm" aria-hidden="true"></div>
      <router-link :to="to">
        <TextClamp
          :text="label"
          :auto-resize="true"
          :max-lines="1"
        />
      </router-link>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import TextClamp from "vue3-text-clamp";

defineProps<{
  label: string,
  icon?: string,
  iconHtml?: string,
  to: RouteLocationRaw,
}>();
</script>

<style scoped>
.fr-sidemenu__link {
  padding: 0.25rem 0.375rem;
}

.fr-sidemenu__link[aria-current]:not([aria-current=false])::before {
  width: 0;
}

.fr-sidemenu__link:has(> [aria-current]) {
  border-radius: 2px;
  background-color: var(--background-alt-grey);
  color: var(--text-default-grey);
  font-weight: 800;
}

.fr-sidemenu__link:has(> [aria-current]):hover {
  background-color: var(--background-alt-grey-hover);
}

.fr-sidemenu__link:has(> [aria-current]):active {
  background-color: var(--background-alt-grey-active);
}
</style>
