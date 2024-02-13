<template>
  <button
    class="fr-btn fr-btn--sm fr-btn--icon-right fr-icon-feedback-fill"
    @click="markAsNoSpam"
    v-if="show"
  >
    {{$t('Mark as no spam')}}
  </button>
</template>
<script setup lang="ts">
import { computed, defineProps } from "vue";
import { user } from "../../config";
import { api } from "../../plugins/api";

const props = defineProps<{
  url: string,
  spam: {
    status: string
  }
}>();

const markAsNoSpam = () => {
  return api
    .delete(props.url)
    .then(() => {
      window.location.reload();
    });
};

const show = computed(() => props.spam.status
  && props.spam.status === 'potential_spam'
  && user
  && user.roles
  && user.roles.includes('admin')
)

</script>
