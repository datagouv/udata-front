<template>
  <div ref="containerRef">
    <Step1PublishingType
      v-if="currentStep === 0"
      :steps="steps"
      @start="moveToStep(1)"
    />
    <Step2DescribeDataset
      v-else-if="currentStep === 1"
      :originalDataset="dataset"
      :steps="steps"
      @next="updateDatasetAndMoveToNextStep"
    />
    <template v-else-if="currentStep === 2">
      <Step3AddFiles
        v-if="editedFile === null"
        :originalFiles="files"
        :steps="steps"
        @next="updateFilesAndMoveToNextStep"
        @editFile="editFile"
      />
      <Step3UpdateFileMetadata
        v-else
        :datasetFile="editedFile"
        :steps="steps"
        @next="updateEditedFile"
      />
    </template>
    <Step4CompleteThePublication
      v-else-if="currentStep === 3"
      :feedbackUrl="publishing_form_feedback_url"
      :steps="steps"
      :originalDataset="savedDataset"
      :redirectDraftUrl="draftUrl"
      @redirectToPublicUrl="redirectToPublicUrl"
    />
  </div>
</template>
<script>
import { defineComponent, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import { templateRef, useEventListener } from '@vueuse/core';
import Step1PublishingType from "./Step1PublishingType.vue";
import Step2DescribeDataset from './Step2DescribeDataset.vue';
import Step3AddFiles from './Step3AddFiles.vue';
import Step3UpdateFileMetadata from "./Step3UpdateFileMetadata.vue";
import Step4CompleteThePublication from "./Step4CompleteThePublication.vue";
import { publishing_form_feedback_url, user } from '../../config';
import { createDataset, publishDataset } from '../../api/datasets';
import { createFile } from '../../api/resources';

export default defineComponent({
  components: { Step1PublishingType, Step2DescribeDataset, Step3AddFiles, Step3UpdateFileMetadata, Step4CompleteThePublication },
  props: {
    organization: {
      /** @type {import("vue").PropType<import("../../types").Organization>} */
      type: Object,
    },
    owner: {
      /** @type {import("vue").PropType<import("../../types").User>} */
      type: Object,
    },
    redirectDraftUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const steps = [t("Publish data on data.gouv.fr"), t("Describe your dataset"), t("Add files"), t("Complete your publishing")];
    const currentStep = ref(0);

    /** @type {import("vue").Ref<HTMLDivElement | null>} */
    const containerRef = templateRef('containerRef');

    /** @type {import("../../types").Owned} */
    let owned;

    if(props.organization) {
      owned = /** @type {import("../../types").OwnedByOrganization} */( {
      organization: props.organization,
      owner: undefined,
    });
    } else {
      owned = {
        organization: undefined,
        owner: /** @type {import("../../types").User} */(props.owner ? props.owner : user),
      };
    }

    /** @type {import("vue").Ref<import("../../types").NewDataset>} */
    const dataset = ref({
      archived: false,
      page: "",
      title: "",
      acronym: "",
      description: "",
      tags: null,
      license: "",
      frequency: "",
      temporal_coverage: "",
      last_update: null,
      private: true,
      spatial: {
        zones: [],
        granularity: "",
      },
      quality: {
        all_resources_available: false,
        dataset_description_quality: false,
        has_open_format: false,
        has_resources: false,
        license: false,
        resources_documentation: false,
        score: 0,
        spatial: false,
        temporal_coverage: false,
        update_frequency: false,
        update_fulfilled_in_time: false,
      },
      ...owned,
    });

    /** @type {import("vue").Ref<import("../../types").Dataset | null>} */
    const savedDataset = ref(null);

    const draftUrl = ref(props.redirectDraftUrl);

    /** @type {import("vue").Ref<Array<import("../../types").DatasetFile>>} */
    const files = ref([]);

    /** @type {import("vue").Ref<import("../../types").DatasetFile | null>} */
    const editedFile = ref(null);

    /** @type {import("vue").Ref<number | null>} */
    const editedIndex = ref(null);

    /**
     *
     * @param {number | null} step
     */
    const moveToStep = (step = null, saveToHistory = true) => {
      if(containerRef.value) {
        containerRef.value.scrollIntoView({
          behavior: "smooth"
        });
      }
      if(step !== null) {
        currentStep.value = step;
        if(saveToHistory) {
          let url = new URL(window.location.href);
          const targetHash = `#/step-${step + 1}`;
          url.hash = targetHash;
          window.history.pushState(null, "", url);
        }
      }
    };

    /**
     *
     * @param {import("vue").MaybeRefOrGetter<import("../../types").NewDataset>} updatedDataset
     */
    const updateDataset = (updatedDataset) => dataset.value = toValue(updatedDataset);

    /**
     *
     * @param {import("vue").MaybeRefOrGetter<import("../../types").NewDataset>} updatedDataset
     */
    const updateDatasetAndMoveToNextStep = (updatedDataset) => {
      updateDataset(updatedDataset);
      moveToStep(2);
    };

    /**
     *
     * @param {import("vue").MaybeRefOrGetter<Array<import("../../types").DatasetFile>>} updatedFiles
     */
    const updateFiles = (updatedFiles) => files.value = toValue(updatedFiles);

    /**
     *
     * @param {import("vue").MaybeRefOrGetter<Array<import("../../types").DatasetFile>>} files
     */
    const updateFilesAndMoveToNextStep = (files) => {
      updateFiles(files);
      createDataset(dataset).then(datasetFromApi => {
        savedDataset.value = datasetFromApi;

        draftUrl.value = draftUrl.value + savedDataset.value.id;

        const filesToUpload = toValue(files);
        const promises = [];
        for(const file of filesToUpload) {
          promises.push(createFile(savedDataset.value.id, file));
        }
        moveToStep(3);
      }).catch(e => console.log(e));
    }

    const redirectToPublicUrl = () => {
      if(savedDataset.value) {
        publishDataset(savedDataset.value).then((dataset) => window.open(dataset.page, "_self"));
      }
    };

    const editFile = (resources, index) => {
      files.value = toValue(resources);
      editedFile.value = files.value[index];
      editedIndex.value = index;
      moveToStep();
    };

    const updateEditedFile = (file) => {
      editedFile.value = toValue(file);
      if(editedFile.value) {
        files.value[editedIndex.value || 0] = editedFile.value;
      }
      editedFile.value = null;
      editedIndex.value = null;
      moveToStep();
    }

    useEventListener(window, 'hashchange', (evt) => {
      const hash = window.location.hash;
      const step = hash.substring(7);
      const parsedStep = parseInt(step, 10) - 1|| 0;
      const dontSave = false;
      if(editedFile.value && typeof editedIndex.value === "number" && !editedFile.value.title) {
        files.value.splice(editedIndex.value, 1);
        editedFile.value = null;
        editedIndex.value = null;
        moveToStep();
      } else {
        moveToStep(parsedStep, dontSave);
      }
    });

    return {
      currentStep,
      dataset,
      draftUrl,
      editFile,
      editedFile,
      files,
      moveToStep,
      publishing_form_feedback_url,
      redirectToPublicUrl,
      savedDataset,
      steps,
      updateDatasetAndMoveToNextStep,
      updateEditedFile,
      updateFilesAndMoveToNextStep,
    };
  }
});
</script>
