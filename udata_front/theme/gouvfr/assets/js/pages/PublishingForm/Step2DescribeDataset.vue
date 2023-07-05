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
            >
              {{ $t(`Dataset title must be the most precise and specific possible.
              It must match the vocabulary used by users.
              They search the data usually with the search engine.`) }}
            </Accordion>
            <Accordion
              :title= "$t('Add an acronym to the dataset')"
              :id="addAcronymAccordionId"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Write a good description')"
              :id="writeAGoodDescriptionAccordionId"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Use tags')"
              :id="useTagsAccordionId"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Select a license')"
              :id="selectLicenseAccordionId"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Choose the update frequency')"
              :id="chooseFrequencyAccordionId"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Add temporal coverage')"
              :id="addTemporalCoverageAccordionId"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
            <Accordion
              :title= "$t('Add spacial information')"
              :id="addSpacialInformationAccordionId"
            >
              {{ $t(`TO DO`) }}
            </Accordion>
          </AccordionGroup>
      </Sidemenu>
      <div class="fr-col-12 fr-col-md-7">
        <Container>
          <fieldset class="fr-fieldset" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Description") }}
              </h2>
            </legend>
            <LinkedToAccordion class="fr-fieldset__element" :accordion="nameDatasetAccordionId">
              <InputGroup
                :aria-describedby="nameDatasetAccordionId"
                :label="$t('Dataset name')"
                :required="true"
              />
            </LinkedToAccordion>
            <LinkedToAccordion class="fr-fieldset__element" :accordion="addAcronymAccordionId">
              <InputGroup
                :label="$t('Acronym')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion class="fr-fieldset__element" :accordion="writeAGoodDescriptionAccordionId">
              <InputGroup
                :label="$t('Description')"
                :required="true"
                type="textarea"
              />
            </LinkedToAccordion>
            <LinkedToAccordion class="fr-fieldset__element" :accordion="useTagsAccordionId">
              <MultiSelect
                :minimumCharacterBeforeSuggest="2"
                :onChange="(value) => dataset.tag = value"
                :placeholder="$t('Tags')"
                :searchPlaceholder="$t('Search a tag...')"
                suggestUrl="/tags/suggest/"
                :values="dataset.tag"
              />
            </LinkedToAccordion>
            <LinkedToAccordion class="fr-fieldset__element" :accordion="selectLicenseAccordionId">
              <MultiSelect
                :placeholder="$t('Licenses')"
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
                  <LinkedToAccordion :accordion="chooseFrequencyAccordionId">
                    <MultiSelect
                      :placeholder="$t('Update frequency')"
                      :searchPlaceholder="$t('Search a frequency...')"
                      listUrl="/datasets/frequencies/"
                      :values="dataset.frequency"
                      :onChange="(value) => dataset.frequency = value"
                    />
                  </LinkedToAccordion>
                </div>
                <div class="fr-col-12 fr-col-md-6">
                  <InputGroup
                    :label="$t('Last update')"
                    type="date"
                    @change="(value) => dataset.last_update = value"
                  />
                </div>
              </div>
            </div>
            <div class="fr-fieldset__element">
              <InputGroup
                :label="$t('Temporal coverage')"
                type="range"
                @change="(value) => dataset.temporal_coverage = value"
              />
            </div>
          </fieldset>
          <fieldset class="fr-fieldset" aria-labelledby="space-legend">
            <legend class="fr-fieldset__legend" id="space-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Space") }}
              </h2>
            </legend>
            <div class="fr-fieldset__element">
              <div class="fr-grid-row fr-grid-row--gutters">
                <div class="fr-col-12 fr-col-md-6">
                  <MultiSelect
                    :placeholder="$t('Spatial coverage')"
                    :searchPlaceholder="$t('Search a spatial coverage...')"
                    suggestUrl="/spatial/zones/suggest/"
                    entityUrl="/spatial/zone/"
                    :values="dataset.geozone"
                    :onChange="(value) => dataset.geozone = value"
                  />
                </div>
                <div class="fr-col-12 fr-col-md-6">
                  <MultiSelect
                    :placeholder="$t('Spatial granularity')"
                    :searchPlaceholder="$t('Search a granularity...')"
                    listUrl="/spatial/granularities/"
                    :values="dataset.granularity"
                    :onChange="(value) => dataset.granularity = value"
                  />
                </div>
              </div>
            </div>
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
import { defineComponent, reactive } from 'vue';
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

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, InputGroup, LinkedToAccordion, MultiSelect, SelectGroup, Stepper, Well, Sidemenu },
  props: {
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const { id: nameDatasetAccordionId } = useUid("accordion");
    const { id: addAcronymAccordionId } = useUid("accordion");
    const { id: writeAGoodDescriptionAccordionId } = useUid("accordion");
    const { id: useTagsAccordionId } = useUid("accordion");
    const { id: selectLicenseAccordionId } = useUid("accordion");
    const { id: chooseFrequencyAccordionId } = useUid("accordion");
    const { id: addTemporalCoverageAccordionId } = useUid("accordion");
    const { id: addSpacialInformationAccordionId } = useUid("accordion");
    const dataset = reactive({});
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
    };
  },
});
</script>
