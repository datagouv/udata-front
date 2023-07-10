<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="1"/>
    <div class="fr-grid-row">
      <Sidemenu
        class="fr-col-12 fr-col-md-5"
        :buttonText="$t('Help')"
        :onRight="true"
        >
          <template #title>
            <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
            {{ $t('Help') }}
          </template>
          <AccordionGroup>
            <Accordion
              :title= "$t('Naming your dataset')"
              :id="nameDatasetAccordionId"
              :state="quality.title"
            >
              {{ $t(`Dataset title must be the most precise and specific possible.
              It must match the vocabulary used by users.
              They search the data usually with the search engine.`) }}
            </Accordion>
            <Accordion
              :title= "$t('Add an acronym to the dataset')"
              :id="addAcronymAccordionId"
              state="info"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Write a good description')"
              :id="writeAGoodDescriptionAccordionId"
              :state="quality.description"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Use tags')"
              :id="useTagsAccordionId"
              :state="quality.tags"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Select a license')"
              :id="selectLicenseAccordionId"
              :state="quality.license"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Choose the update frequency')"
              :id="chooseFrequencyAccordionId"
              :state="quality.frequency"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Add temporal coverage')"
              :id="addTemporalCoverageAccordionId"
              :state="quality.temporalCoverage"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Add spacial information')"
              :id="addSpacialInformationAccordionId"
              :state="quality.spacialInformation"
            >
              {{ $t(`TO DO`) }}
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
              @blur="vQuality$.title.$touch"
            >
              <InputGroup
                :aria-describedby="nameDatasetAccordionId"
                :label="$t('Dataset name')"
                :required="true"
                v-model="dataset.title"
                :hasError="hasError('title')"
                :errorText="getErrorText('title')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addAcronymAccordionId"
            >
              <InputGroup
                :label="$t('Acronym')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="writeAGoodDescriptionAccordionId"
              @blur="vQuality$.description.$touch"
            >
              <InputGroup
                :label="$t('Description')"
                :required="true"
                type="textarea"
                v-model="dataset.description"
                :hasError="hasError('description')"
                :errorText="getErrorText('description')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="useTagsAccordionId"
              @blur="vQuality$.tags.$touch"
            >
              <MultiSelect
                :minimumCharacterBeforeSuggest="2"
                :onChange="(value) => dataset.tags = value"
                :placeholder="$t('Tags')"
                :searchPlaceholder="$t('Search a tag...')"
                suggestUrl="/tags/suggest/"
                :values="dataset.tags"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="selectLicenseAccordionId"
              @blur="vQuality$.license.$touch"
            >
              <MultiSelect
                :placeholder="$t('License')"
                :searchPlaceholder="$t('Search a license...')"
                listUrl="/datasets/licenses/"
                :values="dataset.license"
                :onChange="(value) => dataset.license = value"
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
                    @blur="vQuality$.frequency.$touch"
                  >
                    <MultiSelect
                      :placeholder="$t('Update frequency')"
                      :searchPlaceholder="$t('Search a frequency...')"
                      listUrl="/datasets/frequencies/"
                      :values="dataset.frequency"
                      :onChange="(value) => dataset.frequency = value"
                      :required="true"
                      :hasError="hasError('frequency')"
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
              @blur="vQuality$.temporal_coverage.$touch"
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
              :accordion="addSpacialInformationAccordionId"
              @blur="vQuality$.spatial.$touch"
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
                    :onChange="(value) => dataset.spatial.zones = value"
                  />
                </div>
                <div class="fr-col-12 fr-col-md-6">
                  <MultiSelect
                    :placeholder="$t('Spatial granularity')"
                    :searchPlaceholder="$t('Search a granularity...')"
                    listUrl="/spatial/granularities/"
                    :values="dataset.spatial.granularity"
                    :onChange="(value) => dataset.spatial.granularity = value"
                  />
                </div>
              </div>
            </LinkedToAccordion>
          </fieldset>
          <div class="fr-grid-row fr-grid-row--right">
            <button class="fr-btn">
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
import { useVuelidate } from '@vuelidate/core';
import { minLength, not, required, sameAs } from '../../i18n';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import SelectGroup from '../../components/Form/SelectGroup/SelectGroup.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Well from "../../components/Ui/Well/Well.vue";
import useUid from "../../composables/useUid";
import editIcon from "svg/illustrations/edit.svg";
import { quality_description_length, title } from "../../config";
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, InputGroup, LinkedToAccordion, MultiSelect, SelectGroup, Stepper, Well, Sidemenu },
  props: {
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const { t } = useI18n();
    const { id: nameDatasetAccordionId } = useUid("accordion");
    const { id: addAcronymAccordionId } = useUid("accordion");
    const { id: writeAGoodDescriptionAccordionId } = useUid("accordion");
    const { id: useTagsAccordionId } = useUid("accordion");
    const { id: selectLicenseAccordionId } = useUid("accordion");
    const { id: chooseFrequencyAccordionId } = useUid("accordion");
    const { id: addTemporalCoverageAccordionId } = useUid("accordion");
    const { id: addSpacialInformationAccordionId } = useUid("accordion");
    const dataset = reactive({
      title: "",
      acronym: "",
      description: "",
      tags: null,
      license: "",
      frequency: "",
      temporal_coverage: "",
      last_update: null,
      spatial: {
        zones: "",
        granularity: "",
      }
    });

    /**
     *
     * @param {boolean} dirty
     * @param {boolean} failRequired
     * @param {boolean} failQuality
     * @returns {import("../../types").AccordionFunctionalState}
     */
    const getFunctionalState = (dirty, failRequired, failQuality) => {
      // console.log({
      //   disabled: !dirty,
      //   error: dirty && !passRequired,
      //   warning: dirty && passRequired && !passQuality,
      //   success: dirty && passRequired && passQuality,
      // });
      if(!dirty) {
        return "disabled";
      }
      if(failRequired) {
        return "error";
      }
      if(failQuality) {
        return "warning";
      }
      return "success"
    };

    const notUnknown = not(t("The value must be different from unknown."), sameAs("unknown"));

    const requiredRules = {
      description: { required },
      frequency: { required, notUnknown },
      title: { required },
    };

    const qualityRules = {
      description: {required, minLengthValue: minLength(quality_description_length), },
      frequency: { required, notUnknown },
      license: { required },
      spatial: { required },
      tags: { required, notEmpty: minLength(1) },
      temporal_coverage: { required },
      title: { required },
    };

    const v$ = useVuelidate(requiredRules, dataset);
    const vQuality$ = useVuelidate(qualityRules, dataset);

    /**
     * @type {import("vue").ComputedRef<Record<string, import("../../types").AccordionFunctionalState>>}
     */
    const quality = computed(() => {
      return {
        title: getFunctionalState(vQuality$.value.title.$dirty, v$.value.title.$invalid, vQuality$.value.title.$error),
        description: getFunctionalState(vQuality$.value.description.$dirty, v$.value.description.$invalid, vQuality$.value.description.$error),
        tags: getFunctionalState(vQuality$.value.tags.$dirty, false, vQuality$.value.tags.$error),
        license: getFunctionalState(vQuality$.value.license.$dirty, false, vQuality$.value.license.$error),
        frequency: getFunctionalState(vQuality$.value.frequency.$dirty, v$.value.frequency.$invalid, vQuality$.value.frequency.$error),
        temporalCoverage: getFunctionalState(vQuality$.value.temporal_coverage.$dirty, false, vQuality$.value.temporal_coverage.$error),
        spacialInformation: getFunctionalState(vQuality$.value.spatial.$dirty, false, vQuality$.value.spatial.$error),
      };
    });

    /**
     * @param {string} field
     * @returns {boolean}
     */
    const hasError = (field) => quality.value[field] === "error";

    const getErrorText = (field) => {
      if(vQuality$.value[field].$dirty) {
        v$.value[field].$touch();
      }
      return v$.value[field].$errors.map(error => error.$message).join("\n");
    }

    watchEffect(() => {
      console.log(quality.value);
      console.log(dataset);
    });

    return {
      addAcronymAccordionId,
      nameDatasetAccordionId,
      writeAGoodDescriptionAccordionId,
      useTagsAccordionId,
      selectLicenseAccordionId,
      chooseFrequencyAccordionId,
      addTemporalCoverageAccordionId,
      addSpacialInformationAccordionId,
      dataset,
      editIcon,
      quality,
      hasError,
      getErrorText,
      title,
      v$,
      vQuality$,
    };
  },
});
</script>
