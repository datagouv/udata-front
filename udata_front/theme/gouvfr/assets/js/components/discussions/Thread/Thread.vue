<template>
  <div class="bg-contrast-grey fr-mt-2w" :id="discussionUrl">
    <header class="fr-grid-row fr-grid-row--middle justify-between fr-py-2w fr-px-3w no-wrap wrap-md">
      <p class="fr-col-auto text-default-warning fr-text--bold fr-pr-2w fr-my-0" v-if="closed">
        <span>{{ $t("Discussion closed") }}</span>
      </p>
      <h3 class="fr-col fr-mx-3v fr-mx-md-0 fr-h6 fr-mb-0">{{ title }}</h3>
      <div class="fr-col-auto text-align-right">
        <MarkAsNoSpam :url="`discussions/${id}/spam`" :spam="spam" class="fr-mr-3v" />
        <button
          :id="id + '-copy'"
          :data-clipboard-text="discussionExternalUrl"
          class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 fr-btn--icon-right fr-icon-links-fill"
        >
          {{$t('Copy discussion permalink')}}
        </button>
      </div>
    </header>
    <div>
      <transition-group name="list">
        <article
          v-for="(comment, index) in currentDiscussion"
          v-if="!collapsed"
          class="thread-comment fr-py-3w fr-px-3w fr-pr-5w"
          :key="'comment-' + comment.id"
        >
          <div class="fr-grid-row fr-grid-row--gutters">
            <Avatar class="fr-col-auto" :user="comment.posted_by"/>
            <div class="fr-col">
              <p class="fr-my-0"><Author :author="comment.posted_by" :badge="false" /></p>
              <p class="fr-text--sm text-mention-grey fr-m-0">
                {{ formatDate(comment.posted_on) }}
              </p>
              <ReadMore class="fr-mt-3v">
                <div class="white-space-pre-wrap overflow-wrap-anywhere">
                  <p class="fr-my-0">{{ comment.content }}</p>
                </div>
              </ReadMore>
              <MarkAsNoSpam :url="`discussions/${id}/comments/${index}/spam`" :spam="comment.spam" class="fr-mt-3v" />
            </div>
          </div>
        </article>
      </transition-group>
      <div class="fr-py-2w fr-px-3w" v-if="collapsed">
        <button
        class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500"
        @click.prevent="collapsed = false"
      >
        {{ $t("See {n} messages", currentDiscussion.length) }}
      </button>
      </div>
    </div>
    <footer class="fr-py-2w fr-px-3w">
      <template v-if="!closed && !readOnlyEnabled">
        <button
          class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-btn--icon-right fr-icon-arrow-right-s-line"
          v-if="!showForm"
          @click.stop="displayForm"
        >
          {{ $t("Reply") }}
        </button>
        <ThreadReply
          :subjectId="id"
          v-else
          :onSubmit="replyToThread"
          @close="showForm = false"
        />
      </template>
      <div v-if="closed" class="text-grey-380">
        {{ $t("The discussion was closed by") }} &#32;
        <strong class="fr-px-1v"><Author :author="closed_by" /></strong>
        {{ $t("on") }} {{ formatDate(closed) }}
      </div>
    </footer>
  </div>
</template>

<script>
import Avatar from "../Avatar/Avatar.vue";
import Author from "../Author/Author.vue";
import ReadMore from "../../ReadMore/ReadMore.vue";
import ThreadReply from "../ThreadReply/ThreadReply.vue";
import MarkAsNoSpam from "../../MarkAsNoSpam/MarkAsNoSpam.vue";
import { read_only_enabled } from "../../../config";
import { formatDate } from "@etalab/data.gouv.fr-components";
import { computed, defineComponent, ref } from "vue";
import { auth } from "../../../plugins/auth";
import { api } from "../../../plugins/api";

export default defineComponent({
  inheritAttrs: false,
  components: {
    Avatar,
    Author,
    ReadMore,
    ThreadReply,
    MarkAsNoSpam,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    discussion: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    closed: {
      type: String,
      default: ""
    },
    closed_by: {
      type: Object,
      default() {return {};},
    },
    spam: {
      type: Object,
      default() {return {};},
    },
  },
  setup(props) {
    const showForm = ref(false);

    const currentDiscussion = ref([...props.discussion]);

    const collapsed = ref(!!props.closed);

    const discussionUrl = computed(() => "discussions/" + props.id);

    const discussionExternalUrl = computed(() => {
      const hash = "#/" + discussionUrl.value;
      return window.location.origin + window.location.pathname + hash;
    });

    const displayForm = () => {
      auth();
      showForm.value = true;
    }

    const replyToThread = (comment) => {
      return api
        .post("/discussions/" + props.id + "/", { comment })
        .then((resp) => resp.data)
        .then((updatedDiscussion) => {
          currentDiscussion.value = updatedDiscussion.discussion;
          showForm.value = false;
        });
    };

    return {
      collapsed,
      discussionExternalUrl,
      discussionUrl,
      displayForm,
      formatDate,
      readOnlyEnabled: read_only_enabled,
      replyToThread,
      showForm,
      currentDiscussion,
    };
  },
});
</script>
