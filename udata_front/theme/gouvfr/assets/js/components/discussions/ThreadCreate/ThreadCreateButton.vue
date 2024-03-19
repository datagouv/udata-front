<template>
  <button
    type="button"
    class="fr-btn"
    :class="{'fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-add-line fr-btn--icon-left': !primary}"
    @click.prevent="$emit('click')"
  >
    {{ $t('Start a new discussion') }}
  </button>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  emits: ["click"],
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
