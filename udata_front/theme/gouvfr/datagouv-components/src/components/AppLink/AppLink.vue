<template>
  <a v-if="isExternalLink(to)" v-bind="externalAttrs" :href="to">
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
import { inject, useAttrs } from 'vue';
import { RouterLink, type RouterLinkProps, type RouteLocationRaw, routerKey } from 'vue-router';
withDefaults(defineProps<RouterLinkProps>(), {
  ariaCurrentValue: "page",
});
const router = inject(routerKey, null);
console.log(router);
const attrs = useAttrs();
console.log(attrs)
const externalAttrs = !router ? { ...attrs, target: attrs.target || "_blank" } : {};
function isExternalLink(link: RouteLocationRaw): link is string {
  return !router || (typeof link === 'string' && link.startsWith('http'));
}
</script>
