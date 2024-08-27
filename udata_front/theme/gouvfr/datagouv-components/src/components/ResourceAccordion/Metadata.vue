<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { type Resource } from '../../types/resources';
import CopyButton from '../CopyButton/CopyButton.vue';
import DescriptionDetails from '../DescriptionList/DescriptionDetails.vue';
import DescriptionList from '../DescriptionList/DescriptionList.vue';
import DescriptionTerm from '../DescriptionList/DescriptionTerm.vue';
import { filesize, formatDate } from "../../helpers";
import ExtraAccordion from '../ExtraAccordion/ExtraAccordion.vue';

const props = defineProps<{
    resource: Resource;
}>();

const { t } = useI18n();
</script>

<template>
    <div>

        <div class="fr-grid-row fr-grid-row--gutters">
            <DescriptionList>
                <DescriptionTerm>{{ t('URL') }}</DescriptionTerm>
                <DescriptionDetails :withEllipsis="false">
                    <div class="fr-col text-overflow-ellipsis">
                        <a :href="resource.url">{{resource.url}}</a>
                    </div>
                    <div class="fr-ml-1w fr-col-auto">
                        <CopyButton :text="resource.url"/>
                    </div>
                </DescriptionDetails>
                <DescriptionTerm>{{ t('Permalink') }}</DescriptionTerm>
                <DescriptionDetails :withEllipsis="false">
                    <div class="fr-col text-overflow-ellipsis">
                        <a :href="resource.latest">{{resource.latest}}</a>
                    </div>
                    <div class="fr-ml-1w fr-col-auto">
                        <CopyButton :text="resource.latest"/>
                    </div>
                </DescriptionDetails>
                <DescriptionTerm>{{ t('ID') }}</DescriptionTerm>
                <DescriptionDetails :withEllipsis="false">
                    <div class="fr-col text-overflow-ellipsis">
                        {{ resource.id }}
                    </div>
                    <div class="fr-ml-1w fr-col-auto">
                        <CopyButton :text="resource.id"/>
                    </div>
                </DescriptionDetails>
                <template v-if="resource.mime">
                    <DescriptionTerm>{{ t('MIME Type') }}</DescriptionTerm>
                    <DescriptionDetails>
                        {{resource.mime}}
                    </DescriptionDetails>
                </template>
            </DescriptionList>
            <DescriptionList>
                <DescriptionTerm>{{ t('Created on') }}</DescriptionTerm>
                <DescriptionDetails>
                    {{formatDate(resource.created_at)}}
                </DescriptionDetails>
                <DescriptionTerm>{{ t('Modified on') }}</DescriptionTerm>
                <DescriptionDetails>
                    {{formatDate(resource.last_modified)}}
                </DescriptionDetails>
                <template v-if="resource.checksum">
                    <DescriptionTerm>{{resource.checksum.type}}</DescriptionTerm>
                    <DescriptionDetails :withEllipsis="false">
                        <div class="fr-col text-overflow-ellipsis">
                            {{resource.checksum.value}}
                        </div>
                        <div class="fr-col-auto">
                            <CopyButton :text="resource.checksum.value"/>
                        </div>
                    </DescriptionDetails>
                </template>
            </DescriptionList>
            <DescriptionList>
                <template v-if="resource.filesize">
                    <DescriptionTerm>{{ t('Size') }}</DescriptionTerm>
                    <DescriptionDetails>
                        {{ filesize(resource.filesize) }}
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
                v-if="resource.extras"
            />
        </div>
    </div>
</template>