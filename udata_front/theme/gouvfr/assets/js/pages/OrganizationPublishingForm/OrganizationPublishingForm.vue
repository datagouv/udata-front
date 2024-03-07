<template>
  <div ref="containerRef">
    <Step1CreateOrJoinOrganization
      v-if="currentStep === 0"
      :steps="steps"
      @start="moveToStep(1)"
    />
    <Step2DescribeOrganization
      v-else-if="currentStep === 1"
      :organization="organization"
      :steps="steps"
      :errors="errors"
      @next="createOrganizationAndMoveToNextStep"
    />
    <Step3CompleteTheOrganization
      v-else-if="currentStep === 2"
      :steps="steps"
      :organization="organization"
      :errors="errors"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Step1CreateOrJoinOrganization from "./Step1CreateOrJoinOrganization.vue";
import Step2DescribeOrganization from './Step2DescribeOrganization.vue';
import Step3CompleteTheOrganization from './Step3CompleteTheOrganization.vue';
import { title } from '../../config';
import { createOrganization, uploadLogo } from '../../api/organizations';
import { Organization } from '../../types';

const { t } = useI18n();

const steps = [t("Publish data on {site}", {site: title}), t("Describe your organization"), t("Finalize your organization")];

const currentStep = ref(0);

const containerRef = ref<HTMLDivElement | null>(null);

const organization = ref<Organization>({
  acronym: "",
  badges: [],
  business_number_id: "",
  created_at: "",
  deleted: null,
  description: "",
  id: "",
  last_modified: "",
  last_update: "",
  logo: "",
  logo_thumbnail: "",
  members: [],
  metrics: {
    datasets: 0,
    followers: 0,
    members: 0,
    reuses: 0,
    views: 0,
  },
  name: "",
  page: "",
  slug: "",
  uri: "",
  url: ""
});

const errors = ref<Array<string>>([]);

const moveToStep = (step: number | null) => {
  if(containerRef.value) {
    containerRef.value.scrollIntoView({
      behavior: "smooth"
    });
  }
  if(step !== null) {
    currentStep.value = step;
  }
};

async function createOrganizationAndMoveToNextStep(org: Organization, file: File) {
  errors.value = [];
  let moveToNextStep = false;
  try {
    organization.value = await createOrganization(org);
    moveToNextStep = true;
  } catch (e) {
    errors.value.push(e.message);
  }
  if (file.value !== null) {
    try {
      const resp = await uploadLogo(organization.value.id, file.value[0]);
      organization.value.logo_thumbnail = resp.data.image
    } catch (e) {
      errors.value.push("Failed to upload logo, you can upload it again in your management panel");
    }
  }
  if (moveToNextStep) {
    moveToStep(2);
  }
};
</script>
  