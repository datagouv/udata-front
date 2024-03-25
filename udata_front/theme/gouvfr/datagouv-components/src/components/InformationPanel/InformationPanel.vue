<template>
    <div class="fr-py-3w fr-mb-3w border-bottom border-default-grey">  
        <h2 class="subtitle subtitle--uppercase">{{ $t('Informations') }}</h2>
        <div class="fr-text--sm fr-m-0">
            <div class="fr-grid-row fr-grid-row--gutters">     
                <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
                    <h3 class="subtitle fr-mb-1v">{{ $t('License') }}</h3>
                    <p class="fr-text--sm fr-m-0 text-mention-grey ">
                        <code class="bg-alt-grey fr-px-1v text-grey-380">
                            <a :href="props.license.url">
                            {{ props.license.title }}
                            </a>
                        </code>            
                    </p>
                </div>              
                <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
                    <h3 class="subtitle fr-mb-1v">ID</h3>
                    <p class="fr-text--sm fr-m-0 text-mention-grey ">{{ props.dataset.id }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="fr-pb-3w fr-mb-3w border-bottom border-default-grey">
        <h2 class="subtitle subtitle--uppercase">{{ $t('Temporality') }}</h2>
        <div class="fr-text--sm fr-m-0">
            <div class="fr-grid-row fr-grid-row--gutters">   
                <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
                    <h3 class="subtitle fr-mb-1v">{{ $t('Creation') }}</h3>
                    <p class="fr-text--sm fr-m-0 text-mention-grey ">{{ formatDate(props.dataset.created_at) }}</p>
                </div>                  
                <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
                    <h3 class="subtitle fr-mb-1v">{{ $t('Frequency') }}</h3>
                    <p class="fr-text--sm fr-m-0 text-mention-grey ">{{ getFrequencies(frequencies, props.dataset.frequency) }}</p>
                </div>
            </div>
            <div class="fr-grid-row fr-grid-row--gutters">
                <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
                    <h3 class="subtitle fr-mb-1v">{{ $t('Last update') }}</h3>
                    <p class="fr-text--sm fr-m-0 text-mention-grey ">{{ formatDate(props.dataset.last_update) }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="fr-pb-3w fr-mb-3w border-bottom border-default-grey">
        <h2 class="subtitle subtitle--uppercase">{{ $t('Spatial coverage') }}</h2>
        <div class="fr-text--sm fr-m-0">
            <div class="fr-grid-row fr-grid-row--gutters">
                <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
                    <h3 class="subtitle fr-mb-1v">{{ $t('Territorial coverage') }}</h3>
                    <p class="fr-text--sm fr-m-0 text-mention-grey ">France</p>
                </div>
                <div v-if="props.dataset.spatial?.granularity" class="fr-col-12 fr-col-sm-6 fr-col-md-4">
                    <h3 class="subtitle fr-mb-1v">{{ $t('Granularity of territorial coverage') }}</h3>
                    <p class="fr-text--sm fr-m-0 text-mention-grey ">{{ getGranularity(granularities, props.dataset.spatial?.granularity) }}</p>
                </div>                  
            </div>
        </div>
    </div>
    <div class="fr-pb-3w fr-mb-3w border-bottom border-default-grey">
        <h2 class="subtitle subtitle--uppercase">Actions</h2>
        <div class="fr-text--sm fr-m-0">
            <h3 class="subtitle fr-mb-1v">{{ $t('Integrate on your website') }}</h3>
            <div class="embed-wrapper">
                <textarea ref="textAreaRef" readonly="true" rows="1" v-model="embedText" @click="selectContent"></textarea>
                <CopyButton class="fr-my-1w fr-mr-1w" :text="embedText"/>
            </div>
        </div>
    </div>
    <article v-if="hasExtras()">
        <header
            class="fr-grid-row fr-grid-row--middle fr-pb-3w fr-mb-3w border-bottom border-default-grey"
            :class="{'border-bottom': !extrasExpanded}"
        >
            <div class="fr-col">
                <h2 class="subtitle subtitle--uppercase fr-m-0">{{ $t('Extras') }}</h2>
            </div>
            <div class="fr-col-auto">
                <button
                    @click="extrasExpand"
                    role="button"
                    :aria-expanded="extrasExpanded"
                    class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-btn--secondary-grey-500"
                    :class="{'fr-icon-arrow-up-s-line': extrasExpanded, 'fr-icon-arrow-down-s-line': !extrasExpanded}"
                >
                    <template v-if="extrasExpanded">
                        {{ $t('Close details') }}
                    </template>
                    <template v-else>
                        {{ $t('See extras') }}
                    </template>
                </button>
            </div>
        </header>
        <div
            class="accordion-content"
            ref="extrasRef"
        >
            <div class="fr-pb-3w fr-mb-3w border-bottom border-default-grey">
                <div class="fr-grid-row fr-grid-row--gutters fr-text--sm fr-m-0">
                    <div v-for="(value, key) in props.dataset?.extras" :key="key" class="fr-col-12 fr-col-sm-6 fr-col-md-4">
                        <h3 class="subtitle fr-mb-1v">{{ key }}</h3>
                        <p class="fr-text--sm fr-m-0 text-mention-grey ">{{ value }}</p>
                    </div>
                </div>
            </div>
        </div>
    </article>
    <article v-if="props.dataset?.harvest">
        <header
            class="fr-grid-row fr-grid-row--middle fr-pb-3w fr-mb-3w border-bottom border-default-grey"
            :class="{'border-bottom': !harvestExpanded}"
        >
            <div class="fr-col">
                <h2 class="subtitle subtitle--uppercase fr-m-0">{{ $t('Harvest') }}</h2>
            </div>
            <div class="fr-col-auto">
                <button
                    @click="expand"
                    role="button"
                    :aria-expanded="harvestExpanded"
                    class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-btn--secondary-grey-500"
                    :class="{'fr-icon-arrow-up-s-line': harvestExpanded, 'fr-icon-arrow-down-s-line': !harvestExpanded}"
                >
                    <template v-if="harvestExpanded">
                        {{ $t('Close details') }}
                    </template>
                    <template v-else>
                        {{ $t('See harvest') }}
                    </template>
                </button>
            </div>
        </header>
        <div
            class="accordion-content"
            ref="harvestRef"
        >
            <div class="fr-pb-3w fr-mb-3w border-bottom border-default-grey">
                <div class="fr-grid-row fr-grid-row--gutters fr-text--sm fr-m-0">
                    <div v-for="(value, key) in props.dataset?.harvest" :key="key" class="fr-col-12 fr-col-sm-6 fr-col-md-4">
                        <h3 class="subtitle fr-mb-1v">{{ key }}</h3>
                        <p class="fr-text--sm fr-m-0 text-mention-grey ">{{ value }}</p>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Dataset, DatasetV2 } from "../../types/datasets";
import CopyButton from "../CopyButton/CopyButton.vue";
import { toggleAccordion } from "../../helpers/toggleAccordion";
import { formatDate } from '../../helpers/index';
import { getGranularity, fetchGranularities } from '../../api/granularity';
import { getFrequencies, fetchFrequencies } from '../../api/frequency';
import useOEmbed from '../../composables/useOEmbed';
import type { Frequencies } from '../../types/frequency';
import type { Granularities } from '../../types/granularity';
import type { License } from '../../types/licenses';
const props = defineProps<{
    dataset: DatasetV2 | Dataset,
    license: License
}>();
const embedText = useOEmbed('dataset', props.dataset.id);
const extrasExpanded = ref(false);
const extrasRef = ref<HTMLDivElement | null>(null);
const granularities = ref<Granularities>([]);
const frequencies = ref<Frequencies>([]);
const harvestExpanded = ref(false);
const harvestRef = ref<HTMLDivElement | null>(null);
const textAreaRef = ref<HTMLTextAreaElement | null>(null);
const selectContent = () => {
  if (textAreaRef.value) {
    textAreaRef.value.select();
  }
};
const expand = () => {
  harvestExpanded.value = !harvestExpanded.value;
  if(harvestRef.value) {
    toggleAccordion(harvestRef.value, harvestExpanded.value);
  }
}
const extrasExpand = () => {
  extrasExpanded.value = !extrasExpanded.value;
  if(extrasRef.value) {
    toggleAccordion(extrasRef.value, extrasExpanded.value);
  }
}
const hasExtras = () => {
    return Object.keys(props.dataset.extras).length > 0;
}
onMounted(() => {
  fetchGranularities().then(foundGranularities => granularities.value = foundGranularities);
  fetchFrequencies().then(foundFrequencies => frequencies.value = foundFrequencies);
 });
</script>
