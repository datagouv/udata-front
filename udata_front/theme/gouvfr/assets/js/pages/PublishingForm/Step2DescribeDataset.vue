<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="1"/>
    <div class="fr-grid-row">
      <Sidemenu
        class="fr-col-12 fr-col-md-5"
        :buttonText="$t('Help')"
        :onRight="true"
        :fixed="true"
        >
          <template #title>
            <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
            {{ $t('Help') }}
          </template>
          <AccordionGroup>
            <Accordion
              :title= "$t('Naming your dataset')"
              :id="nameDatasetAccordionId"
              :state="state.title"
            >
              <p class="fr-m-0">
                {{ $t("The title of your dataset should be as precise and specific as possible.") }} <br/>
                {{ $t("It should also correspond to the vocabulary used by users.") }} <br/>
                {{ $t("They often search for data in a search engine.") }}
              </p>
            </Accordion>
            <Accordion
              :title= "$t('Add an acronym to the dataset')"
              :id="addAcronymAccordionId"
              :state="state.acronym"
            >
              <p class="fr-m-0">
                {{ $t("You have the option to add an acronym to your dataset. The letters that make up this acronym do not need to be separated by periods.") }}
              </p>
            </Accordion>
            <Accordion
              :title= "$t('Write a good description')"
              :id="writeAGoodDescriptionAccordionId"
              :state="state.description"
            >
              <div class="markdown fr-m-0">
                <p class="fr-m-0">
                  {{ $t(`The description of your dataset allows to obtain information about the content and structure of the published resources. You can provide:`) }}
                </p>
                <ul class="fr-mt-3v">
                  <li>{{ $t("A list of the files available ;") }}</li>
                  <li>{{ $t("A description of the file format ;") }}</li>
                  <li>{{ $t("The update frequency.") }}</li>
                </ul>
                <ul class="fr-mt-3v">
                  <li>{{ $t("Motivations for creating the dataset ;") }}</li>
                  <li>{{ $t("The composition of the dataset ;") }}</li>
                  <li>{{ $t("The data collection process ;") }}</li>
                  <li>{{ $t("Data preprocessing ;") }}</li>
                  <li>{{ $t("Dataset dissemination ;") }}</li>
                  <li>{{ $t("Dataset maintenance ;") }}</li>
                  <li>{{ $t("Legal and ethical considerations.") }}</li>
                </ul>
                <Well class="fr-mt-1w" v-if="fieldHasWarning('description')" color="orange-terre-battue">
                  {{ getWarningText("description") }}
                </Well>
              </div>
            </Accordion>
            <Accordion
              :title= "$t('Use tags')"
              :id="useTagsAccordionId"
              :state="state.tags"
            >
              <p class="fr-m-0">
                {{ $t("Tags characterize your dataset. They are public and improve the dataset's search engine optimization during a user search.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('tags')" color="orange-terre-battue">
                {{ getWarningText("tags") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Select a license')"
              :id="selectLicenseAccordionId"
              :state="state.license"
            >
              <p class="fr-m-0">
                {{ $t("Licenses define the rules for reuse. By choosing a reuse license, you ensure that the published dataset will be reused according to the usage conditions you have defined.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('license')" color="orange-terre-battue">
                {{ getWarningText("license") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Choose the update frequency')"
              :id="chooseFrequencyAccordionId"
              :state="state.frequency"
            >
              <p class="fr-m-0">
                {{ $t("The update frequency corresponds to how often you plan to update the published data. This update frequency is only indicative.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('frequency')" color="orange-terre-battue">
                {{ getWarningText("frequency") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Provide the temporal coverage')"
              :id="addTemporalCoverageAccordionId"
              :state="state.temporal_coverage"
            >
              <p class="fr-m-0">
                {{ $t("The temporal coverage indicates the time range of the published data.") }} <br/>
                {{ $t("For example : from 2012 to 2015.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('temporal_coverage')" color="orange-terre-battue">
                {{ getWarningText("temporal_coverage") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Complete the spatial information')"
              :id="addSpatialInformationAccordionId"
              :state="state.spatial_information"
            >
              <p class="fr-m-0">
                {{ $t("The spatial granularity indicates the finest geographical level of detail that your data can cover.") }} <br/>
                {{ $t("For example: at the department or municipality scale.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('spatial_information')" color="orange-terre-battue">
                {{ getWarningText("spatial") }}
              </Well>
            </Accordion>
          </AccordionGroup>
      </Sidemenu>
      <div class="fr-col-12 fr-col-md-7">
        <Container>
          <Well
            color="blue-cumulus"
            weight="regular"
            class="fr-mb-2w"
          >
            <div class="fr-grid-row">
              <div class="fr-col-auto fr-mr-3v">
                <img :src="editIcon" alt="" />
              </div>
              <div class="fr-col">
                <p class="fr-m-0 fr-text--bold">{{ $t('What is a dataset?') }}</p>
                <p class="fr-m-0 fr-text--xs">{{ $t('On {site}, a dataset is a set of files.', {site: title}) }}</p>
              </div>
            </div>
          </Well>
          <fieldset class="fr-fieldset" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Producer") }}
              </h2>
            </legend>
            <div class="fr-fieldset__element">
              <ProducerSelector
                :user="user"
                :hasError="fieldHasError('owned')"
                :errorText="$t('You need to select a Producer')"
                @update:owned="updateOwned"
              />
            </div>
          </fieldset>
          <fieldset class="fr-fieldset min-width-0" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Description") }}
              </h2>
            </legend>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="nameDatasetAccordionId"
              @blur="vWarning$.title.$touch"
            >
              <InputGroup
                :aria-describedby="nameDatasetAccordionId"
                :label="$t('Dataset name')"
                :required="true"
                v-model="dataset.title"
                :hasError="fieldHasError('title')"
                :hasWarning="fieldHasWarning('title')"
                :errorText="getErrorText('title')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addAcronymAccordionId"
              @blur="vWarning$.acronym.$touch"
            >
              <InputGroup
                :label="$t('Acronym')"
                v-model="dataset.acronym"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element min-width-0"
              :accordion="writeAGoodDescriptionAccordionId"
              @blur="vWarning$.description.$touch"
            >
              <InputGroup
                :label="$t('Description')"
                :required="true"
                type="markdown"
                v-model="dataset.description"
                :hasError="fieldHasError('description')"
                :hasWarning="fieldHasWarning('description')"
                :errorText="getErrorText('description')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="useTagsAccordionId"
              @blur="vWarning$.tags.$touch"
            >
              <MultiSelect
                :minimumCharacterBeforeSuggest="2"
                @change="(value: Array<string>) => dataset.tags = value"
                :placeholder="$t('Tags')"
                :searchPlaceholder="$t('Search a tag...')"
                suggestUrl="/tags/suggest/"
                :values="dataset.tags"
                :hasWarning="fieldHasWarning('tags')"
                :multiple="true"
                :addNewOption="true"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="selectLicenseAccordionId"
              @blur="vWarning$.license.$touch"
            >
              <MultiSelect
                :placeholder="$t('License')"
                :searchPlaceholder="$t('Search a license...')"
                :listUrl="licensesUrl"
                :values="dataset.license"
                @change="(value: string) => dataset.license = value"
                :allOption="$t('Select a license')"
                :addAllOption="false"
                :groups="licensesGroups"
                :showDescription="true"
              />
            </LinkedToAccordion>
          </fieldset>
          <fieldset class="fr-fieldset" aria-labelledby="time-legend">
            <legend class="fr-fieldset__legend" id="time-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Time") }}
              </h2>
            </legend>
            <LinkedToAccordion
              :accordion="chooseFrequencyAccordionId"
              @blur="vWarning$.frequency.$touch"
              class="fr-fieldset__element"
            >
              <MultiSelect
                :placeholder="$t('Update frequency')"
                :searchPlaceholder="$t('Search a frequency...')"
                :listUrl="frequenciesUrl"
                :values="dataset.frequency"
                @change="(value: string) => dataset.frequency = value"
                :required="true"
                :hasError="fieldHasError('frequency')"
                :hasWarning="fieldHasWarning('frequency')"
                :errorText="getErrorText('frequency')"
                :allOption="$t('Select an option')"
                :addAllOption="false"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              :accordion="addTemporalCoverageAccordionId"
              @blur="vWarning$.temporal_coverage.$touch"
              class="fr-fieldset__element"
            >
              <InputGroup
                :label="$t('Temporal coverage')"
                type="range"
                v-model="dataset.temporal_coverage"
              />
            </LinkedToAccordion>
          </fieldset>
          <fieldset class="fr-fieldset" aria-labelledby="space-legend">
            <legend class="fr-fieldset__legend" id="space-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Space") }}
              </h2>
            </legend>
            <LinkedToAccordion
              :accordion="addSpatialInformationAccordionId"
              @blur="vWarning$.spatial.$touch"
              class="fr-fieldset__element"
            >
              <div class="fr-grid-row fr-grid-row--gutters">
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="$t('Spatial coverage')"
                    :searchPlaceholder="$t('Search a spatial coverage...')"
                    suggestUrl="/spatial/zones/suggest/"
                    entityUrl="/spatial/zone/"
                    :values="dataset.spatial?.zones"
                    @change="(value: Array<string>) => dataset.spatial ? dataset.spatial.zones = value : dataset.spatial = {zones: value}"
                    :hasWarning="fieldHasWarning('spatial_information')"
                    :allOption="$t('e.g. France')"
                    :addAllOption="false"
                    :multiple="true"
                    helperLabel="Insee : "
                    :onSuggest="formatSpatialZones"
                    :showDescription="true"
                  />
                </div>
                <div class="fr-col-12">
                  <MultiSelect
                    :placeholder="$t('Spatial granularity')"
                    :searchPlaceholder="$t('Search a granularity...')"
                    :initialOptions="granularities"
                    :values="dataset.spatial?.granularity"
                    @change="setGranularity"
                    :hasWarning="fieldHasWarning('spatial_information')"
                    :allOption="$t('Select an option')"
                    :addAllOption="false"
                  />
                </div>
              </div>
            </LinkedToAccordion>
          </fieldset>
          <div class="fr-grid-row fr-grid-row--right">
            <button class="fr-btn" @click="submit">
              {{ $t("Next") }}
            </button>
          </div>
        </Container>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
export type Step2DescribeDatasetProps = {
  originalDataset: NewDataset,
  steps: Array<string>,
  granularities: Array<SpatialGranularity>,
  user: Me,
};
</script>
<script setup lang="ts">
import { Well } from "@datagouv/components/ts";
import { computed, reactive, ref } from 'vue';
import { minLengthWarning, not, required, requiredWithCustomMessage, sameAs } from '../../i18n';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import ProducerSelector from '../../components/ProducerSelector/ProducerSelector.vue'
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import useUid from "../../composables/useUid";
import useFunctionalState from '../../composables/form/useFunctionalState';
import editIcon from "../../../../templates/svg/illustrations/edit.svg";
import { license_groups_options, quality_description_length, title } from "../../config";
import { useI18n } from 'vue-i18n';
import { getLicensesUrl } from '../../api/licenses';
import { getFrequenciesUrl } from '../../api/datasets';
import type { Me, NewDataset, OwnedWithId, PublishingFormAccordionState, SpatialGranularity, SpatialZone } from '../../types';

const props = defineProps<Step2DescribeDatasetProps>();

const emit = defineEmits<{
  (event: 'next', dataset: NewDataset): void,
}>();

const { t } = useI18n();
const { id: nameDatasetAccordionId } = useUid("accordion");
const { id: addAcronymAccordionId } = useUid("accordion");
const { id: writeAGoodDescriptionAccordionId } = useUid("accordion");
const { id: useTagsAccordionId } = useUid("accordion");
const { id: selectLicenseAccordionId } = useUid("accordion");
const { id: chooseFrequencyAccordionId } = useUid("accordion");
const { id: addTemporalCoverageAccordionId } = useUid("accordion");
const { id: addSpatialInformationAccordionId } = useUid("accordion");

const dataset = reactive({...props.originalDataset});
if(!dataset.spatial) {
  dataset.spatial = {
    zones: undefined,
    granularity: undefined,
  }
};

const frequenciesUrl = getFrequenciesUrl();
const licensesUrl = getLicensesUrl();
const licensesGroups = license_groups_options?.map(([name, values]) => ({
  name,
  values
}));
const formatSpatialZones = (data: Array<SpatialZone>) => {
  const suggestions = data.map(item => {
    const matchingGranularity = props.granularities.find(granularity => granularity.id === item.level);
    if (matchingGranularity) {
      return {
        ...item,
        description: matchingGranularity.name,
      };
    } else {
      return {
        ...item,
      };
    }
  });
return suggestions;
};

const notUnknown = not(t("The value must be different than unknown."), sameAs("unknown"));
const tagsRequired = requiredWithCustomMessage(t("Adding tags helps improve the SEO of your data."));
const temporalCoverageRequired = requiredWithCustomMessage(t("You did not provide the temporal coverage."));
const spatialGranularityRequired = requiredWithCustomMessage(t("You have not specified the spatial granularity."));
const isSelectedProducer = ref<boolean>(false);

function checkOwned() {
  return isSelectedProducer.value;
};

function updateOwned(owned: OwnedWithId) {
  dataset.organization = owned.organization;
  dataset.owner = owned.owner;
  isSelectedProducer.value = true;
}

const requiredRules = {
  description: { required },
  frequency: { required },
  title: { required },
  owned: { custom: checkOwned },
};

const warningRules = {
  acronym: {},
  description: {required, minLengthValue: minLengthWarning(quality_description_length)},
  frequency: { required, notUnknown },
  license: { required },
  spatial: {
    granularity: { required: spatialGranularityRequired },
  },
  tags: { required: tagsRequired },
  temporal_coverage: { required: temporalCoverageRequired },
  title: { required },
  owned: { custom: checkOwned },
};

const { getErrorText, getFunctionalState, getWarningText, hasError, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState(dataset, requiredRules, warningRules);

const state = computed<Record<string, PublishingFormAccordionState>>(() => {
  return {
    acronym: vWarning$.value.acronym.$dirty ? "info" : "disabled",
    title: getFunctionalState(vWarning$.value.title.$dirty, v$.value.title.$invalid, vWarning$.value.title.$error),
    description: getFunctionalState(vWarning$.value.description.$dirty, v$.value.description.$invalid, vWarning$.value.description.$error),
    tags: getFunctionalState(vWarning$.value.tags.$dirty, false, vWarning$.value.tags.$error),
    license: getFunctionalState(vWarning$.value.license.$dirty, false, vWarning$.value.license.$error),
    frequency: getFunctionalState(vWarning$.value.frequency.$dirty, v$.value.frequency.$invalid, vWarning$.value.frequency.$error),
    temporal_coverage: getFunctionalState(vWarning$.value.temporal_coverage.$dirty, false, vWarning$.value.temporal_coverage.$error),
    spatial_information: getFunctionalState(vWarning$.value.spatial.granularity.$dirty, false, vWarning$.value.spatial.granularity.$error),
    owned: getFunctionalState(vWarning$.value.owned.$dirty, v$.value.owned.$invalid, vWarning$.value.owned.$error),
  };
});

const fieldHasError = (field: string) => hasError(state, field);

const fieldHasWarning = (field: string) => hasWarning(state, field);

function setGranularity(value: string) {
  if (dataset.spatial) {
    dataset.spatial.granularity = value;
  } else {
    dataset.spatial = { granularity: value };
  }
};

function submit() {
  validateRequiredRules().then(valid => {
    if(valid) {
      emit("next", dataset);
    }
  });
};
</script>
