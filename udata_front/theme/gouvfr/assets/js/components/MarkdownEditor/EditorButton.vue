<template>
  <button
    class="fr-btn fr-btn--secondary-grey-400 fr-btn--sm fr-btn--tertiary-no-outline"
    :class="icon"
    role="menuitem"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
export type EditorButtonProps = {
  /**
   * The DSFR icon to show
   */
  icon: string;
};
</script>
<script setup lang="ts">
defineProps<EditorButtonProps>();
</script>
