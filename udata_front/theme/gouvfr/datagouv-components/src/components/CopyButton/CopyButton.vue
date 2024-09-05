<template>
  <button type="button" @click="copy" class="fr-text--xs fr-mb-0 whitespace-nowrap relative">
      <span v-if="copied" style="color: #3558a2;">
          <OhVueIcon name="ri-file-copy-line" class="fr-mr-1v" />
          <span class="copy-label">{{ copiedLabel }}</span>  
      </span>
      <span v-if="!copied">
          <OhVueIcon name="ri-file-copy-line" class="copy-icon fr-mr-1v" />
          <span class="copy-link copy-label">{{ label }}</span>  
      </span>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RiFileCopyLine } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from 'oh-vue-icons';

addIcons(RiFileCopyLine)

const props = defineProps<{
  text: string;
  label: string;
  copiedLabel: string;
}>();

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