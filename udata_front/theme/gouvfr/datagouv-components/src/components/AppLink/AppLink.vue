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
import { computed, inject, useAttrs } from 'vue';
import { RouterLink, type RouterLinkProps, routerKey } from 'vue-router';
const props = withDefaults(defineProps<{ to: string } & RouterLinkProps>(), {
  ariaCurrentValue: "page",
});
const router = inject(routerKey, null);
const attrs = useAttrs();
const externalAttrs = computed(() => {
  if (router) {
    if (typeof props.to === 'string' && props.to.startsWith('http')) {
      return { ...attrs, target: "_blank" };
    }
    return attrs;
  } else {
    return { ...attrs, target: attrs.target };
  }
});

function isExternalLink(link: string): boolean {
  return !router || typeof link === 'string' && link.startsWith('http');
}
</script>
