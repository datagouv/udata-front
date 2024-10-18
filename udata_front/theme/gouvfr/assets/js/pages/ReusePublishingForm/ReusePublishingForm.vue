<template>
  <div class="fr-container" ref="containerRef">
    <Step1DescribeReuse
      v-if="currentStep === 0 && me"
      :reuse="reuse"
      :steps="steps"
      :errors="errors"
      :loading="loading"
      :user="me"
      @next="createReuseAndMoveToNextStep"
    />
    <Step2AddDatasets
      v-else-if="currentStep === 1"
      :steps="steps"
      :errors="errors"
      @next="updateDatasetsAndMoveToNextStep"
    />
    <Step3CompleteThePublication
      v-else-if="currentStep === 2 && savedReuse"
      :steps="steps"
      :feedbackUrl="publishing_form_feedback_url ?? ''"
      :redirectDraftUrl="draftUrl"
      :originalReuse="savedReuse"
      @update="updateReuseData"
    />
  </div>
</template>

<script setup lang="ts">
import type { AxiosError } from 'axios';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Dataset, NewReuse, Reuse } from '@datagouv/components/ts';
import Step1DescribeReuse from './Step1DescribeReuse.vue';
import Step2AddDatasets from './Step2AddDatasets.vue';
import Step3CompleteThePublication from './Step3CompleteThePublication.vue';
import { publishing_form_feedback_url } from '../../config';
import { createReuse, updateReuse, uploadLogo } from '../../api/reuses';
import type { Me } from '../../types';
import { fetchMe } from '../../api/me';
import { auth } from '../../plugins/auth';

const props = defineProps<{
  redirectDraftUrl: string;
}>();

const { t } = useI18n();

const steps = [t("Describe your reuse"), t("Link datasets"), t("Complete your publishing")];

const currentStep = ref<number>(0);

const loading = ref<boolean>(false);

const containerRef = ref<HTMLDivElement | null>(null);

const me = ref<Me | null>(null);

const user = auth();

const reuse = ref<NewReuse>({
  title: "",
  description: "",
  tags: null,
  url: "",
  datasets: [],
  topic: "",
  type: "",
  organization: null,
  owner: user.id,
  private: true,
});

const savedReuse = ref<Reuse | null>(null);

const errors = ref<Array<string>>([]);

const draftUrl = ref<string>("");

const moveToStep = (step: number, saveToHistory = true) => {
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

async function createReuseAndMoveToNextStep(newReuse: NewReuse, file: File) {
  loading.value = true;
  errors.value = [];
  let moveToNextStep = false;
  try {
    savedReuse.value = await createReuse(newReuse);
    draftUrl.value = props.redirectDraftUrl + savedReuse.value.id;
    moveToNextStep = true;
    try {
      const resp = await uploadLogo(savedReuse.value.id, file);
      savedReuse.value.image = resp.data.image;
    } catch (e) {
      errors.value.push(t("Failed to upload logo, you can upload it again in your management panel"));
    }
  } catch (e) {
    errors.value.push(t("An error occured while creating your reuse."));
    if(e instanceof Error && 'response' in e) {
      const error = e as AxiosError<{errors: {[Property in keyof NewReuse]: Array<string>}}>;
      if(error.response?.data.errors.url) {
        errors.value.pop();
        errors.value.push(t("A reuse already exists for this URL."));
      }
    }
  } finally {
    loading.value = false;
  }
  if (moveToNextStep) {
    moveToStep(1);
  }
}

async function updateDatasetsAndMoveToNextStep(datasets: Array<Dataset>) {
  errors.value = [];
  let moveToNextStep = false;
  if(!savedReuse.value) {
    return moveToStep(0);
  }
  for (const dataset of datasets) {
    savedReuse.value.datasets.push(dataset.id);
  }
  try {
    savedReuse.value = await updateReuse(savedReuse.value);
    moveToNextStep = true;
  } catch (e) {
    if(e instanceof Error) {
      errors.value.push(e.message);
    }
  }
  if (moveToNextStep) {
    moveToStep(2);
  }
};

async function updateReuseData(newReuse: Reuse) {
  try {
    savedReuse.value = await updateReuse(newReuse);
    window.open(savedReuse.value.page, "_self")
  } catch (e) {
    if(e instanceof Error) {
      errors.value.push(e.message);
    }
  }
};

onMounted(async () => {
  me.value = await fetchMe();
});
</script>
