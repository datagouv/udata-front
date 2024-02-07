<template>
  <button
    class="fr-btn fr-btn--sm fr-btn--icon-right fr-icon-feedback-fill"
    @click="markAsNoSpam"
    v-if="show"
  >
    {{$t('Mark as no spam')}}
  </button>
</template>
<script>
import { computed, defineComponent } from "vue";
import { user } from "../../config";
import { api } from "../../plugins/api";

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true,
    },
    spam: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const markAsNoSpam = () => {
      return api
        .delete(props.url)
        .then(() => {
          window.location.reload();
        });
    };

    const show = computed(() => props.spam.status && props.spam.status === 'potential_spam' && user && user.roles.includes('admin'))

    return { markAsNoSpam, show }
  },
});
</script>
