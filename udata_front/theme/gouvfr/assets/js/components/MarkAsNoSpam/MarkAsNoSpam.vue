<template>
  <button
    class="fr-btn fr-btn--sm fr-btn--icon-right fr-icon-feedback-fill"
    @click="markAsNoSpam"
    v-if="show"
  >
    {{$t('Mark as no spam')}}
  </button>
</template>
<script lang="ts">
import type { Spam } from "../../types";
export type MarkAsNoSpamProps = {
  url: string,
  // These undefined are not mandatory, there're here
  // to prevent bugs during the migration because
  // some old objects could have no `spam` element.
  // We may add a migration in the future to set them on all old objects
  spam: Spam | undefined
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import { user } from "../../config";
import { api } from "../../plugins/api";

const props = defineProps<MarkAsNoSpamProps>();

const markAsNoSpam = () => {
  return api
    .delete(props.url)
    .then(() => {
      window.location.reload();
    });
};

const show = computed(() => props.spam
  && props.spam.status
  && props.spam.status === 'potential_spam'
  && user
  && user.roles
  && user.roles.includes('admin')
)
</script>
