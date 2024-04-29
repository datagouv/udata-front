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
const attrs = useAttrs();
const externalAttrs = { ...attrs, ...( !router ? { target: attrs.target } : {} ) };
function isExternalLink(link: RouteLocationRaw): link is string {
  if (router) {
    if (typeof link === 'string' && link.startsWith('http')) {
      externalAttrs.target = "_blank";
    } else {
      return false;
    }
  }
  return true;
}
</script>
