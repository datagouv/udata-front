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
          <h1 class="subtitle subtitle--uppercase fr-mb-3w">
            {{ $t("Dataset description") }}
          </h1>
          <LinkedToAccordion :accordion="nameDatasetAccordionId">
            <InputGroup
              :aria-describedby="nameDatasetAccordionId"
              class="fr-mb-2w"
              :label="$t('Dataset name')"
              :required="true"
            />
          </LinkedToAccordion>
          <LinkedToAccordion :accordion="addAcronymAccordionId">
            <InputGroup
              class="fr-mb-2w"
              :label="$t('Acronym')"
            />
          </LinkedToAccordion>
          <LinkedToAccordion :accordion="writeAGoodDescriptionAccordionId">
            <InputGroup
              class="fr-mb-2w"
              :label="$t('Description')"
              :required="true"
              type="textarea"
            />
          </LinkedToAccordion>
          <InputGroup
            class="fr-mb-2w"
            :label="$t('Tags')"
          />
          <SelectGroup
            class="fr-mb-2w"
            :label="$t('Licence')"
          />
          <SelectGroup
            class="fr-mb-2w"
            :label="$t('Update frequency')"
          />
          <InputGroup
            class="fr-mb-2w"
            :label="$t('Temporal coverage')"
          />
          <InputGroup
            class="fr-mb-2w"
            :label="$t('Spacial coverage')"
          />
          <InputGroup
            :label="$t('Spacial granularity')"
          />
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
import { defineComponent } from 'vue';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import SelectGroup from '../../components/Form/SelectGroup/SelectGroup.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Well from "../../components/Ui/Well/Well.vue";
import useUid from "../../composables/useUid";

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, InputGroup, LinkedToAccordion, SelectGroup, Stepper, Well, Sidemenu },
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
    return {
      addAcronymAccordionId,
      nameDatasetAccordionId,
      writeAGoodDescriptionAccordionId,
      useTagsAccordionId,
      selectLicenseAccordionId,
      chooseFrequencyAccordionId,
      addTemporalCoverageAccordionId,
      addSpacialInformationAccordionId,
    };
  },
});
</script>
