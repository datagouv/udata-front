<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { type Resource } from '../../types/resources';
import CopyButton from '../CopyButton/CopyButton.vue';
import DescriptionDetails from '../DescriptionList/DescriptionDetails.vue';
import DescriptionList from '../DescriptionList/DescriptionList.vue';
import DescriptionTerm from '../DescriptionList/DescriptionTerm.vue';
import { filesize, formatDate, getResourceLabel } from "../../helpers";
import ExtraAccordion from '../ExtraAccordion/ExtraAccordion.vue';
import { computed } from 'vue';

const props = defineProps<{
    resource: Resource;
}>();

const hasExtras = computed(() => Object.keys(props.resource.extras).length)

const { t } = useI18n();
</script>
<template>
    <div>
        <div class="fr-grid-row fr-grid-row--gutters-5v">
            <DescriptionList class="fr-col fr-p-5v">
                <DescriptionTerm>{{ t('URL') }} <CopyButton :label="$t('Copy link')" :copied-label="$t('Link copied!')" :text="resource.url"/></DescriptionTerm>
                <DescriptionDetails>
                    <code><a :href="resource.url">{{resource.url}}</a></code>
                </DescriptionDetails>
                <DescriptionTerm>{{ t('Stable URL') }} <CopyButton :label="$t('Copy link')" :copied-label="$t('Link copied!')" :text="resource.latest"/></DescriptionTerm>
                <DescriptionDetails>
                    <code><a :href="resource.latest">{{resource.latest}}</a></code>
                </DescriptionDetails>
                <DescriptionTerm>{{ t('Identifier') }} <CopyButton :label="$t('Copy ID')" :copied-label="$t('ID copied!')" :text="resource.id"/></DescriptionTerm>
                <DescriptionDetails >
                    <code>{{ resource.id }}</code>
                </DescriptionDetails>
                <template v-if="resource.checksum">
                    <DescriptionTerm>{{resource.checksum.type}} <CopyButton :label="$t('Copy checksum')" :copied-label="$t('Checksum copied!')" :text="resource.checksum.value"/></DescriptionTerm>
                    <DescriptionDetails>
                        <code>{{resource.checksum.value}}</code>
                    </DescriptionDetails>
                </template>
            </DescriptionList>
            <DescriptionList class="fr-p-5v">
                <DescriptionTerm>{{ t('Created on') }}</DescriptionTerm>
                <DescriptionDetails>
                    {{formatDate(resource.created_at)}}
                </DescriptionDetails>
                <DescriptionTerm>{{ t('Modified on') }}</DescriptionTerm>
                <DescriptionDetails>
                    {{formatDate(resource.last_modified)}}
                </DescriptionDetails>
            </DescriptionList>
            <DescriptionList class="fr-p-5v">
                <template v-if="resource.filesize">
                    <DescriptionTerm>{{ t('Size') }}</DescriptionTerm>
                    <DescriptionDetails>
                        {{ filesize(resource.filesize) }}
                    </DescriptionDetails>
                </template>
                <template v-if="resource.mime">
                    <DescriptionTerm>{{ t('Type') }}</DescriptionTerm>
                    <DescriptionDetails>
                        {{getResourceLabel(resource.type)}}
                    </DescriptionDetails>
                </template>
                <template v-if="resource.mime">
                    <DescriptionTerm>{{ t('MIME Type') }}</DescriptionTerm>
                    <DescriptionDetails>
                        <code>{{resource.mime}}</code>
                    </DescriptionDetails>
                </template>
            </DescriptionList>
        </div>
        <div>
            <ExtraAccordion
                class="fr-pt-3w fr-mt-3w border-top border-default-grey"
                :button-text="t('See extras')"
                :title-text="t('Resource Extras')"
                title-level="h5"
                :extra="resource.extras"
                v-if="hasExtras"
            />
        </div>
    </div>
</template>
<style scoped>
.fr-grid-row--gutters-5v {
    margin: -1.25rem;
}
</style>