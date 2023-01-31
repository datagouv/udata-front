<template>
  <section class="resources-wrapper fr-grid-row fr-mb-3v" v-if="showTitle" ref="top">
    <div class="fr-col-12 fr-grid-row">
      <div class="fr-col">
        <h2 :class="{'fr-mt-4w': !firstGroup}" class="fr-mb-0 subtitle subtitle--uppercase">
          {{ typeLabel }}
        </h2>
      </div>
      <div class="fr-col-auto" v-if="isCommunityResources">
        <a class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-add-line fr-btn--icon-left"
          :href="newResourceAdminPath"
        >
          {{ $t('Add a community resource') }}
        </a>
      </div>
    </div>
    <template v-if="showSearch">
      <SearchBar eventName="resources.search"></SearchBar>
    </template>
    <transition mode="out-in">
      <div v-if="loading">
        <Loader class="fr-mt-2w" />
      </div>
      <div class="fr-col-12" v-else>
        <Resource
          v-for="resource in resources"
          :id="'resource-' + resource.id"
          :datasetId="datasetId"
          :isCommunityResource="isCommunityResources"
          :resource="resource"
          :canEdit="getCanEdit(resource)"
          :typeLabel="typeLabel"
        />
        <p v-if="!totalResults">
          {{$t('No resources match your search.')}}
        </p>
        <Pagination
          class="fr-mt-3w"
          v-else-if="totalResults > pageSize"
          :page="currentPage"
          :page-size="pageSize"
          :total-results="totalResults"
          :change-page="changePage"
        />
      </div>
    </transition>
  </section>
</template>

<script>
import {useI18n} from 'vue-i18n'
import {onMounted, ref, computed, watch, defineComponent} from 'vue';
import Loader from "../loader.vue";
import Pagination from "../../pagination/pagination.vue";
import Resource from "./resource.vue";
import SearchBar from "../../utils/search-bar.vue";
import config from "../../../config";
import {useToast} from "../../../composables/useToast";
import {fetchDatasetCommunityResources, fetchDatasetResources} from "../../../api/resources";
import {
  bus,
  RESOURCES_SEARCH,
  RESOURCES_SEARCH_RESULTS_TOTAL,
  RESOURCES_SEARCH_RESULTS_UPDATED
} from "../../../plugins/eventbus";

export default defineComponent({
  name: "resources",
  components: {
    Loader,
    Pagination,
    Resource,
    SearchBar,
  },
  props: {
    canEdit: {
      type: Boolean,
      default: false
    },
    canEditResources: {
      type: Object,
      default:() => ({})
    },
    datasetId: {
      type: String,
      required: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    showTotal: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
    typeLabel: {
      type: String,
      required: true,
    },
    firstGroup: {
      type: Boolean,
      default: true,
    }
  },
  setup(props) {
    const { t } = useI18n();
    const toast = useToast();
    const currentPage = ref(1);
    const resources = ref([]);
    const pageSize = config.resources_default_page_size;
    const newResourceAdminUrl = new URL(document.location.origin + config.admin_root + "community-resource/new/");
    const params = new URLSearchParams({dataset_id: props.datasetId});
    newResourceAdminUrl.search = params.toString();
    const newResourceAdminPath = newResourceAdminUrl.toString();
    const firstResults = ref(0);
    const totalResults = ref(0);
    const loading = ref(true);
    /** @type {import("vue").Ref<HTMLElement | null>} */
    const top = ref(null);
    const search = ref('');
    const isCommunityResources = ref(props.type === "community");
    const showSearch = computed(() => !isCommunityResources.value && firstResults.value > config.resources_min_count_to_show_search);
    const DONT_SCROLL = false;

    // We can pass the second function parameter "scroll" to true if we want to scroll to the top of the resources section
    // This is useful for pagination buttons
    const loadPage = (page = 1, scroll = false) => {
      loading.value = true;
      if (scroll && top.value) {
        top.value.scrollIntoView({ behavior: "smooth" });
      }
      let fetchData;
      if(isCommunityResources.value) {
        fetchData = fetchDatasetCommunityResources(props.datasetId, page, pageSize);
      } else {
        fetchData = fetchDatasetResources(props.datasetId, props.type, page, pageSize, search.value);
      }

      return fetchData
        .then((data) => {
          if (data.data) {
            resources.value = data.data;
            totalResults.value = data.total;
          }
          return data.total || 0;
        })
        .catch(() => {
          toast.error(
            t("An error occurred while fetching resources")
          );
          resources.value = [];
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const changePage = (index, scroll = true) => {
      currentPage.value = index;
      loadPage(index, scroll);
    };

    const getCanEdit = (resource) => {
      if(props.canEdit) {
        return props.canEdit;
      }
      return props.canEditResources[resource.id];
    }

    onMounted(() => loadPage(currentPage.value).then(results => firstResults.value = results));

    if(!isCommunityResources.value) {
      bus.on(RESOURCES_SEARCH, value => {
        search.value = value;
        changePage(1, DONT_SCROLL);
      });
      watch(totalResults, (count) => bus.emit(RESOURCES_SEARCH_RESULTS_UPDATED, {type: props.type, count}));
      bus.on(RESOURCES_SEARCH_RESULTS_TOTAL, (total) => {
        const els = document.querySelectorAll(".resources-count");
        if (els) els.forEach((el) => (el.innerHTML = total));
      });
    }

    return {
      currentPage,
      loading,
      changePage,
      pageSize,
      resources,
      totalResults,
      getCanEdit,
      isCommunityResources,
      top,
      showSearch,
      newResourceAdminPath,
    }
  }
});
</script>
