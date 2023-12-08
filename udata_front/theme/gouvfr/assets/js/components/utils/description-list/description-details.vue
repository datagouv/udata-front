<template>
  <dd
    class="fr-text--sm fr-ml-0 fr-mt-0 fr-mb-2w text-mention-grey h-4w fr-grid-row fr-grid-row--middle"
  >
    <div class="fr-col text-overflow-ellipsis" v-if="withEllipsis">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </dd>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    withEllipsis: {
      type: Boolean,
      default: true
    }
  }
});
</script>
