<template>
    <span class="inline-flex items-center fr-text--xs" v-if="title">
        <span class="fr-icon-information-line fr-icon--sm fr-mr-1v"></span>
        <span class="fr-mr-1v">{{ t("Schema:") }}</span>
        <span class="fr-tag fr-tag--sm">
            <span>{{ title }}</span>
            <span v-if="isInvalid" class="fr-ml-2v flex items-center text-default-error">
                <span class="fr-icon-error-line fr-icon--sm fr-mr-1v"></span>
                <span>{{ t("Invalid") }}</span>
            </span>
        </span>
    </span>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { Resource } from '../../types/resources';
import { useI18n } from 'vue-i18n';

const props = withDefaults(defineProps<{
    resource: Resource;
    isInvalid?: boolean;
}>(), {
    isInvalid: false,
});

const { t } = useI18n();

const title = computed(() => {
    if (! props.resource.schema) return null;
    return props.resource.schema.name || props.resource.schema.url
})
</script>