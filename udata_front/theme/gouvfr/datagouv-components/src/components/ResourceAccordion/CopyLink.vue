<template>
    <button type="button" @click="copy" class="fr-text--xs fr-mb-0">
        <span v-if="copied" style="color: #3558a2;">
            <span class="fr-icon-check-line fr-icon--sm fr-mr-1v"></span>
            <span>{{ t("Link copied!") }}</span>  
        </span>
        <span v-if="!copied">
            <span class="copy-icon fr-icon-todo-line fr-icon--sm fr-mr-1v"></span>
            <span class="copy-link">{{ t("Copy link") }}</span>  
        </span>
    </button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    value: string;
}>();

const { t } = useI18n();

const copied = ref(false);

const copy = () => {
  navigator.clipboard.writeText(props.value);
  copied.value = true;
  setTimeout(() => copied.value = false, 2000);
}
</script>
<style scoped>
button:hover .copy-icon {
    color: #3558a2;
}

.copy-link {
    display: none;
}
button:hover .copy-link {
    display: inline;
}
</style>