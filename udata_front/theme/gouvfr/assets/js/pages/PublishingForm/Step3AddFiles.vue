<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="2"/>
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
              :title= "$t('Publish the right types of files')"
              :id="publishFileAccordionId"
            >
              {{ $t(`Dataset title must be the most precise and specific possible.
              It must match the vocabulary used by users.
              They search the data usually with the search engine.`) }}
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
                <p class="fr-m-0 fr-text--bold">{{ $t('What is a file?') }}</p>
                <p class="fr-m-0 fr-text--xs">{{ $t('A file can contain multiple types of files (updates, history, documentation, source code, API, link, etc.)') }}</p>
              </div>
            </div>
          </Well>
          <fieldset class="fr-fieldset" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Files") }}
              </h2>
            </legend>
            <LinkedToAccordion class="fr-fieldset__element" :accordion="publishFileAccordionId">
              <InputGroup
                :aria-describedby="publishFileAccordionId"
                :label="$t('Dataset name')"
                :required="true"
              />
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
import { defineComponent } from 'vue';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Well from "../../components/Ui/Well/Well.vue";
import useUid from "../../composables/useUid";
import editIcon from "svg/illustrations/edit.svg";

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, InputGroup, LinkedToAccordion, Stepper, Well, Sidemenu },
  props: {
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const { id: publishFileAccordionId } = useUid("accordion");
    return {
      editIcon,
      publishFileAccordionId,
    };
  },
});
</script>
