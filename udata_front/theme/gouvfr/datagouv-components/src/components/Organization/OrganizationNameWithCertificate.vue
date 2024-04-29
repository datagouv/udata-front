<template>
  <OrganizationTypeIcon v-if="showType" :type="type" />
  {{ organization.name }}
  <span
    v-if="organizationCertified"
    class="fr-icon-success-line fr-icon--sm"
    :title="t('The identity of this public service is certified by {certifier}', { certifier: config.title })"
    aria-hidden="true"
  >
  </span>
</template>
<script lang="ts">
export type OrganizatioNameWithCertificateProps = {
  organization: Organization,
  showType?: boolean,
};
</script>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { config } from "../../config";
import OrganizationTypeIcon from "./OrganizationTypeIcon.vue";
import useOrganizationCertified from "../../composables/organizations/useOrganizationCertified";
import useOrganizationType from "../../composables/organizations/useOrganizationType";
import type { Organization } from "../../types/organizations";

const { t } = useI18n();
const props = withDefaults(defineProps<OrganizatioNameWithCertificateProps>(), {
  showType: true,
});
const { type } = useOrganizationType(props.organization);
const { organizationCertified } = useOrganizationCertified(props.organization);
</script>
