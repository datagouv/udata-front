<template>
  {{ organization.name }}
  <span
    v-if="organizationCertified"
    class="fr-icon-success-line fr-icon--sm text-blue-400"
    :title="$t('The identity of this public service is certified by {certifier}', { certifier: title })"
    aria-hidden="true"
  >
  </span>
</template>

<script>
import { defineComponent } from "vue";
import { title } from "../../config";
import useOrganizationCertified from "../../composables/useOrganizationCertified";

export default defineComponent({
  props: {
    organization: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { organizationCertified } = useOrganizationCertified(props.organization);
    return {
      organizationCertified,
      title,
    };
  },
});
</script>
