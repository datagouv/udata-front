<template>
  <section class="discussions-wrapper" ref="top">
    <div class="fr-grid-row fr-grid-row--middle" v-if="totalResults">
      <div class="fr-col">
        <h2 id="community-discussions" class="subtitle subtitle--uppercase">{{ $t("{n} discussions", totalResults) }}</h2>
      </div>
      <div class="fr-col-12 fr-col-md-6 fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--right" v-if="!discussionId">
        <div class="fr-col-auto">
          <select
          name="sortBy"
          id="sortBy"
          :aria-label="$t('Sort discussions by')"
          @change="changeSort(currentSort)"
          v-model="currentSort"
          class="fr-select fr-select--no-border fr-select--blue"
        >
          <option
            v-for="sort in sorts"
            :value="sort"
            :selected="sort === currentSort"
          >
            {{ sort.name }}
          </option>
        </select>
        </div>
        <div class="fr-col-auto">
          <ThreadCreateButton @click="startThreadWithoutScroll"/>
        </div>
      </div>
    </div>
    <div class="fr-grid-row fr-grid-row--center" v-else>
      <ThreadCreateButton class="fr-col--bottom" :primary="true" @click="startThreadWithoutScroll"/>
    </div>
    <transition mode="out-in">
      <template v-if="loading" key="loader">
        <Loader class="fr-mt-2w" />
      </template>
      <template v-else>
        <div v-if="discussionId">
          <Well type="secondary" color="success" class="fr-mt-2w" data-cy="threadFromURL">
            <div class="fr-grid-row fr-grid-row--middle justify-between">
              {{
                $t("You are seeing a specific discussion about this dataset.")
              }}
              <button class="fr-btn--close fr-btn fr-mr-0" @click.prevent="resetHash">
                {{$t('Close')}}
              </button>
            </div>
          </Well>
          <thread v-if="threadFromURL" v-bind="threadFromURL"></thread>
          <Well v-else type="secondary" color="warning" class="fr-mt-2w">
            {{ $t("This discussion doesn't exist or was deleted.") }}
          </Well>
          <button
            class="nav-link nav-link--no-icon text-decoration-none fr-link fr-mt-9v fr-link--icon-left fr-icon-arrow-right-s-line"
            @click.prevent="resetHash"
          >
            <span class="text-decoration-underline">{{ $t("See all discussions about this dataset") }}</span>
          </button>
        </div>
        <div v-else>
          <ThreadCreate
            ref="createThread"
            :onSubmit="createNewThread"
            :subjectId="subjectId"
            :subjectClass="subjectClass"
            v-if="!read_only_enabled"
          />
          <ul class="fr-mb-5v">
            <li
              v-for="discussion in discussions"
            >
              <thread v-bind="discussion" />
            </li>
          </ul>
          <pagination
            v-if="totalResults > pageSize"
            :page="currentPage"
            :page-size="pageSize"
            :total-results="totalResults"
            :changePage="changePage"
          />
        </div>
      </template>
    </transition>
  </section>
</template>

<script>
import { defineComponent, onMounted, ref, unref, watch, watchEffect } from "vue";
import { read_only_enabled } from "../../config";
import { Pagination } from "@etalab/udata-front-plugins-helper";
import ThreadCreate from "./ThreadCreate/ThreadCreate.vue";
import Thread from "./Thread/Thread.vue";
import Loader from "./Thread/Loader.vue";
import ThreadCreateButton from "./ThreadCreate/ThreadCreateButton.vue";
import Well from "../Ui/Well/Well.vue";
import { useI18n } from "vue-i18n";
import { api } from "../../plugins/api";
import { useToast } from "../../composables/useToast";
import useIdFromHash from "../../composables/useIdFromHash";

