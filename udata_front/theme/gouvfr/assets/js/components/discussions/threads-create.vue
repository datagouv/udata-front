<template>
  <div class="thread-create fr-mt-2w">
    <ThreadsCreateButton
      v-if="showCreateButton && !showForm"
      :onClick="displayForm"
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
          <i18n-t
            keypath="Fields preceded by a star ({markup}) are required."
            tag="p"
            class="fr-mt-0 fr-mb-1w fr-text--xs"
            scope="global"
          >
            <template #markup>
              <span class="required-field-star">*</span>
            </template>
          </i18n-t>
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
              required="required"
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
              required="required"
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

<script>
import { defineComponent, ref } from "vue";
import { auth } from "../../plugins/auth";
import { user } from "../../config";
import Author from "./author.vue";
import ThreadsCreateButton from "./threads-create-button.vue";

export default defineComponent({
  components: {
    ThreadsCreateButton,
    Author,
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
      type: Function,
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

      const values = {
        title: title.value,
        comment: comment.value,
        subject: {
          id: props.subjectId,
          class: props.subjectClass,
        },
      };

      if (props.onSubmit)
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
