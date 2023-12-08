<template>
  <button
    type="button"
    class="fr-btn fr-btn--sm fr-btn--contrast fr-icon-clipboard-line"
    :aria-label="$t('Copy')"
    :data-clipboard-text="text"
    ref="button"
  >
  </button>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import Clipboard from "clipboard";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    }
  },
  setup() {
    /** @type {import("vue").Ref<HTMLButtonElement | undefined>} */
    const button = ref();
    onMounted(() => {
      if(button.value) {
        const clip = new Clipboard(button.value);
      }
    });
    return {
      button,
    };
  }
});
</script>