export default defineComponent({
  components: {
    ThreadCreateButton,
    ThreadCreate,
    Thread,
    Pagination,
    Loader,
    Well,
  },
  props: {
    subjectId: {
      type: String,
      required: true,
    },
    subjectClass: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { toast } = useToast();

    const discussions = ref([]);

    const discussionUrlRegExp = /discussions\/([a-f0-9]{24})-?([0-9]+)?$/i;
    const previousDiscussionUrlRegExp = /discussion-([a-f0-9]{24})-?([0-9]+)?$/i;

    const { id: discussionId, resetHash } = useIdFromHash([discussionUrlRegExp, previousDiscussionUrlRegExp]);

    /**
     * @typedef {object} Thread
     * @property {string} id
     * @property {Array} discussion
     * @property {String} title
     * @property {String} url
     * @property {String} closed - date when the thread was closed, as string
     * @property {import("@etalab/data.gouv.fr-components").User} closed_by - User who closed the thread
     */

    /** @type {import("vue").Ref<Thread | null>} */
    const threadFromURL = ref(null);

    const currentPage = ref(1);

    const pageSize = 5;

    const totalResults = ref(0);

    const loading = ref(true);

    const sorts = [
      {
        name: t("Discussion creation"),
        key: "-created"
      },
      {
        name: t("Last reply"),
        key: "-discussion.posted_on",
      },
    ];

    const currentSort = ref(sorts[0]);

    /** @type {import("vue").Ref<HTMLElement | null>} */
    const top = ref(null);

    const loadThreadFromHash = () => {
      loadThread(discussionId.value);
    };

    const loadThread = (id) => {
      if (!id) return;
      loading.value = true;

      // Scroll the discussion block into view.
      // SetTimeout is needed (instead of $nextTick) because the DOM updates are too fast for the browser to handle
      setTimeout(
        () => {
          if(top.value) {
            top.value.scrollIntoView({ behavior: "smooth" })
          }
        },
        500
      );

      return api
        .get("/discussions/" + id)
        .then((resp) => resp.data)
        .then((data) => {
          if (data) {
            threadFromURL.value = data;
            totalResults.value = 1;
          }
        })
        .catch(() => {
          toast.error(
            t("An error occurred while fetching the discussion ") + id
          );
          loadPage(1); // In case loading a single comment didn't work, we load the first page. Better than nothing !
        })
        .finally(() => {
          loading.value = false;
        });
    };

    /**
     *
     * @param {import("vue").Ref<number> | number} page
     * @param {boolean} scroll
     */
    const loadPage = (page = 1, scroll = false) => {
      page = unref(page);
      loading.value = true;

      // We can pass a second "scroll" variable to true if we want to scroll to the top of the discussions section
      // This is useful for bottom of the page navigation buttons
      if (scroll) {
        setTimeout(() => {
          if (top.value) {
            top.value.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }

      return api
        .get("/discussions/", {
          params: {
            page,
            for: props.subjectId,
            sort: currentSort.value.key,
            page_size: pageSize,
          },
        })
        .then((resp) => resp.data)
        .then((data) => {
          if (data.data) {
            discussions.value = data.data;
            totalResults.value = data.total;
          }
        })
        .catch(() => {
          toast.error(
            t("An error occurred while fetching discussions")
          );
          discussions.value = [];
        })
        .finally(() => {
          loading.value = false;
        });
    };

    /** @type {import("vue").Ref<import("./ThreadCreate/ThreadCreate.vue").default | null>} */
    const createThread = ref(null);

    const startThread = () => {
      startThreadWithoutScroll();
      if(createThread.value) {
        createThread.value.$el.scrollIntoView();
      }
    };

    const startThreadWithoutScroll = () => {
      if (!createThread.value) return;
      createThread.value.displayForm();
    };

    const createNewThread = (data) => {
      return api
        .post("/discussions/", data)
        .then(() => {
          currentPage.value = 1;
          loadPage(1, true);
        })
        .catch((err) =>
          toast.error(
            t("An error occurred while creating the discussion "),
            err
          )
        );
    };

    const changePage = (index, scroll = true) => {
      currentPage.value = index;
      loadPage(index, scroll);
    };

    const changeSort = (sort) => {
      currentSort.value = sort;
      loadPage(currentPage);
    };

    onMounted(() => {
      loadPage();
    });

    watchEffect(() => {
      if (discussionId.value) {
        loadThreadFromHash();
      }
    });

    watch(totalResults, (count) => {
      /** @type {NodeListOf<HTMLElement>} */
      const els = document.querySelectorAll(".discussions-count");
      if (els) els.forEach((el) => (el.innerHTML = count.toFixed(0)));
    });

    return {
      discussionId,
      discussions,
      threadFromURL,
      currentPage,
      pageSize,
      totalResults,
      loading,
      currentSort,
      sorts,
      read_only_enabled,
      createThread,
      changePage,
      changeSort,
      createNewThread,
      resetHash,
      startThreadWithoutScroll,
      top,
    };
  }
});
</script>
