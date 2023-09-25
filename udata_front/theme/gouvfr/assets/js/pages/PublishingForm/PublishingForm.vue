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
  <template v-else-if="currentStep === 2">
    <Step3AddFiles
      v-if="editedFile === null"
      :files="files"
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
    :steps="steps"
    :originalDataset="dataset"
  />
</template>
<script>
import { defineComponent, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import Step1PublishingType from "./Step1PublishingType.vue";
import Step2DescribeDataset from './Step2DescribeDataset.vue';
import Step3AddFiles from './Step3AddFiles.vue';
import Step3UpdateFileMetadata from "./Step3UpdateFileMetadata.vue";
import Step4CompleteThePublication from "./Step4CompleteThePublication.vue";
import { user } from '../../config';

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
  },
  setup(props) {
    const { t } = useI18n();
    const steps = [t("Publish data on data.gouv.fr"), t("Describe your dataset"), t("Add files"), t("Complete your publishing")];
    const currentStep = ref(0);
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

    /** @type {import("vue").Ref<import("../../types").Dataset>} */
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
        zones: "",
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

    /** @type {import("vue").Ref<Array<import("../../types").DatasetFile>>} */
    const files = ref([]);

    /** @type {import("vue").Ref<import("../../types").DatasetFile | null>} */
    const editedFile = ref(null);

    /** @type {import("vue").Ref<number | null>} */
    const editedIndex = ref(null);

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

    const editFile = (resource, index) => {
      editedFile.value = toValue(resource);
      editedIndex.value = index;
    };

    const updateEditedFile = (file) => {
      editedFile.value = toValue(file);
      if(editedFile.value) {
        files.value[editedIndex.value || 0] = editedFile.value;
      }
      editedFile.value = null;
      editedIndex.value = null;
    }

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
      files,
      steps,
      updateDatasetAndMoveToNextStep,
      updateEditedFile,
      updateFilesAndMoveToNextStep,
    };
  }
});
</script>
