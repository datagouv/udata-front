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
  import { computed, ref} from 'vue';
  import { useI18n } from 'vue-i18n';
  import { templateRef } from '@vueuse/core';
  import Step1CreateOrJoinOrganization from "./Step1CreateOrJoinOrganization.vue";
  import Step2DescribeOrganization from './Step2DescribeOrganization.vue';
  import Step3CompleteTheOrganization from './Step3CompleteTheOrganization.vue';
  import { title, user } from '../../config';
  import { createOrganization, uploadLogo } from '../../api/organizations';
  import { useFilesUpload } from '../../composables/form/useFilesUpload';
  import { Organization } from '../../types';

  const props = defineProps<{
    organization: Organization,
  }>();
  
  const { t } = useI18n();

  console.log(user)
  
  const { files, updateFiles, uploadFiles } = useFilesUpload();

  const steps = [t("Publish data on {site}", {site: title}), t("Describe your organization"), t("Finalize your organization")];

  const currentStep = ref(0);

  /** @type {import("vue").Ref<HTMLDivElement | null>} */
  const containerRef = templateRef('containerRef');

  const organization = ref<Organization>({
    acronym: "",
    badges: [],
    business_number_id: "",
    created_at: "",
    deleted: "",
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

  const organizationLoading = ref(false);

  const loading = computed(() => files.value.reduce((loading, file) => loading || file.state === "loading", organizationLoading.value));

  /** @type {import("vue").Ref<Array<string>>} */
  const errors = ref([]);

  /**
   *
   * @param {number | null} step
   */
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

  const createOrganizationAndMoveToNextStep = async (org: Organization, file) => {
    organization.value = await createOrganization(org);
    if (file.value !== null) {
      organization.value.logo_thumbnail = await uploadLogo(organization.value.id, file.value).then(resp => resp.data.image);
      console.log(organization.value);
    }
    moveToStep(2);
  };
  </script>
  