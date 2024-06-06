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
      :granularities="granularities"
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
<script setup lang="ts">
import type { Dataset, NewDataset, Organization, Owned, User } from '@etalab/data.gouv.fr-components';
import { useEventListener } from '@vueuse/core';
import { type MaybeRefOrGetter, computed, onMounted, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import Step1PublishingType from "./Step1PublishingType.vue";
import Step2DescribeDataset from './Step2DescribeDataset.vue';
import Step3AddFiles from './Step3AddFiles.vue';
import Step3UpdateFileMetadata from "./Step3UpdateFileMetadata.vue";
import Step4CompleteThePublication from "./Step4CompleteThePublication.vue";
import { publishing_form_feedback_url, title, user } from '../../config';
import { createDataset, getSpatialGranularities, publishDataset } from '../../api/datasets';
import { useFilesUpload } from '../../composables/form/useFilesUpload';
import type { NewDatasetFile, SpatialGranularity } from '../../types';

const props = defineProps<{
  organization?: Organization;
  owner?: User;
  redirectDraftUrl: string;
}>();

const { t } = useI18n();

const { files, updateFiles, uploadFiles } = useFilesUpload();

const granularities = ref<Array<SpatialGranularity>>([]);

const steps = [t("Publish data on {site}", {site: title}), t("Describe your dataset"), t("Add files"), t("Complete your publishing")];

const currentStep = ref(0);

const containerRef = ref<HTMLDivElement | null>(null);

let owned: Owned;

if(props.organization) {
  owned = {
    organization: props.organization as Organization,
    owner: null,
  };
} else {
  owned = {
    organization: null,
    owner: (props.owner ? props.owner : user) as User,
  };
}

const dataset = ref<NewDataset>({
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

const savedDataset = ref<Dataset | null>(null);

const draftUrl = ref<string | null>(null);

const datasetLoading = ref(false);

const loading = computed(() => files.value.reduce((loading, file) => loading || file.state === "loading", datasetLoading.value));

const errors = ref<Array<string>>([]);

const editedFile = ref<NewDatasetFile | null>(null);

const editedIndex = ref<number | null>(null);

/**
 * Move form to new step. `null` step means to only scroll to top
 * @param step
 */
const moveToStep = (step: number | null = null, saveToHistory = true) => {
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

onMounted(async () => {
  try {
    const granularitiesValue = await getSpatialGranularities();
    granularities.value = granularitiesValue;
  } catch(error) {
    console.error("Error fetching granularities:", error);
  }
});

const updateDataset = (updatedDataset: MaybeRefOrGetter<NewDataset>) => dataset.value = toValue(updatedDataset);

const updateDatasetAndMoveToNextStep = (updatedDataset: MaybeRefOrGetter<NewDataset>) => {
  updateDataset(updatedDataset);
  moveToStep(2);
};

const createOrReturnDataset = (dataset: MaybeRefOrGetter<NewDataset>) => {
  if(savedDataset.value) {
    return Promise.resolve<Dataset>(savedDataset.value);
  }
  return createDataset(dataset);
}

const updateFilesAndMoveToNextStep = (files: MaybeRefOrGetter<Array<NewDatasetFile>>) => {
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

const editFile = (resources: MaybeRefOrGetter<Array<NewDatasetFile>>, index: number) => {
  updateFiles(resources);
  editedFile.value = toValue(files)[index];
  editedIndex.value = index;
  moveToStep();
};

const updateEditedFile = (file: NewDatasetFile) => {
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

useEventListener(window, 'hashchange', (_evt) => {
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
</script>
