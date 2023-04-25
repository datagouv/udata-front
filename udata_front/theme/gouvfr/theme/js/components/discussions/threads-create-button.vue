<template>
  <button
    class="fr-btn"
    :class="{'fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-add-line fr-btn--icon-left': !primary}"
    @click.prevent="click"
  >
    {{ $t('Start a new discussion') }}
  </button>
</template>

<script>
import {defineComponent} from "vue";
import {bus, DISCUSSIONS_START_THREAD} from "../../plugins/eventbus";

export default defineComponent({
  props: {
    onClick: {
      type: Function,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click() {
      return this.onClick? this.onClick() : bus.emit(DISCUSSIONS_START_THREAD);
    }
  }
});
</script>
