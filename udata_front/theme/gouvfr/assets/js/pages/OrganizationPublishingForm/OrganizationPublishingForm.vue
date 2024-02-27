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
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { templateRef } from '@vueuse/core';
import Step1CreateOrJoinOrganization from "./Step1CreateOrJoinOrganization.vue";
import Step2DescribeOrganization from './Step2DescribeOrganization.vue';
import Step3CompleteTheOrganization from './Step3CompleteTheOrganization.vue';
import { title } from '../../config';
import { createOrganization, uploadLogo } from '../../api/organizations';
import { useFilesUpload } from '../../composables/form/useFilesUpload';
import { Organization } from '../../types';

const { t } = useI18n();

const steps = [t("Publish data on {site}", {site: title}), t("Describe your organization"), t("Finalize your organization")];

const currentStep = ref(0);

/** @type {import("vue").Ref<HTMLDivElement | null>} */
const containerRef = templateRef('containerRef');

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

/** @type {import("vue").Ref<Array<string>>} */
const errors = ref([]);

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

const createOrganizationAndMoveToNextStep = async (org: Organization, file: any) => {
  errors.value = [];
  let promiseSucceded = true;
  try {
    organization.value = await createOrganization(org);
    if (file.value !== null) {
      const resp = await uploadLogo(organization.value.id, file.value[0]);
      
      if (resp.status === 200) {
        organization.value.logo_thumbnail = resp.data.image;
      } else {
        promiseSucceded = false;
      }
    }
    if (promiseSucceded) {
      moveToStep(2);
    }
  } catch (e) {
    console.log(e);
    promiseSucceded = false;
    errors.value.push(e.message)
  }
};
</script>
  