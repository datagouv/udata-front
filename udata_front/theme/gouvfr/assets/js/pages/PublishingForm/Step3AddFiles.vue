<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="2"/>
    <div class="fr-grid-row">
      <Sidemenu
        class="fr-col-12 fr-col-md-5"
        :buttonText="$t('Help')"
        :onRight="true"
        :showBorder="false"
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
              <div class="markdown fr-m-0">
                <p class="fr-m-0 fr-mb-1w">
                  {{ $t("Formats should be :") }}
                </p>
                <ul>
                  <li>{{ $t("open : an open format doesn't add technical specifications that restrict data use (i.e. using a paid software) ;") }}</li>
                  <li>{{ $t("easily reusable : a format easily reusable implies that anybody or server can reuse easily the dataset ;") }}</li>
                  <li>{{ $t("usable in an automated processing system : an automated processing system allows to make automatic operations, related to data exploitation (i.e. a CSV file is easily usable by an automated system unlike a PDF file).") }}</li>
                </ul>
              </div>
            </Accordion>
            <Accordion
              :title= "$t('Add a description')"
              :id="addDescriptionAccordionId"
            >
                <p class="fr-m-0">
                  {{ $t("The description of the dataset production mode allows a reuser to understand the dataset structure, data nature and possible gap or flaws in the file.") }}
                </p>
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
          <fieldset class="fr-fieldset min-width-0" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Files") }}
              </h2>
            </legend>
            <LinkedToAccordion class="fr-fieldset__element min-width-0" :accordion="publishFileAccordionId">
              <Container
                color="alt-grey"
                class="fr-grid-row fr-grid-row--middle flex-direction-column"
                v-if="dataset.files.length === 0"
              >
                <h3 class="fr-text--md fr-text--bold fr-m-0 fr-mb-2w">{{ $t("Add your first files") }}</h3>
                <UploadGroup
                  :label="$t('Add files')"
                  type="button"
                  @change="addFiles"
                  :multiple="true"
                />
              </Container>
              <template v-else>
                <FileCard
                  v-for="file in dataset.files"
                  :filename="file.name"
                  :filesize="file.size"
                  :format="file.type"
                  :lastModified="file.lastModified"
                  :missingMetadata="true"
                  :title="file.title || file.name"
                />
                <div class="fr-grid-row fr-grid-row--center fr-mt-3v">
                  <UploadGroup
                    :label="$t('Add files')"
                    type="button"
                    @change="addFiles"
                    :multiple="true"
                  />
                </div>
              </template>
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
import { defineComponent, reactive, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import FileCard from '../../components/Form/FileCard/FileCard.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import UploadGroup from '../../components/Form/UploadGroup/UploadGroup.vue';
import Well from "../../components/Ui/Well/Well.vue";
import useUid from "../../composables/useUid";
import { requiredWithCustomMessage } from '../../i18n';
import editIcon from "svg/illustrations/edit.svg";

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, InputGroup, LinkedToAccordion, Stepper, Well, Sidemenu, UploadGroup, FileCard },
  props: {
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const { t } = useI18n();
    const { id: publishFileAccordionId } = useUid("accordion");
    const { id: addDescriptionAccordionId } = useUid("accordion");
    /** @type {import("vue").UnwrapNestedRefs<{files: Array<File>}>} */
    const dataset = reactive({
      files: [],
    });
    const fileRequired = requiredWithCustomMessage(t("You didn't provide the spatial granularity."));
    const requiredRules = {
      files: { fileRequired },
    };
    const qualityRules = {
      files: { fileRequired },
    };
    const v$ = useVuelidate(requiredRules, dataset);
    const vQuality$ = useVuelidate(qualityRules, dataset);
    /**
     *
     * @param {FileList} files
     */
    const addFiles = (files) => dataset.files.push(...files);
    return {
      addFiles,
      dataset,
      editIcon,
      publishFileAccordionId,
      addDescriptionAccordionId,
      v$,
      vQuality$,
    };
  },
});
</script>
