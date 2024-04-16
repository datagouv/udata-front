<template>
  <a v-if="isExternalLink(to)" v-bind="$attrs" :href="to" target="_blank">
    <slot></slot>
  </a>
  <router-link
    v-else
    v-bind="$props"

  >
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { RouterLink, type RouterLinkProps, type RouteLocationRaw, routerKey } from 'vue-router';
withDefaults(defineProps<RouterLinkProps>(), {
  ariaCurrentValue: "page",
});
const router = inject(routerKey, null);
function isExternalLink(link: RouteLocationRaw): link is string {
  return !router || (typeof link === 'string' && link.startsWith('http'));
}
</script>
