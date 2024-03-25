<template>
  <section class="fr-mb-3v" v-if="!resourceIdFromHash" ref="top">
    <div class="fr-grid-row">
      <div class="fr-col">
        <h2 :class="{'fr-mt-4w': !firstGroup}" class="fr-mb-0 subtitle subtitle--uppercase">
          {{ typeLabel }}
        </h2>
      </div>
      <div class="fr-col-auto" v-if="isCommunityResources">
        <a class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-add-line fr-btn--icon-left"
          :href="newResourceAdminPath"
        >
          {{ t('Add a community resource') }}
        </a>
      </div>
    </div>
    <div v-if="showSearch" class="fr-mt-3v">
      <SearchBar :eventName="RESOURCES_SEARCH" :type="type"></SearchBar>
    </div>
    <transition mode="out-in">
      <div v-if="loading">
        <ResourceAccordionLoader v-for="_i in pageSize" class="fr-mt-2w" />
      </div>
      <div v-else>
        <p
          v-if="filteredResults"
          class="fr-py-3v fr-my-0 fr-text--sm border-default-grey border-bottom"
          role="status"
        >
          {{ t("{count} results", totalResults) }}
        </p>
        <ResourceAccordion
          v-for="resource in resources"
          :id="'resource-' + resource.id"
          :datasetId="datasetId"
          :isCommunityResource="isCommunityResources"
          :resource="resource"
          :canEdit="getCanEdit(resource)"
        />
        <p v-if="!totalResults">
          {{ t('No files match your search.') }}
        </p>
        <Pagination
          class="fr-mt-3w"
          v-else-if="totalResults > pageSize"
          :page="currentPage"
          :page-size="pageSize"
          :total-results="totalResults"
          @change="changePage"
        />
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted, ref, computed } from 'vue';
import { ResourceAccordion, ResourceAccordionLoader, type Resource, Pagination } from "@etalab/data.gouv.fr-components";
import SearchBar from "../../utils/search-bar.vue";
import config from "../../../config";
import { useToast } from "../../../composables/useToast";
import {fetchDatasetCommunityResources, fetchDatasetResources} from "../../../api/resources";
import {
  bus,
  RESOURCES_SEARCH,
} from "../../../plugins/eventbus";
import useIdFromHash from '../../../composables/useIdFromHash';
import { previousResourceUrlRegExp, resourceUrlRegExp } from '../../../helpers';

type Props = {
  canEdit?: boolean,
  canEditResources?: Record<string, boolean>,
  datasetId: string,
  showTotal?: boolean,
  type: string,
  typeLabel: string,
  firstGroup?: boolean,
};

const props = withDefaults(defineProps<Props>(), {
  canEdit: false,
  canEditResources: () => ({}),
  firstGroup: true,
  showTotal: true,
});

const { t } = useI18n();
const { toast } = useToast();
const { id: resourceIdFromHash } = useIdFromHash([resourceUrlRegExp, previousResourceUrlRegExp]);
const currentPage = ref(1);

const resources = ref<Array<Resource>>([]);
const pageSize = config.resources_default_page_size;
const newResourceAdminUrl = new URL(document.location.origin + config.admin_root + "community-resource/new/");
const params = new URLSearchParams({dataset_id: props.datasetId});
newResourceAdminUrl.search = params.toString();
const newResourceAdminPath = newResourceAdminUrl.toString();
const firstResults = ref(0);
const totalResults = ref(0);
const loading = ref(true);

const top = ref<HTMLElement | null>(null);
const search = ref('');
const isCommunityResources = ref(props.type === "community");
const showSearch = computed(() => !isCommunityResources.value && firstResults.value > config.resources_min_count_to_show_search);
const DONT_SCROLL = false;

const filteredResults = computed(() => firstResults.value != totalResults.value);

// We can pass the second function parameter "scroll" to true if we want to scroll to the top of the resources section
// This is useful for pagination buttons
const loadPage = (page = 1, scroll = false) => {
  loading.value = true;
  if (scroll && top.value) {
    top.value.scrollIntoView({ behavior: "smooth" });
  }
  let fetchData: Promise<import("../../../api/resources").ResourceApiWrapper>;
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
      return 0;
    })
    .finally(() => {
      loading.value = false;
    });
};

const changePage = (index: number, scroll = true) => {
  currentPage.value = index;
  return loadPage(index, scroll);
};

const getCanEdit = (resource: Resource) => {
  if(props.canEdit) {
    return props.canEdit;
  }
  return props.canEditResources[resource.id];
}

if(!isCommunityResources.value) {
  bus.on(RESOURCES_SEARCH, ({type, value}) => {
    if(type === props.type) {
      search.value = value;
      changePage(1, DONT_SCROLL);
    }
  });
}

/**
 * First resource load can append when the component is mounted, on page load without hash
 * Or it can be triggered when a page load with a hash and the hash is later deleted.
 */
const firstLoad = () => {
  changePage(1, DONT_SCROLL).then(results => firstResults.value = results);
};

onMounted(() => firstLoad());
</script>
