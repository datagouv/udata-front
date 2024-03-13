<template>
  <div ref="containerRef">
    <Step1DescribeReuse
      v-if="currentStep === 0"
      :originalReuse="reuse"
      :steps="steps"
      :errors="errors"
      @next="createReuseAndMoveToNextStep"
    />
    <Step2AddDatasets
      v-else-if="currentStep === 1"
      :steps="steps"
      :reuse="reuse"
      :errors="errors"
      :originalDatasets="[]"
      @next="updateReuseAndMoveToNextStep"
    />
    <Step3CompleteThePublication
      v-else-if="currentStep === 2"
      :steps="steps"
      feedbackUrl=""
      redirectDraftUrl=""
      :originalReuse="reuse"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import Step1DescribeReuse from './Step1DescribeReuse.vue';
import Step2AddDatasets from './Step2AddDatasets.vue';
import Step3CompleteThePublication from './Step3CompleteThePublication.vue';
import { publishing_form_feedback_url, user } from '../../config';
import { createReuse, updateReuse, uploadLogo } from '../../api/reuses';
import { Reuse } from '../../types';
import { Owned } from '@etalab/data.gouv.fr-components';

const props = defineProps<{
  organization?: Array<any>,
  reuse?: Reuse,
  owner?: Owned,
  redirectDraftUrl: string
  originalDatasets?: Array<any>
}>();
  
const { t } = useI18n();

const steps = [t("Describe your reuse"), t("Add datasets"), t("Complete your publishing")];

const currentStep = ref<Number>(0);

const containerRef = ref<HTMLDivElement | null>(null);

let owned: Owned;

if(props.organization) {
  owned = ( {
    organization: props.organization,
    owner: null,
  });
} else {
  owned = {
    organization: null,
    owner: (props.owner ? props.owner : user),
  };
}

const reuse = ref({
  title: "",
  description: "",
  tags: null,
  private: false,
  datasets: [],
  image: "",
  image_thumbnail: "",
  topic: "",
  type: "",
  ...owned
});

const savedReuse = ref<Reuse | null>(null);

const draftUrl = ref<string | null>(null);

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

async function createReuseAndMoveToNextStep(newReuse: Reuse, newFile: File) {
  errors.value = [];
  let moveToNextStep = false;
  try {
    reuse.value = await createReuse(newReuse);
    moveToNextStep = true;
  } catch (e) {
    errors.value.push(e.message);
  }
  try {
    const resp = await uploadLogo(reuse.value.id, newFile.value[0]);
    reuse.value.image = resp.data.image
  } catch (e) {
    errors.value.push("Failed to upload logo, you can upload it again in your management panel");
  }
  if (moveToNextStep) {
    moveToStep(1);
  }

}

async function updateReuseAndMoveToNextStep(newReuse: Reuse) {
  errors.value = [];
  let moveToNextStep = false;
  try {
    reuse.value = await updateReuse(newReuse);
    moveToNextStep = true;
  } catch (e) {
    errors.value.push(e.message);
  }
  if (moveToNextStep) {
    moveToStep(2)
  }
};
</script>
>
