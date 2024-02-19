<template>
  <li class="fr-sidemenu__item">
    <div
      :class="{'fr-icon-svg fr-icon--sm': iconHtml}"
      class="fr-enlarge-link fr-sidemenu__link fr-mb-1w"
    >
      <div v-if="iconHtml" class="fr-mr-1w fr-grid-row" v-html="iconHtml"></div>
      <div v-else-if="icon" :class="icon" class="fr-mr-1w fr-icon--sm" aria-hidden="true"></div>
      <router-link :to="to">{{ label }}</router-link>
    </div>
  </li>
</template>
<script lang="ts">
import type { RouteLocationRaw } from "vue-router";
export type AdminSidebarLinkProps = {
  label: string,
  icon?: string,
  iconHtml?: string,
  to: RouteLocationRaw,
};
</script>
<script setup lang="ts">
defineProps<AdminSidebarLinkProps>();
</script>
