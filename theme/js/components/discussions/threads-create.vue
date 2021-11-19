<template>
  <div class="thread-create fr-mt-2w">
    <ThreadsCreateButton
      v-if="showCreateButton && !showForm"
      :onClick="displayForm"
    >
    </ThreadsCreateButton>
    <div v-if="showForm" class="bg-beige">
      <div class="fr-grid-row fr-grid-row--middle border-bottom border-g400">
        <div class="fr-col fr-p-2w fr-p-md-0 fr-h6 fr-mb-0">{{ $t("New discussion") }}</div>
        <div>
          <button class="fr-link--close fr-link text-grey-500 fr-mr-0" @click="hideForm">
            {{$t('Close')}}
          </button>
        </div>
      </div>
      <div class="thread-comment">
        <form @submit.prevent="submit">
          <div>
            <label for="thread-title" class="fs-sm f-bold mb-sm">{{
              $t("Title")
            }}</label>
          </div>
          <input
            type="text"
            id="thread-title"
            v-model="title"
            :placeholder="$t('Title')"
          />
          <div>
            <label for="thread-comment" class="fs-sm f-bold my-sm">{{
              $t("Message")
            }}</label>
          </div>
          <textarea
            id="thread-comment"
            v-model="comment"
            :placeholder="$t('Comment')"
          />
          <footer class="row-inline justify-between align-items-center">
            <span class="text-grey-300 fs-sm">
              {{ $t("Comment as") }}
              <Author :author="user" />
            </span>
            <input
              type="submit"
              :value="$t('Submit')"
              class="btn-secondary btn-secondary-green-300"
            />
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config";
import Author from "./author";
import AddIcon from "svg/actions/add.svg";
import ThreadsCreateButton from "./threads-create-button"; //Not the best but we don't have many svg

const log = console.log;

export default {
  components: {
    ThreadsCreateButton,
    Author
  },
  data() {
    return {
      loading: false,
      showForm: false,
      title: "",
      comment: "",
      user: config.user,
      AddIcon,
    };
  },
  props: {
    showCreateButton: {
      type: Boolean,
      default: false
    },
    subjectId: String,
    subjectClass: String,
    onSubmit: Function,
  },
  methods: {
    displayForm() {
      this.$auth(
        this.$t("You must be logged in to start a discussion.")
      );
      this.showForm = true;
    },
    hideForm() {
      this.showForm = false;
    },
    submit() {
      const vm = this;
      this.loading = true;

      const values = {
        title: this.title,
        comment: this.comment,
        subject: {
          id: this.subjectId,
          class: this.subjectClass,
        },
      };

      if (this.onSubmit)
        this.onSubmit(values).finally(() => {
          vm.loading = false;
          vm.showForm = false;
          vm.title = vm.comment = "";
        });
    },
  },
};
</script>
