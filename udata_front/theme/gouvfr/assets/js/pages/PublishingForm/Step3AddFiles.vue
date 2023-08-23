<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="2"/>
    <div class="fr-grid-row">
      <Sidemenu
        class="fr-col-12 fr-col-md-5"
        :buttonText="$t('Help')"
        :onRight="true"
        :fixed="true"
        :showBorder="false"
        >
          <template #title>
            <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
            {{ $t('Help') }}
          </template>
          <Accordion
            :title= "$t('Publish the right types of files')"
            :id="publishFileAccordionId"
            :state="state.files"
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
            <Well class="fr-mt-1w" v-if="stateHasWarning('files')" color="orange-terre-battue">
              {{ getWarningText("files") }}
            </Well>
          </Accordion>
          <Accordion
            :title= "$t('Add a documentation')"
            :id="addDescriptionAccordionId"
            :state="state.hasDocumentation"
          >
            <div class="markdown fr-m-0">
              <p class="fr-m-0 fr-mb-1w">
                {{ $t("The documentation of the dataset has an educational purpose and eases the data reuse. It covers among others:") }}
              </p>
              <ul>
                <li>{{ $t("a general description of the dataset ;") }}</li>
                <li>{{ $t("a description of the data production mode ;") }}</li>
                <li>{{ $t("a description of the data model ;") }}</li>
                <li>{{ $t("a description of the data schema ;") }}</li>
                <li>{{ $t("a description of the metadata ;") }}</li>
                <li>{{ $t("a description of major changes.") }}</li>
              </ul>
            </div>
            <Well class="fr-mt-1w" v-if="stateHasWarning('hasDocumentation')" color="orange-terre-battue">
              {{ getWarningText("hasDocumentation") }}
            </Well>
          </Accordion>
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
            <LinkedToAccordion
              class="fr-fieldset__element min-width-0"
              :accordion="publishFileAccordionId"
              @blur="touch"
            >
              <Container
                color="alt-grey"
                class="fr-grid-row fr-grid-row--middle flex-direction-column"
                v-if="dataset.files.length === 0"
              >
                <h3 class="fr-text--md fr-text--bold fr-m-0 fr-mb-2w">{{ $t("Add your first files") }}</h3>
                <UploadGroup
                  class="fr-grid-row flex-direction-column fr-grid-row--middle"
                  :label="$t('Add files')"
                  type="button"
                  @change="addFiles"
                  :multiple="true"
                  :required="true"
                  :hasError="stateHasError('files')"
                  :errorText="getErrorText('files')"
                />
              </Container>
              <template v-else>
                  <FileCard
                    v-for="(resource, index) in dataset.files"
                    class="fr-mb-3v"
                    :key="index"
                    :filename="resource.file.name"
                    :filesize="resource.filesize"
                    :format="resource.format"
                    :lastModified="resource.file.lastModified"
                    :missingMetadata="true"
                    :title="resource.title || resource.file.name"
                    @delete="removeFile(index)"
                    @edit="$emit('editFile', resource)"
                  />
                <div class="fr-grid-row fr-grid-row--center">
                  <UploadGroup
                    :label="$t('Add files')"
                    type="button"
                    @change="addFiles"
                    :multiple="true"
                    :required="true"
                    :hasError="stateHasError('files')"
                    :errorText="getErrorText('files')"
                  />
                </div>
              </template>
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
import { useI18n } from 'vue-i18n';
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
import { requiredWithCustomMessage, withMessage } from '../../i18n';
import editIcon from "svg/illustrations/edit.svg";
import useFunctionalState from '../../composables/useFunctionalState';
import { isClosedFormat } from '../../helpers';

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, FileCard, InputGroup, LinkedToAccordion, Sidemenu, Stepper, UploadGroup, Well },
  emits: ["editFile", "next"],
  props: {
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const { id: publishFileAccordionId } = useUid("accordion");
    const { id: addDescriptionAccordionId } = useUid("accordion");

    /** @type {import("vue").UnwrapNestedRefs<{files: Array<import("../../types").DatasetFile>}>} */
    const dataset = reactive({
      files: [],
    });

    const fileRequired = requiredWithCustomMessage(t("At least one file is required."));

    /**
     * Validates that the dataset contains an open format file.
     * @param {Array<import("../../types").DatasetFile>} value
     */
    const onefileHasOpenFormats = (value) => value.reduce((previous, current) => previous || !isClosedFormat(current.format), false);

    /**
     * Validates that the dataset contains a documentation file.
     * @param {undefined} value
     * * @param {{files: Array<import("../../types").DatasetFile>}} siblings
     */
     const hasDocumentation = (value, siblings) => siblings.files.reduce((previous, current) => previous || current.type === "documentation", false);

    const requiredRules = {
      files: { fileRequired },
    };
    const warningRules = {
      files: { required: fileRequired, openFormat: withMessage(t("At least one file should have an open format."), onefileHasOpenFormats) },
      hasDocumentation: { hasDocumentation: withMessage(t("You don't add any documentation file or describe your files."), hasDocumentation) }
    };

    const { getErrorText, getFunctionalState, getWarningText, hasError, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState(dataset, requiredRules, warningRules);

    /**
     *
     * @param {FileList} files
     */
    const addFiles = (files) => {
      for(const file of files) {
        dataset.files.push({
          file,
          description: "",
          format: file.type.includes("/") ? file.type.split("/").pop() || "" : file.type,
          filesize: file.size,
          filetype: "file",
          mime: file.type,
          title: "",
          type: "main"
        });
      }
    };

    /**
     *
     * @param {number} position
     */
    const removeFile = (position) => dataset.files.splice(position, 1);

    /**
     * @type {import("vue").ComputedRef<Record<string, import("../../types").AccordionFunctionalState>>}
     */
    const state = computed(() => {
      return {
        files: getFunctionalState(vWarning$.value.files.$dirty, v$.value.files.$invalid, vWarning$.value.files.$error),
        hasDocumentation: getFunctionalState(vWarning$.value.hasDocumentation.$dirty, false, vWarning$.value.hasDocumentation.$error),
      };
    });

    const touch = () => {
      vWarning$.value.files.$touch();
      vWarning$.value.hasDocumentation.$touch()
    };

    const submit = () => {
      validateRequiredRules().then(validated => {
        if(validated) {
          emit("next", dataset);
        }
      });
    };

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

    watchEffect(() => console.log(vWarning$.value));

    return {
      addDescriptionAccordionId,
      addFiles,
      dataset,
      editIcon,
      getErrorText,
      getFunctionalState,
      getWarningText,
      publishFileAccordionId,
      removeFile,
      state,
      stateHasError,
      stateHasWarning,
      submit,
      touch,
      v$,
      vWarning$,
    };
  },
});
</script>
