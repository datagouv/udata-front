<template>
  <div class="fr-container" ref="containerRef">
    <Step1DescribeDataservice
      v-if="currentStep === 0 && me"
      :dataservice="dataservice"
      :steps="steps"
      :errors="errors"
      :loading="loading"
      :user="me"
      @next="createDataserviceAndMoveToNextStep"
    />
    <Step2AddDatasets
      v-else-if="currentStep === 1"
      :steps="steps"
      :errors="errors"
      @next="updateDatasetsAndMoveToNextStep"
    />
    <Step3CompleteThePublication
      v-else-if="currentStep === 2 && savedDataservice"
      :steps="steps"
      :feedbackUrl="publishing_form_feedback_url ?? ''"
      :originalDataservice="savedDataservice"
      @update="updateDataserviceData"
    />
  </div>
</template>

<script setup lang="ts">
import type { AxiosError } from 'axios';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Dataset, NewDataservice, Dataservice, ContactPoint} from '@datagouv/components/ts';
import Step1DescribeDataservice from './Step1DescribeDataservice.vue';
import Step2AddDatasets from './Step2AddDatasets.vue';
import Step3CompleteThePublication from './Step3CompleteThePublication.vue';
import { publishing_form_feedback_url } from '../../config';
import { createDataservice, updateDataservice } from '../../api/dataservices';
import { createContactPointOrganization } from '../../api/organizations';
import type { Me } from '../../types';
import { fetchMe } from '../../api/me';
import { auth } from '../../plugins/auth';

const { t } = useI18n();

const steps = [t("Describe your dataservice"), t("Link datasets"), t("Complete your publishing")];

const currentStep = ref<number>(0);

const loading = ref<boolean>(false);

const containerRef = ref<HTMLDivElement | null>(null);

const me = ref<Me | null>(null);

const user = auth();

const dataservice = ref<NewDataservice>({
  acronym: "",
  authorization_request_url: null,
  availability: null,
  base_api_url: null,
  datasets: [],
  description: "",
  endpoint_description_url: null,
  has_token: false,
  is_restricted: false,
  license: null,
  private: true,
  rate_limiting: "",
  title: "",
  organization: null,
  owner: user.id,
  contact_point: null,
});

const savedDataservice = ref<Dataservice | null>(null);

const errors = ref<Array<string>>([]);

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

async function createDataserviceAndMoveToNextStep(newDataservice: NewDataservice, isNewContact: boolean, contactPoint: ContactPoint) {
  loading.value = true;
  errors.value = [];
  if (newDataservice.availability) { newDataservice.availability = Number(newDataservice.availability) } 
  try {
    if (contactPoint) {
      if (!isNewContact) {
        newDataservice.contact_point = contactPoint.id;
      } else {
        let contactData = await createContactPointOrganization(newDataservice.organization, contactPoint);
        newDataservice.contact_point = contactData.id;
      }
    }
    savedDataservice.value = await createDataservice(newDataservice);
    savedDataservice.value.datasets = []
    moveToStep(1);
  } catch (e) {
    errors.value.push(t("An error occured while creating your dataservice."));
    if(e instanceof Error && 'response' in e) {
      const error = e as AxiosError<{errors: {[Property in keyof NewDataservice]: Array<string>}}>;
      if(error.response?.data.errors.url) {
        errors.value.pop();
        errors.value.push(t("A dataservice already exists for this URL."));
      }
    }
  } finally {
    loading.value = false;
  }
}

async function updateDatasetsAndMoveToNextStep(datasets: Array<Dataset>) {
  errors.value = [];
  let moveToNextStep = false;
  if(!savedDataservice.value) {
    return moveToStep(0);
  }
  for (const dataset of datasets) {
    savedDataservice.value.datasets.push(dataset.id);
  }
  try {
    savedDataservice.value = await updateDataservice(savedDataservice.value);
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

async function updateDataserviceData(newDataservice: Dataservice) {
  try {
    delete newDataservice.datasets;
    savedDataservice.value = await updateDataservice(newDataservice);
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
