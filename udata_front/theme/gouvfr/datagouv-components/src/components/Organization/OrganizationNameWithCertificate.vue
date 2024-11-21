<template>
  <span class="inline-flex" :class="type !== OTHER || organizationCertified ? 'fr-grid-row--middle' : 'align-items-baseline'">
    <span>
      <OwnerTypeIcon v-if="showType" :type="type" />
    </span>
    <TextClamp class="fr-mx-1v" :auto-resize="true" :text='organization.name' :max-lines='1' />
    <span
      v-if="organizationCertified"
      class="fr-icon-success-line fr-icon--sm"
      :title="t('The identity of this public service is certified by {certifier}', { certifier: config.title })"
      aria-hidden="true"
    >
    </span>
  </span>
</template>
<script lang="ts">
export type OrganizationNameWithCertificateProps = {
  organization: Organization,
  showType?: boolean,
};
</script>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import TextClamp from 'vue3-text-clamp';
import { config } from "../../config";
import OwnerTypeIcon from "../Owner/OwnerTypeIcon.vue";
import useOrganizationCertified from "../../composables/organizations/useOrganizationCertified";
import useOrganizationType, { OTHER } from "../../composables/organizations/useOrganizationType";
import type { Organization } from "../../types/organizations";

const { t } = useI18n();
const props = withDefaults(defineProps<OrganizationNameWithCertificateProps>(), {
  showType: true,
});
const { type } = useOrganizationType(props.organization);
const { organizationCertified } = useOrganizationCertified(props.organization);
</script>
