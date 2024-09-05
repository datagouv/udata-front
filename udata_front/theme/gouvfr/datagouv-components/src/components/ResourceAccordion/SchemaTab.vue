<template>
    <div v-if="hasSchema" class="flex">
        <div v-if="loading">
            <SchemaLoader/>
        </div>
        <div v-else class="w-100">
            <h5 class="fr-h6 ">{{t('Data schema')}}</h5>
            <div class="flex items-center fr-mb-5v" style="max-width: 100%; overflow-y: auto;">
                <a
                    v-if="authorizeValidation"
                    class="fr-btn fr-btn--secondary fr-btn--sm fr-btn--secondary-grey-500 fr-mr-3v fr-btn--icon-left fr-icon-checkbox-line fr-mr-1v whitespace-nowrap"
                    :href="validationUrl"
                >
                    {{ t('See validation report') }}
                </a>
                <a
                    v-if="resource.schema?.name"
                    class="fr-btn fr-btn--secondary fr-btn--sm fr-btn--secondary-grey-500 fr-btn--icon-left fr-icon-book-2-line whitespace-nowrap"
                    :href="documentationUrl"
                >
                    {{ t('See schema documentation') }}
                </a>
            </div>
            <p>
                <span class="fr-text--xs fr-m-0">{{t('This file is following a schema: ')}}</span>
                <span class="fr-tag fr-tag--sm fr-icon-checkbox-circle-line fr-tag--icon-left whitespace-nowrap">
                    {{ title }}
                </span>
            </p>
            <ul class="fr-tags-group" v-if="schemaReport.size">
                <li v-for="[_key, schemaError] in schemaReport">
                    <p class="fr-tag fr-tag--sm">{{schemaError.name}}</p>
                </li>
            </ul>
            <i18n-t keypath="Schemas allow to describe data models, discover how schemas improve your data quality and the available use cases on {address}" class="fr-text--xs fr-m-0" tag="p" scope="global">
                <template #address>
                    <a :href="config.schema_documentation_url">schema.data.gouv.fr</a>
                </template>
            </i18n-t>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Resource } from '../../types/resources';
import { config } from "../../config";
import { useSchema } from '../../composables';
import SchemaLoader from './SchemaLoader.vue';

const props = defineProps<{
    resource: Resource;
}>();

const { t } = useI18n();
const { authorizeValidation, documentationUrl, loading, validationUrl, schemaReport} = useSchema(props.resource);

const hasSchema = computed(() => {
  return props.resource.schema && (props.resource.schema.name || props.resource.schema.url)
})
const title = computed(() => {
    if (! props.resource.schema) return null;
    return props.resource.schema.name || props.resource.schema.url
})
</script>