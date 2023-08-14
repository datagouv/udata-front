<template>
  <Step1PublishingType
    v-if="currentStep === 0"
    :steps="steps"
    @start="currentStep = 1"
  />
  <Step2DescribeDataset
    v-else-if="currentStep === 1"
    :originalDataset="dataset"
    :steps="steps"
    @next="updateDatasetAndMoveToNextStep"
  />
  <template  v-else-if="currentStep === 2">
    <Step3AddFiles
      v-if="editedFile === null"
      :originalDataset="dataset"
      :steps="steps"
      @next="updateFilesAndMoveToNextStep"
      @edit="editFile"
    />
    <Step3UpdateFileMetadata
      v-else
      :datasetFile="editedFile"
      :steps="steps"
    />
  </template>
</template>
<script>
import { defineComponent, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import Step1PublishingType from "./Step1PublishingType.vue";
import Step2DescribeDataset from './Step2DescribeDataset.vue';
import Step3AddFiles from './Step3AddFiles.vue';
import Step3UpdateFileMetadata from "./Step3UpdateFileMetadata.vue";

export default defineComponent({
  components: { Step1PublishingType, Step2DescribeDataset, Step3AddFiles, Step3UpdateFileMetadata },
  setup(props) {
    const { t } = useI18n();
    const steps = [t("Publish data on data.gouv.fr"), t("Describe your dataset"), t("Add files"), t("Check information of your dataset"), t("Complete your publishing")];
    const currentStep = ref(0);

    /** @type {import("vue").Ref<import("../../types").Dataset>} */
    const dataset = ref({
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

    /** @type {import("vue").Ref<Array<import("../../types").DatasetFile>>} */
    const files = ref([]);

    /** @type {import("vue").Ref<import("../../types").DatasetFile | null>} */
    const editedFile = ref(null);

    /**
     *
     * @param {import("vue").MaybeRefOrGetter<import("../../types").Dataset>} updatedDataset
     */
    const updateDataset = (updatedDataset) => dataset.value = toValue(updatedDataset);

    /**
     *
     * @param {import("vue").MaybeRefOrGetter<import("../../types").Dataset>} updatedDataset
     */
    const updateDatasetAndMoveToNextStep = (updatedDataset) => {
      updateDataset(updatedDataset);
      currentStep.value = 2;
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
      currentStep.value = 3;
    }

    const editFile = (file) => editedFile.value = file;

     /**
     *
     * @param {import("vue").MaybeRefOrGetter<import("../../types").DatasetFile>} updatedFile
     */
     const saveFile = (updatedFile) => files.value = toValue(updatedFile);

    return {
      currentStep,
      dataset,
      editFile,
      editedFile,
      steps,
      updateDatasetAndMoveToNextStep,
      updateFilesAndMoveToNextStep,
    };
  }
});
</script>
