<template>
  <div class="thread-reply">
    <div class="fr-grid-row fr-grid-row--middle fr-mb-3v">
      <h4 class="fr-col fr-text--bold fr-mb-0">{{ $t("Reply to the discussion") }}</h4>
      <div class="fr-col-auto">
        <button class="fr-btn--close fr-btn text-grey-500 fr-mr-0" @click="$emit('close')">
          {{$t('Close')}}
        </button>
      </div>
    </div>
    <form class="form fr-p-0" @submit.prevent="submit">
      <RequiredExplanation />
      <div class="fr-input-group">
        <label class="fr-label required" for="textarea">
          {{$t('Comment')}}
        </label>
        <textarea v-model="comment" required class="fr-input" id="textarea"></textarea>
      </div>
      <footer class="fr-grid-row justify-between fr-grid-row--middle">
        <p class="text-mention-grey fr-text--sm fr-m-0">
          {{ $t("Reply as") }}
          <Author :author="user" />
        </p>
        <input
          type="submit"
          :value="$t('Submit')"
          class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500"
        />
      </footer>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useToast } from "../../../composables/useToast";
import { user } from "../../../config";
import Author from "../Author/Author.vue";
import RequiredExplanation from "../../Ui/RequiredExplanation/RequiredExplanation.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    Author,
    RequiredExplanation,
  },
  emits: ['close'],
  props: {
    onSubmit: {
      type: /** @type {import("vue").PropType<import("../../../types").CreateComment>} */(Function),
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { toast } = useToast();
    const loading = ref(false);
    const comment = ref("");
    const submit = () => {
      loading.value = true;

      props.onSubmit(comment.value)
        .catch((_err) => {
          toast.error(t("Error sending response"));
        })
        .finally(() => {
          loading.value = false;
          comment.value = "";
        });
    };
    return {
      comment,
      loading,
      submit,
      user,
    }
  },
});
</script>
