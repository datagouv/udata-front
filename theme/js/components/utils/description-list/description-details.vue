<template>
  <dd
    class="fr-text--sm fr-ml-0 fr-mt-0 fr-mb-2w text-mention-grey"
    :class="{'text-overflow-ellipsis': withEllipsis}"
  >
    <slot></slot>
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
