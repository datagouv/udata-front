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
                {{ $t("Dataset title must be the most precise and specific possible.") }} <br/>
                {{ $t("It must match the vocabulary used by users.") }} <br/>
                {{ $t("They search the data usually with the search engine.") }}
              </p>
            </Accordion>
            <Accordion
              :title= "$t('Add an acronym to the dataset')"
              :id="addAcronymAccordionId"
              :state="state.acronym"
            >
              <p class="fr-m-0">
                {{ $t("You can add an acronym to your dataset. The letters composing the acronym shouldn't be separated with dots.") }}
              </p>
            </Accordion>
            <Accordion
              :title= "$t('Write a good description')"
              :id="writeAGoodDescriptionAccordionId"
              :state="state.description"
            >
              <div class="markdown fr-m-0">
                <p class="fr-m-0">
                  {{ $t(`Dataset description allows people reading it to get information about the content and structure of the published resources,
                you can write :`) }}
                </p>
                <ul class="fr-mt-3v">
                  <li>{{ $t("The list of file provided ;") }}</li>
                  <li>{{ $t("The description of file format ;") }}</li>
                  <li>{{ $t("The update frequency.") }}</li>
                </ul>
                <ul class="fr-mt-3v">
                  <li>{{ $t("The motivation to create the dataset") }}</li>
                  <li>{{ $t("The dataset composition") }}</li>
                  <li>{{ $t("The data collection process") }}</li>
                  <li>{{ $t("The data pre-treatment") }}</li>
                  <li>{{ $t("The dataset broadcasting") }}</li>
                  <li>{{ $t("The dataset maintenance") }}</li>
                  <li>{{ $t("The legals and ethics considerations") }}</li>
                </ul>
                <Well class="fr-mt-1w" v-if="stateHasWarning('description')" color="orange-terre-battue">
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
                {{ $t("Tags characterize your dataset. They are public and allow a better listing of the dataset during a user search.") }}
              </p>
              <Well class="fr-mt-1w" v-if="stateHasWarning('tags')" color="orange-terre-battue">
                {{ getWarningText("tags") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Select a license')"
              :id="selectLicenseAccordionId"
              :state="state.license"
            >
              <p class="fr-m-0">
                {{ $t("Licenses define reuse rules. By choosing a reuse license, you ensure the published dataset is reused using the conditions you defined.") }}
              </p>
              <Well class="fr-mt-1w" v-if="stateHasWarning('license')" color="orange-terre-battue">
                {{ getWarningText("license") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Choose the update frequency')"
              :id="chooseFrequencyAccordionId"
              :state="state.frequency"
            >
              <p class="fr-m-0">
                {{ $t("Update frequency is the frequency you plan to update the published data. Update frequency is indicative.") }}
              </p>
              <Well class="fr-mt-1w" v-if="stateHasWarning('frequency')" color="orange-terre-battue">
                {{ getWarningText("frequency") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Add temporal coverage')"
              :id="addTemporalCoverageAccordionId"
              :state="state.temporal_coverage"
            >
              <p class="fr-m-0">
                {{ $t("Temporal coverage show the time range of published data.") }} <br/>
                {{ $t("For example : from 2012 to 2015.") }}
              </p>
              <Well class="fr-mt-1w" v-if="stateHasWarning('temporal_coverage')" color="orange-terre-battue">
                {{ getWarningText("temporal_coverage") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Add spatial information')"
              :id="addSpatialInformationAccordionId"
              :state="state.spatial_information"
            >
              <p class="fr-m-0">
                {{ $t("Spatial granularity shows the finest level of geographical details covered by your data.") }} <br/>
                {{ $t("For example : at the department scale or the city scale.") }}
              </p>
              <Well class="fr-mt-1w" v-if="stateHasWarning('spatial_information')" color="orange-terre-battue">
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
                :hasError="stateHasError('title')"
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
              class="fr-fieldset__element"
              :accordion="writeAGoodDescriptionAccordionId"
              @blur="vWarning$.description.$touch"
            >
              <InputGroup
                :label="$t('Description')"
                :required="true"
                type="textarea"
                v-model="dataset.description"
                :hasError="stateHasError('description')"
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
                @change="(value) => dataset.tags = value"
                :placeholder="$t('Tags')"
                :searchPlaceholder="$t('Search a tag...')"
                suggestUrl="/tags/suggest/"
                :values="dataset.tags"
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
                listUrl="/datasets/licenses/"
                :values="dataset.license"
                @change="(value) => dataset.license = value"
              />
            </LinkedToAccordion>
          </fieldset>
          <fieldset class="fr-fieldset" aria-labelledby="time-legend">
            <legend class="fr-fieldset__legend" id="time-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Time") }}
              </h2>
            </legend>
            <div class="fr-fieldset__element">
              <div class="fr-grid-row fr-grid-row--gutters">
                <div class="fr-col-12 fr-col-md-6">
                  <LinkedToAccordion
                    :accordion="chooseFrequencyAccordionId"
                    @blur="vWarning$.frequency.$touch"
                  >
                    <MultiSelect
                      :placeholder="$t('Update frequency')"
                      :searchPlaceholder="$t('Search a frequency...')"
                      listUrl="/datasets/frequencies/"
                      :values="dataset.frequency"
                      @change="(value) => dataset.frequency = value"
                      :required="true"
                      :hasError="stateHasError('frequency')"
                      :errorText="getErrorText('frequency')"
                    />
                  </LinkedToAccordion>
                </div>
                <div class="fr-col-12 fr-col-md-6">
                  <InputGroup
                    :label="$t('Last update')"
                    type="date"
                    v-model="dataset.last_update"
                  />
                </div>
              </div>
            </div>
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
                <div class="fr-col-12 fr-col-md-6">
                  <MultiSelect
                    :placeholder="$t('Spatial coverage')"
                    :searchPlaceholder="$t('Search a spatial coverage...')"
                    suggestUrl="/spatial/zones/suggest/"
                    entityUrl="/spatial/zone/"
                    :values="dataset.spatial.zones"
                    @change="(value) => dataset.spatial.zones = value"
                  />
                </div>
                <div class="fr-col-12 fr-col-md-6">
                  <MultiSelect
                    :placeholder="$t('Spatial granularity')"
                    :searchPlaceholder="$t('Search a granularity...')"
                    listUrl="/spatial/granularities/"
                    :values="dataset.spatial.granularity"
                    @change="(value) => dataset.spatial.granularity = value"
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

<script>
import { computed, defineComponent, reactive, watchEffect } from 'vue';
import { minLength, not, required, requiredWithCustomMessage, sameAs } from '../../i18n';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Well from "../../components/Ui/Well/Well.vue";
import useUid from "../../composables/useUid";
import editIcon from "svg/illustrations/edit.svg";
import { quality_description_length, title } from "../../config";
import { useI18n } from 'vue-i18n';
import useFunctionalState from '../../composables/useFunctionalState';

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, InputGroup, LinkedToAccordion, MultiSelect, Stepper, Well, Sidemenu },
  emits: ["next"],
  props: {
    originalDataset: {
      type: Object,
      required: true
    },
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props, { emit }) {
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

    const notUnknown = not(t("The value must be different than unknown."), sameAs("unknown"));
    const tagsRequired = requiredWithCustomMessage(t("Add tags allow to improve listing of your data."));
    const temporalCoverageRequired = requiredWithCustomMessage(t("You didn't provide the temporal coverage."));
    const spatialGranularityRequired = requiredWithCustomMessage(t("You didn't provide the spatial granularity."));

    const requiredRules = {
      description: { required },
      frequency: { required },
      title: { required },
    };

    const warningRules = {
      acronym: {},
      description: {required, minLengthValue: minLength(quality_description_length), },
      frequency: { required, notUnknown },
      license: { required },
      spatial: {
        granularity: { required: spatialGranularityRequired },
      },
      tags: { required: tagsRequired, notEmpty: minLength(1) },
      temporal_coverage: { required: temporalCoverageRequired },
      title: { required },
    };

    const { getErrorText, getFunctionalState, getWarningText, hasError, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState(dataset, requiredRules, warningRules);

    /**
     * @type {import("vue").ComputedRef<Record<string, import("../../types").PublishingFormAccordionState>>}
     */
    const state = computed(() => {
      return {
        acronym: vWarning$.value.acronym.$dirty ? "info" : "disabled",
        title: getFunctionalState(vWarning$.value.title.$dirty, v$.value.title.$invalid, vWarning$.value.title.$error),
        description: getFunctionalState(vWarning$.value.description.$dirty, v$.value.description.$invalid, vWarning$.value.description.$error),
        tags: getFunctionalState(vWarning$.value.tags.$dirty, false, vWarning$.value.tags.$error),
        license: getFunctionalState(vWarning$.value.license.$dirty, false, vWarning$.value.license.$error),
        frequency: getFunctionalState(vWarning$.value.frequency.$dirty, v$.value.frequency.$invalid, vWarning$.value.frequency.$error),
        temporal_coverage: getFunctionalState(vWarning$.value.temporal_coverage.$dirty, false, vWarning$.value.temporal_coverage.$error),
        spatial_information: getFunctionalState(vWarning$.value.spatial.granularity.$dirty, false, vWarning$.value.spatial.granularity.$error),
      };
    });

    /**
     *
     * @param {string} field
     */
    const stateHasError = (field) => hasError(state, field);

    /**
     *
     * @param {string} field
     */
    const stateHasWarning = (field) => hasWarning(state, field);

    const submit = () => {
      validateRequiredRules().then(valid => {
        if(valid) {
          emit("next", dataset);
        }
      });
    };

    watchEffect(() => {
      console.log(state.value);
    });

    return {
      addAcronymAccordionId,
      nameDatasetAccordionId,
      writeAGoodDescriptionAccordionId,
      useTagsAccordionId,
      selectLicenseAccordionId,
      chooseFrequencyAccordionId,
      addTemporalCoverageAccordionId,
      addSpatialInformationAccordionId,
      dataset,
      editIcon,
      state,
      stateHasError,
      stateHasWarning,
      getErrorText,
      getWarningText,
      submit,
      title,
      v$,
      vWarning$,
    };
  },
});
</script>
