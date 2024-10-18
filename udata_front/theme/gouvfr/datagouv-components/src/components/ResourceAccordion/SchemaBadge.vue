<template>
    <span class="inline-flex fr-mb-0 align-items-baseline fr-text--xs" v-if="title">
        <Toggletip position="right" noMargin class="relative z-2">
            <template #toggletip="{ close }">
                <div class="flex justify-between border-bottom">
                    <h5 class="fr-text--sm fr-my-0 fr-p-2v">{{$t("Data schema")}}</h5>
                    <button type="button" @click="close" :title="t('Close')" class="border-left close-button flex items-center justify-center">&times;</button>
                </div>
                <div class="fr-p-3v">
                    <div v-if="validataStatus === 'ok'">
                        {{ t("This file is valid for the shema:") }} <component :is="documentationUrl ? 'a' : 'span'" :href="documentationUrl" class="fr-link fr-text--sm">{{ title }}</component>.
                    </div>
                    <div v-if="validataStatus === 'warnings'">
                        {{ t("This file is valid for the shema:") }} <component :is="documentationUrl ? 'a' : 'span'" :href="documentationUrl" class="fr-link fr-text--sm">{{ title }}</component>. {{ t("But its compliance could be improved.") }}
                    </div>
                    <div v-if="validataStatus === 'ko'">
                        {{ t("This file indicates to follow the schema:") }} <component :is="documentationUrl ? 'a' : 'span'" :href="documentationUrl" class="fr-link fr-text--sm">{{ title }}</component>. {{ t("But is not compliant.") }}
                    </div>

                    <div class="text-default-warning flex items-center fr-mt-4v" v-if="validataWarnings.length">
                        <span class="fr-icon-alert-line fr-icon--sm fr-mr-1v"></span>
                        <span>{{ validataWarnings.length }} {{ t('advices') }}</span>
                    </div>
                    <div class="text-default-warning flex items-center fr-mt-4v" v-if="validataStructureErrors.length">
                        <span class="fr-icon-alert-line fr-icon--sm fr-mr-1v"></span>
                        <span>{{ validataStructureErrors.length }} {{ t('structure errors') }}</span>
                    </div>
                    <div class="text-default-warning flex items-center fr-mt-4v" v-if="validataBodyErrors.length">
                        <span class="fr-icon-alert-line fr-icon--sm fr-mr-1v"></span>
                        <span>{{ validataBodyErrors.length }} {{ t('body errors') }}</span>
                    </div>

                    <div class="w-100 text-align-right fr-mt-5v" v-if="validationUrl" target="_blank">
                        <a :href="validationUrl">{{ t('See validation report') }}</a>
                    </div>
                </div>
            </template>
        </Toggletip>
        <span class="fr-mr-1v text-grey-380">{{ t("Schema:") }}</span>
        <span class="flex items-center bg-error-950 rounded-sm">
            <span class="fr-tag fr-tag--sm">{{ title }}</span>
            <span v-if="validataStatus === 'warnings'" class="flex items-center padding-sm">
                <span class="fr-icon-alert-line fr-icon--sm fr-mr-1v"></span>
                <span>{{ t("Invalid") }}</span>
            </span>
            <span v-if="validataStatus === 'ko'" class="flex items-center text-warning-425 padding-sm">
                <span class="fr-icon-error-line fr-icon--sm fr-mr-1v"></span>
                <span>{{ t("Invalid") }}</span>
            </span>
        </span>
    </span>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Resource } from '../../types/resources';
import { useI18n } from 'vue-i18n';
import Toggletip from '../Toggletip/Toggletip.vue';
import { findSchemaInCatalog, getCatalog, getSchemaDocumentation, getSchemaValidationUrl, RegisteredSchema, ValidataError } from '../../api/schemas';

const props = defineProps<{
    resource: Resource;
}>();

const { t } = useI18n();

const catalog = ref<Array<RegisteredSchema> | null>(null);
onMounted(async () => {
    catalog.value = await getCatalog();
})
const catalogSchema = computed(() => catalog.value ? findSchemaInCatalog(catalog.value, props.resource.schema) : null)
const validationUrl = computed(() => catalogSchema.value ? getSchemaValidationUrl(props.resource, catalogSchema.value) : null)
const documentationUrl = computed(() => catalogSchema.value ? getSchemaDocumentation(catalogSchema.value.name) : null)

const title = computed(() => {
    if (! props.resource.schema) return null;
    return props.resource.schema.name || props.resource.schema.url
})

const validataErrors = computed<Array<ValidataError>>(() => props.resource.extras["validation-report:errors"] || [])
const validataWarnings = computed(() => validataErrors.value.filter((error) => [""].includes(error.code)))
const validataBodyErrors = computed(() => validataErrors.value.filter((error) => ["#body", "#cell", "#content", "#row", "#table"].some((tag) => error.tags.includes(tag))))
const validataStructureErrors = computed(() => validataErrors.value.filter((error) => ["#head", "#structure", "#header"].some((tag) => error.tags.includes(tag))))


const validataStatus = computed<'ok' | 'warnings' | 'ko'>(() => {
    if (validataErrors.value.length === 0) return 'ok';
    if (validataErrors.value.length === validataWarnings.value.length) return 'warnings';
    return 'ko';
})

</script>
<style scoped>
.close-button {
    width: 40px;
    font-size: 1.2rem;
    line-height: 0;
}
.rounded-sm {
    border-radius: 0.75rem;
}
.padding-sm {
    padding: .125rem .5rem .125rem .25rem;
}
</style>
