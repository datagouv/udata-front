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
        :loading="loading"
        :errors="errors"
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
import { computed, defineComponent, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import { templateRef, useEventListener } from '@vueuse/core';
import Step1PublishingType from "./Step1PublishingType.vue";
import Step2DescribeDataset from './Step2DescribeDataset.vue';
import Step3AddFiles from './Step3AddFiles.vue';
import Step3UpdateFileMetadata from "./Step3UpdateFileMetadata.vue";
import Step4CompleteThePublication from "./Step4CompleteThePublication.vue";
import { publishing_form_feedback_url, title, user } from '../../config';
import { createDataset, publishDataset } from '../../api/datasets';
import { useFilesUpload } from '../../composables/form/useFilesUpload';

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

    const { files, updateFiles, uploadFiles } = useFilesUpload();

    const steps = [t("Publish data on {site}", {site: title}), t("Describe your dataset"), t("Add files"), t("Complete your publishing")];

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
      frequency_date: null,
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

    /** @type {import("vue").Ref<string | null>} */
    const draftUrl = ref(null);

    const datasetLoading = ref(false);

    const loading = computed(() => files.value.reduce((loading, file) => loading || file.state === "loading", datasetLoading.value));

    /** @type {import("vue").Ref<Array<string>>} */
    const errors = ref([]);

    /** @type {import("vue").Ref<import("../../types").NewDatasetFile | null>} */
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
     * @param {import("vue").MaybeRefOrGetter<import("../../types").NewDataset>} dataset
     */
    const createOrReturnDataset = (dataset) => {
      if(savedDataset.value) {
        return Promise.resolve(savedDataset.value);
      }
      return createDataset(dataset);
    }

    /**
     *
     * @param {import("vue").MaybeRefOrGetter<Array<import("../../types").NewDatasetFile>>} files
     */
    const updateFilesAndMoveToNextStep = (files) => {
      updateFiles(files);
      errors.value = [];
      datasetLoading.value = true;
      createOrReturnDataset(dataset).then(datasetFromApi => {
        savedDataset.value = datasetFromApi;
        draftUrl.value = props.redirectDraftUrl + savedDataset.value.id;
        uploadFiles(savedDataset.value.id)
        .then(results => {
          let allPromisesSucceded = true;
          for (let result of results) {
            if(result.status === "rejected") {
              allPromisesSucceded = false;
              errors.value.push(result.reason);
            }
          }
          if(allPromisesSucceded) {
            moveToStep(3);
          }
        });
      }).catch(e => console.log(e))
      .finally(() => datasetLoading.value = false);
    }

    const redirectToPublicUrl = () => {
      if(savedDataset.value) {
        publishDataset(savedDataset.value).then((dataset) => window.open(dataset.page, "_self"));
      }
    };

    /**
     *
     * @param {Array<import("../../types").NewDatasetFile>} resources
     * @param {number} index
     */
    const editFile = (resources, index) => {
      updateFiles(resources);
      editedFile.value = files.value[index];
      editedIndex.value = index;
      moveToStep();
    };

    /**
     *
     * @param {import("../../types").NewDatasetFile} file
     */
    const updateEditedFile = (file) => {
      editedFile.value = toValue(file);
      if(editedFile.value) {
        const filesToUpdate = [...toValue(files)];
        filesToUpdate[editedIndex.value || 0] = editedFile.value;
        updateFiles(filesToUpdate);
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
      if(editedFile.value && typeof editedIndex.value === "number") {
        if(!editedFile.value.title || !editedFile.value.format) {
          const filesToUpdate = [...toValue(files)];
          filesToUpdate.splice(editedIndex.value, 1);
          updateFiles(filesToUpdate);
        }
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
      errors,
      files,
      loading,
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
