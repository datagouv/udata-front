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
import TextClamp from 'vue3-text-clamp';

const props = defineProps<{
    resource: Resource;
}>();

const hasExtras = computed(() => Object.keys(props.resource.extras).length)

const { t } = useI18n();
</script>
<template>
    <div>
        <div class="flex gap-3rem flex-col-on-small">
            <DescriptionList class="flex-1">
                <DescriptionTerm>{{ t('URL') }} <CopyButton :hide-label="true" :label="$t('Copy link')" :copied-label="$t('Link copied!')" :text="resource.url"/></DescriptionTerm>
                <DescriptionDetails :with-ellipsis="false">
                    <code class="code">
                        <a :href="resource.url"><TextClamp :max-lines="1" :autoresize="true" :text="resource.url" /></a>
                    </code>
                </DescriptionDetails>
                <DescriptionTerm>{{ t('Stable URL') }} <CopyButton :hide-label="true" :label="$t('Copy link')" :copied-label="$t('Link copied!')" :text="resource.latest"/></DescriptionTerm>
                <DescriptionDetails :with-ellipsis="false">
                    <code class="code">
                        <a :href="resource.latest"><TextClamp :max-lines="1" :autoresize="true" :text="resource.latest"/></a>
                    </code>
                </DescriptionDetails>
                <DescriptionTerm>{{ t('Identifier') }} <CopyButton :hide-label="true" :label="$t('Copy ID')" :copied-label="$t('ID copied!')" :text="resource.id"/></DescriptionTerm>
                <DescriptionDetails :with-ellipsis="false">
                    <code class="code">
                        <TextClamp :max-lines="1" :autoresize="true" :text="resource.id" />
                    </code>
                </DescriptionDetails>
                <template v-if="resource.checksum">
                    <DescriptionTerm>{{resource.checksum.type}} <CopyButton :hide-label="true" :label="$t('Copy checksum')" :copied-label="$t('Checksum copied!')" :text="resource.checksum.value"/></DescriptionTerm>
                    <DescriptionDetails :with-ellipsis="false">
                        <code class="code">
                            <TextClamp :max-lines="1" :autoresize="true" :text="resource.checksum.value" />
                        </code>
                    </DescriptionDetails>
                </template>
            </DescriptionList>
            <DescriptionList style="flex-shrink: 0;">
                <DescriptionTerm>{{ t('Created on') }}</DescriptionTerm>
                <DescriptionDetails>
                    {{formatDate(resource.created_at)}}
                </DescriptionDetails>
                <DescriptionTerm>{{ t('Modified on') }}</DescriptionTerm>
                <DescriptionDetails>
                    {{formatDate(resource.last_modified)}}
                </DescriptionDetails>
            </DescriptionList>
            <DescriptionList style="flex-shrink: 0;">
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
                        <code class="code text-overflow-ellipsis" >{{resource.mime}}</code>
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
.gap-3rem {
    gap: 3rem;
}
.gap-3rem dl {
    padding-inline-start: 0;
}
@container (max-width: 600px) {
  .flex-col-on-small {
    flex-direction: column
  }
}
</style>
