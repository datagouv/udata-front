<template>
  {{ organization.name }}
  <span
    v-if="organizationCertified"
    class="fr-icon-success-line fr-icon--sm text-blue-400"
    :title="t('The identity of this public service is certified by {certifier}', { certifier: config.title })"
    aria-hidden="true"
  >
  </span>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { config } from "../../config";
import useOrganizationCertified from "../../composables/organizations/useOrganizationCertified";
import { Organization } from "../../types/organizations";

const { t } = useI18n();
const props = defineProps<{organization: Organization}>();

const { organizationCertified } = useOrganizationCertified(props.organization);
</script>
