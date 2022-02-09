<template>
  <section class="resources-wrapper" ref="top" key="top">
    <transition mode="out-in">
      <div v-if="loading" key="loader">
        <Loader class="mt-md" />
      </div>
      <div v-else>
        <Resource
          v-for="resource in resources"
          :id="'resource-' + resource.id"
          :dataset-id="datasetId"
          :resource="resource"
          :type-label="typeLabel"
          :can-edit="getCanEdit(resource)"
        />
        <Pagination
          class="fr-mt-3w"
          v-if="totalResults > pageSize"
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
import {onMounted, ref, reactive} from 'vue';
import Loader from "../loader.vue";
import Pagination from "../../pagination/pagination.vue";
import Resource from "./resource.vue";
import config from "../../../config";
import {useToast} from "../../../composables/useToast";
import {fetchDatasetCommunityResources, fetchDatasetResources} from "../../../api/resources";

export default {
  name: "resources",
  components: {
    Loader,
    Pagination,
    Resource,
  },
  props: {
    canEdit: {
      type: Boolean,
      default: false
    },
    canEditResources: {
      type: Object,
      default() { return {}}
    },
    datasetId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    typeLabel: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const toast = useToast();
    const currentPage = ref(1);
    const resources = ref([]);
    const pageSize = config.resources_default_page_size;
    const totalResults = ref(0);
    const loading = ref(true);
    const top = ref(null);

    // We can pass the second function parameter "scroll" to true if we want to scroll to the top of the resources section
    // This is useful for pagination buttons
    const loadPage = (page = 1, scroll = false) => {
      loading.value = true;
      if (scroll && top.value) {
        top.scrollIntoView({ behavior: "smooth" });
      }
      let fetchData;
      if(props.type === "community") {
        fetchData = fetchDatasetCommunityResources(props.datasetId, page, pageSize);
      } else {
        fetchData = fetchDatasetResources(props.datasetId, props.type, page, pageSize);
      }

      return fetchData
        .then((data) => {
          if (data.data) {
            resources.value = data.data;
            totalResults.value = data.total;
          }
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

    onMounted(() => loadPage(currentPage.value));

    return {
      currentPage,
      loading,
      changePage,
      pageSize,
      resources,
      totalResults,
      getCanEdit,
    }
  }
}
</script>
