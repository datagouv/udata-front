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
          <p class="fr-text--sm fr-m-0 text-mention-grey ">{{ frequency }}</p>
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
        <div v-if="zone" class="fr-col-12 fr-col-sm-6 fr-col-md-4">
          <h3 class="subtitle fr-mb-1v">{{ $t('Territorial coverage') }}</h3>
          <p class="fr-text--sm fr-m-0 text-mention-grey">{{ zone }}</p>
        </div>
        <div v-if="props.dataset.spatial?.granularity" class="fr-col-12 fr-col-sm-6 fr-col-md-4">
          <h3 class="subtitle fr-mb-1v">{{ $t('Granularity of territorial coverage') }}</h3>
          <p class="fr-text--sm fr-m-0 text-mention-grey ">{{ granularity }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="fr-pb-3w fr-mb-3w border-bottom border-default-grey">
    <h2 class="subtitle subtitle--uppercase">Actions</h2>
    <div class="fr-text--sm fr-m-0">
      <h3 class="subtitle fr-mb-1v">
        {{ $t('Integrate on your website') }}
        <CopyButton :hide-label="true" :label="$t('Copy embed')" :copied-label="$t('Embed copied')" class="fr-my-1w fr-mr-1w" :text="embedText" />
      </h3>
      <div class="embed-wrapper">
        <textarea ref="textAreaRef" readonly="true" rows="1" v-model="embedText" @click="selectContent"></textarea>
      </div>
    </div>
  </div>
  <div v-if="hasExtras">
    <ExtraAccordion
      :button-text="t('See extras')"
      :title-text="t('Extras')"
      :extra="props.dataset.extras"
      title-level="h2"
    />
  </div>
  <div v-if="props.dataset?.harvest">
    <ExtraAccordion
      :button-text="t('See harvest')"
      :title-text="t('Harvest')"
      :extra="props.dataset.harvest"
      title-level="h2"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Dataset, DatasetV2 } from "../../types/datasets";
import CopyButton from "../CopyButton/CopyButton.vue";
import { formatDate } from '../../helpers/index';
import { getGranularity, fetchGranularities } from '../../api/granularity';
import { getFrequencies, fetchFrequencies } from '../../api/frequency';
import { fetchZone } from '../../api/zones';
import useOEmbed from '../../composables/useOEmbed';
import type { Frequencies } from '../../types/frequency';
import type { Granularities } from '../../types/granularity';
import type { License } from '../../types/licenses';
import ExtraAccordion from '../ExtraAccordion/ExtraAccordion.vue';
const props = defineProps<{
  dataset: DatasetV2 | Dataset,
  license: License
}>();
const { t } = useI18n();
const embedText = useOEmbed('dataset', props.dataset.id);
const granularity = ref<string | null>(null);
const frequency = ref<string | null>(null);
const zone = ref<string | null>(null);
const textAreaRef = ref<HTMLTextAreaElement | null>(null);

const hasExtras = computed(() => Object.keys(props.dataset.extras).length > 0);

function selectContent() {
  if (textAreaRef.value) {
    textAreaRef.value.select();
  }
};

function setZone() {
  if (props.dataset.spatial?.zones && props.dataset.spatial?.zones?.length > 0) {
    fetchZone(props.dataset.spatial.zones[0]).then(foundZone => zone.value = foundZone);
  }
};

function setGranularity(granularities: Granularities) {
  if (props.dataset.spatial?.granularity) {
    granularity.value = getGranularity(granularities, props.dataset.spatial?.granularity);
  }
};

function setFrequency(frequencies: Frequencies) {
  frequency.value = getFrequencies(frequencies, props.dataset.frequency);
};

onMounted(() => {
  fetchGranularities().then(foundGranularities => setGranularity(foundGranularities));
  fetchFrequencies().then(foundFrequencies => setFrequency(foundFrequencies));
  setZone();
});
</script>
