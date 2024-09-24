<template>
    <ActionCard
        :title="t(`Didn't find what you are looking for?`)"
        :icon="magnifyingGlassIcon"
        type="primary"
    >
        <p class="fr-mt-1v fr-mb-3v">
            {{ t("Try resetting the filters to broaden your search.") }}<br/>
            {{ t("You can also check ongoing requests and submit your own on our forum dedicated to data discovery and openness.") }}
        </p>
        <template #actions>
            <button @click="$emit('resetFilters')" class="fr-btn fr-btn--secondary">
                {{ t("Reset filters") }}
            </button>
            <a v-if="data_search_feedback_form_url" :href="data_search_feedback_form_url" class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-lightbulb-line fr-ml-1w">
                {{ t("Check our forum") }}
            </a>
        </template>
    </ActionCard>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import magnifyingGlassIcon from "../../../../templates/svg/illustrations/magnifying_glass.svg";
import { data_search_feedback_form_url } from "../../config";
import ActionCard from './ActionCard/ActionCard.vue';

const { t } = useI18n();

defineEmits<{
    (e: 'resetFilters'): void
}>();
</script>
