<template>
  <div class="thread-create fr-mt-2w">
    <ThreadCreateButton
      v-if="showCreateButton && !showForm"
      @click="displayForm"
    />
    <div v-if="showForm" class="bg-contrast-grey">
      <div class="fr-grid-row fr-grid-row--middle fr-py-2w fr-px-3w">
        <div class="fr-col fr-h6 fr-mb-0">{{ $t("New discussion") }}</div>
        <div>
          <button class="fr-btn--close fr-btn text-grey-500 fr-mr-0" @click="hideForm">
            {{$t('Close')}}
          </button>
        </div>
      </div>
      <div class="thread-comment fr-pb-3w fr-px-3w">
        <form class="form fr-p-0" @submit.prevent="submit">
          <RequiredExplanation />
          <div class="fr-input-group">
            <label for="thread-title" class="fr-label required">
              {{ $t("Title") }}
            </label>
            <input
              class="fr-input"
              type="text"
              id="thread-title"
              v-model="title"
              :placeholder="$t('Title')"
              :required="true"
          />
          </div>
          <div class="fr-input-group">
            <label for="thread-comment" class="fr-label required">
              {{ $t("Message") }}
            </label>
            <textarea
              id="thread-comment"
              v-model="comment"
              :placeholder="$t('Comment')"
              class="fr-input"
              :required="true"
            ></textarea>
          </div>
          <footer class="fr-grid-row justify-between fr-grid-row--middle">
            <span class="text-mention-grey fr-text--sm fr-mb-0">
              {{ $t("Reply as") }}
              <Author :author="user" />
            </span>
            <input
              type="submit"
              :value="$t('Submit')"
              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500"
            />
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { auth } from "../../../plugins/auth";
import { user } from "../../../config";
import Author from "../Author/Author.vue";
import ThreadCreateButton from "./ThreadCreateButton.vue";
import type { NewDiscussion } from "../../../types";
import RequiredExplanation from "../../Ui/RequiredExplanation/RequiredExplanation.vue";

export default defineComponent({
  expose: ["displayForm"],
  components: {
    ThreadCreateButton,
    Author,
    RequiredExplanation,
},
  props: {
    showCreateButton: {
      type: Boolean,
      default: false
    },
    subjectId: {
      type: String,
      required: true,
    },
    subjectClass: {
      type: String,
      required: true,
    },
    onSubmit: {
      type: /** @type {import("vue").PropType<import("../../../types").CreateDiscussion>} */(Function),
      required: true,
    },
  },
  setup(props) {
    const loading = ref(false);
    const showForm = ref(false);
    const title = ref("");
    const comment = ref("");

    const displayForm = () => {
      auth();
      showForm.value = true;
    };

    const hideForm = () => {
      showForm.value = false;
    };

    const submit = () => {
      loading.value = true;

      const values: NewDiscussion = {
        title: title.value,
        comment: comment.value,
        subject: {
          id: props.subjectId,
          class: props.subjectClass,
        },
      };

      props.onSubmit(values).finally(() => {
        loading.value = false;
        showForm.value = false;
        title.value = comment.value = "";
        document.querySelector("[data-no-discussion]")?.remove();
      });
    };

    return {
      loading,
      showForm,
      title,
      comment,
      user,
      displayForm,
      hideForm,
      submit,
    };
  }
});
</script>
