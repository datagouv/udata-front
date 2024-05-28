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
      :datasetLink="datasetAdminUrl"
      :reuseLink="reuseAdminUrl"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Step1CreateOrJoinOrganization from "./Step1CreateOrJoinOrganization.vue";
import Step2DescribeOrganization from './Step2DescribeOrganization.vue';
import Step3CompleteTheOrganization from './Step3CompleteTheOrganization.vue';
import { title, admin_root } from '../../config';
import { createOrganization, uploadLogo } from '../../api/organizations';
import { type NewOrganization } from '@etalab/data.gouv.fr-components';

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
  logo_thumbnail: "",
});

const errors = ref<Array<string>>([]);

const moveToStep = (step: number) => {
  if(containerRef.value) {
    containerRef.value.scrollIntoView({
      behavior: "smooth"
    });
  }
  currentStep.value = step;
};

async function createOrganizationAndMoveToNextStep(org: NewOrganization, file: File) {
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
      organization.value.logo_thumbnail = resp.image
    } catch (e) {
      errors.value.push("Failed to upload logo, you can upload it again in your management panel");
    }
  }
  if (moveToNextStep) {
    moveToStep(2);
  }
};
</script>
  