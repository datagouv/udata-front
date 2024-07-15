<template>
  <div class="fr-container" ref="containerRef">
    <Step1DescribeReuse
      v-if="currentStep === 0 && me"
      :originalReuse="reuse"
      :steps="steps"
      :errors="errors"
      :user="me"
      @next="createReuseAndMoveToNextStep"
    />
    <Step2AddDatasets
      v-else-if="currentStep === 1"
      :steps="steps"
      :reuse="reuse"
      :errors="errors"
      @next="updateReuseAndMoveToNextStep"
    />
    <Step3CompleteThePublication
      v-else-if="currentStep === 2"
      :steps="steps"
      :feedbackUrl="publishing_form_feedback_url"
      :originalReuse="reuse"
      @update="updateReuseData"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { User } from '@etalab/data.gouv.fr-components';
import Step1DescribeReuse from './Step1DescribeReuse.vue';
import Step2AddDatasets from './Step2AddDatasets.vue';
import Step3CompleteThePublication from './Step3CompleteThePublication.vue';
import { publishing_form_feedback_url } from '../../config';
import { createReuse, updateReuse, uploadLogo } from '../../api/reuses';
import type { NewReuse } from '../../types';
import { fetchMe } from '../../api/me';
import { auth } from '../../plugins/auth';
  
const { t } = useI18n();

const steps = [t("Describe your reuse"), t("Add datasets"), t("Complete your publishing")];

const currentStep = ref<Number>(0);

const containerRef = ref<HTMLDivElement | null>(null);

const me = ref<User | null>(null);

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
});

const errors = ref<Array<String>>([]);

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

async function createReuseAndMoveToNextStep(newReuse: Reuse, file: File) {
  errors.value = [];
  let moveToNextStep = false;
  try {
    reuse.value = await createReuse(newReuse);
    moveToNextStep = true;
  } catch (e) {
    errors.value.push(e.message);
  }
  try {
    const resp = await uploadLogo(reuse.value.id, file);
    reuse.value.image = resp.data.image
  } catch (e) {
    errors.value.push(t("Failed to upload logo, you can upload it again in your management panel"));
  }
  if (moveToNextStep) {
    moveToStep(1);
  }
}

async function updateReuseAndMoveToNextStep(newReuse: Reuse) {
  errors.value = [];
  let moveToNextStep = false;
  const datasets = newReuse.datasets;
  try {
    reuse.value = await updateReuse(newReuse);
    reuse.value.datasets = datasets;
    moveToNextStep = true;
  } catch (e) {
    errors.value.push(e.message);
  }
  if (moveToNextStep) {
    moveToStep(2);
  }
};

async function updateReuseData(newReuse: Reuse) {
  try {
    reuse.value = await updateReuse(newReuse);
  } catch (e) {
    errors.value.push(e.message);
  }
};

onMounted(async () => {
  fetchMe().then(result => {
    me.value = result;
  });
});
</script>
