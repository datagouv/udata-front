<template>
  <div class="fr-container" ref="containerRef">
    <Stepper :steps="steps" :currentStep="currentStep"/>
    <Step1CreateOrJoinOrganization
      v-if="currentStep === 0"
      @start="moveToStep(1)"
    />
    <Step2DescribeOrganization
      v-else-if="currentStep === 1"
      :organization="organization"
      :errors="errors"
      @submit="createOrganizationAndMoveToNextStep"
    />
    <Step3CompleteTheOrganization
      v-else-if="currentStep === 2 && savedOrganization"
      :organization="savedOrganization"
      :errors="errors"
      :datasetLink="datasetAdminUrl"
      :reuseLink="reuseAdminUrl"
    />
  </div>
</template>
<script setup lang="ts">
import type { NewOrganization, Organization } from '@datagouv/components/ts';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Stepper from "../../components/Form/Stepper/Stepper.vue";
import Step1CreateOrJoinOrganization from "./Step1CreateOrJoinOrganization.vue";
import Step2DescribeOrganization from './Step2DescribeOrganization.vue';
import Step3CompleteTheOrganization from './Step3CompleteTheOrganization.vue';
import { title, admin_root } from '../../config';
import { createOrganization, uploadLogo } from '../../api/organizations';

const { t } = useI18n();

const steps = [t("Create or join an organization on {site}", {site: title}), t("Describe your organization"), t("Finalize your organization")];

const reuseAdminUrl = `${admin_root}reuse/new/`;
const datasetAdminUrl = `${admin_root}dataset/new/`;

const currentStep = ref(0);

const containerRef = ref<HTMLDivElement | null>(null);

const organization = ref<NewOrganization>({
  name: "",
  business_number_id: "",
  acronym: "",
  description: "",
  url: "",
  logo: "",
});

const savedOrganization = ref<Organization | null>(null);

const errors = ref<Array<string>>([]);

const moveToStep = (step: number) => {
  if(containerRef.value) {
    containerRef.value.scrollIntoView({
      behavior: "smooth"
    });
  }
  currentStep.value = step;
};

async function createOrganizationAndMoveToNextStep(org: NewOrganization, file: File | null) {
  errors.value = [];
  let moveToNextStep = false;
  try {
    savedOrganization.value = await createOrganization(org);
    moveToNextStep = true;
  } catch (e) {
    if(e instanceof Error) {
      errors.value.push(e.message);
    }
  }
  if (file && savedOrganization.value) {
    try {
      const resp = await uploadLogo(savedOrganization.value.id, file);
      savedOrganization.value.logo_thumbnail = resp.image
    } catch (e) {
      errors.value.push(t("Failed to upload logo, you can upload it again in your management panel"));
    }
  }
  if (moveToNextStep) {
    moveToStep(2);
  }
};
</script>
