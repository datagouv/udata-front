<!--
---
name: RequestMembership
category: 5 - Interactions
---

# Request Membership

A simple request membership prompt.
-->

<template>
  <button
    @click.prevent="askToJoinOrganization"
    class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-btn--icon-left fr-icon-team-line"
  >
    {{ $t('Ask to join the organization as a producer') }}
  </button>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { api } from "../../plugins/api";
import { auth } from "../../plugins/auth";

export default defineComponent({
  props: {
    organization: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {t} = useI18n();
    const comment = ref('');

    const askToJoinOrganization = () => {
      auth();

      comment.value = prompt(t('You can add some details here for your membership request')) || "";

      api.post("organizations/" + props.organization + "/membership/", {comment: comment.value})
          .then(data => {
            alert(t('A request has been sent to the administrators'));
            window.location.reload();
        })
        .catch(error => {
            alert(t('Error while requesting membership'));
            console.error(error);
        });
    };

    return {
      askToJoinOrganization,
      comment,
    };
  },
});
</script>
