<template>
  <div ref="containerRef">
    <Step1DescribeReuse
      v-if="currentStep === 0"
      :steps="steps"
      @next="updateReuseAndMoveToNextStep"
    />
    <Step2AddDatasets
      v-else-if="currentStep === 1"
      :steps="steps"
    />
    <Step3CompleteThePublication
      v-else-if="currentStep === 2"
      :steps="steps"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import { templateRef, useEventListener } from '@vueuse/core';
import Step1DescribeReuse from './Step1DescribeReuse.vue';
import Step2AddDatasets from './Step2AddDatasets.vue';
import Step3CompleteThePublication from './Step3CompleteThePublication.vue';
import { publishing_form_feedback_url, user } from '../../config';
import { createDataset, publishDataset } from '../../api/datasets';
import { useFilesUpload } from '../../composables/form/useFilesUpload';
import { Reuse, Organization, User } from '../../types';

const props = defineProps<{
  organization?: Organization,
  reuse?: Reuse,
  owner?: User,
  redirectDraftUrl: string
}>();
  
const { t } = useI18n();

const { files, updateFiles, uploadFiles } = useFilesUpload();

const steps = [t("Describe your reuse"), t("Add datasets"), t("Complete your publishing")];

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

/** @type {import("vue").Ref<import("../../types").Reuse>} */
const reuse = ref({
  title: "",
  description: "",
  tags: [],
  page: "",
  private: false,
  datasets: [],
  image: "",
  image_thumbnail: "",
  slug: "",
  topic: "",
  type: "",
  ...owned,
});

/** @type {import("vue").Ref<import("../../types").Reuse | null>} */
const savedReuse = ref(null);

/** @type {import("vue").Ref<string | null>} */
const draftUrl = ref(null);

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
 * @param {import("vue").MaybeRefOrGetter<import("../../types").Reuse>} updatedReuse
 */
const updateReuse = (updatedReuse) => reuse.value = toValue(updatedReuse);

/**
 *
 * @param {import("vue").MaybeRefOrGetter<import("../../types").Reuse>} updatedReuse
 */
const updateDatasetAndMoveToNextStep = (updatedReuse) => {
  updateReuse(updatedReuse);
  moveToStep(1);
};

/**
 *
 * @param {import("vue").MaybeRefOrGetter<import("../../types").NewDataset>} reuse
 */
const createOrReturnReuse = (reuse) => {
  if(savedDReuse.value) {
    return Promise.resolve(savedReuse.value);
  }
  return createDataset(reuse);
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
  if(savedReuse.value) {
    publishDataset(savedReuse.value).then((reuse) => window.open(reuse.page, "_self"));
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
</script>
