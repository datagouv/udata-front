<template>
  <button
    type="button"
    class="fr-btn fr-btn--sm fr-btn--contrast fr-icon-clipboard-line"
    :aria-label="t('Copy')"
    :data-clipboard-text="text"
    ref="buttonRef"
  >
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import Clipboard from "clipboard";

defineProps<{
  /**
   * The text to copy
   */
  text: string,
}>();

const { t } = useI18n();
const buttonRef = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  if(buttonRef.value) {
    new Clipboard(buttonRef.value);
  }
});
</script>
