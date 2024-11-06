<template>
  <button
    type="button"
    @click="copy"
    class="fr-text--sm fr-mb-0 whitespace-nowrap relative fr-p-1v text-mention-grey line-height-1"
    :class="{'border bg-white rounded-xxs text-grey-500': hideLabel }"
  >
    <span v-if="copied" style="color: #3558a2;">
        <OhVueIcon :height="16" :width="16" name="ri-check-line" />
        <span class="fr-ml-1v copy-label" :class="{ 'fr-sr-only': hideLabel }">{{ copiedLabel }}</span>
    </span>
    <span v-if="!copied">
        <OhVueIcon
          :height="16"
          :width="16"
          :name="hideLabel ? 'ri-clipboard-line' : 'ri-file-copy-line'"
          class="copy-icon"
        />
        <span class="fr-ml-1v copy-link copy-label" :class="{ 'fr-sr-only': hideLabel }">{{ label }}</span>
    </span>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RiCheckLine, RiClipboardLine, RiFileCopyLine } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from 'oh-vue-icons';

addIcons(RiCheckLine, RiClipboardLine, RiFileCopyLine)

const props = withDefaults(defineProps<{
  text: string;
  label: string;
  copiedLabel: string;
  hideLabel?: boolean;
}>(), {
  hideLabel: false,
});

const copied = ref(false);

const copy = () => {
  navigator.clipboard.writeText(props.text);
  copied.value = true;
  setTimeout(() => copied.value = false, 2000);
}
</script>
<style scoped>
button:hover .copy-icon {
  color: #3558a2;
}

.copy-link {
  /* Using opacity here to prevent moving object with display:none (for example when clamping a text before the button) */
  opacity: 0%;
}
button:hover .copy-link {
  opacity: 100%;
}

/*
We may want to enable this to leave more space for title in small screens… But it also affects
buttons in the body of the resources panels and we don't want it…
@container (max-width: 600px) {
  .copy-label {
    position: absolute;
    bottom: -1rem;
    left: 0;
  }
} */
</style>
