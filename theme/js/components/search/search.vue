<template>
  <form @submit.prevent="search">
    <div class="row-inline justify-between align-items-center search-bar" ref="searchRef">
      <SearchInput
        class="fr-my-1w fr-my-md-2w fr-text--lead fr-mb-0"
        :onChange="handleSearchChange"
        :value="queryString"
        :placeholder="$t('Search for data...')"
      />
      <div
        class="filter-icon fr-hidden-md w-auto fr-mx-3v"
        :class="{ isFiltered, active: extendedForm }"
        v-html="filterIcon"
        @click="extendedForm = !extendedForm"
      ></div>
    </div>
    <div class="row-inline fr-mt-3v justify-between align-items-center">
      <h1 class="fr-m-0 fr-h4">
        {{ $t("Datasets") }}
        <sup>{{ totalResults }}</sup>
      </h1>
      <a
        :href="reuseUrl"
        class="nav-link fr-text--sm fr-mb-0 fr-displayed-md fr-mt-3v"
      >{{ $t("Search reuses") }}</a>
    </div>
    <section class="search-filters fr-p-2w fr-p-md-0" :class="{ active: extendedForm }">
      <h2 class="fr-mt-md-2w fr-mb-2w fr-mb-md-1w fr-text--sm">{{ $t("Search filters") }}</h2>
      <div class="filters-wrapper fr-p-md-3v">
        <div class="fr-grid-row fr-grid-row--gutters justify-between align-items-center">
          <div class="fr-col-12 fr-col-md-6 fr-col-lg-3">
            <MultiSelect
              :placeholder="$t('Organizations')"
              :searchPlaceholder="$t('Search an organization...')"
              listUrl="/organizations/?sort=-followers"
              suggestUrl="/organizations/suggest/"
              entityUrl="/organizations/"
              :values="facets.organization"
              :onChange="handleSuggestorChange('organization')"
            />
          </div>
          <div class="fr-col-12 fr-col-md-6 fr-col-lg-3">
            <MultiSelect
              :placeholder="$t('Tags')"
              :searchPlaceholder="$t('Search a tag...')"
              suggestUrl="/tags/suggest/"
              :values="facets.tag"
              :onChange="handleSuggestorChange('tag')"
            />
          </div>
          <div class="fr-col-12 fr-col-md-5 fr-col-lg-3">
            <MultiSelect
              :placeholder="$t('Licenses')"
              :searchPlaceholder="$t('Search a license...')"
              listUrl="/datasets/licenses/"
              :values="facets.license"
              :onChange="handleSuggestorChange('license')"
            />
          </div>
          <div class="fr-col-12 fr-col-md-5 fr-col-lg-2">
            <MultiSelect
              :placeholder="$t('Formats')"
              :searchPlaceholder="$t('Search a format...')"
              suggestUrl="/datasets/suggest/formats/"
              :values="facets.format"
              :onChange="handleSuggestorChange('format')"
            />
          </div>
          <div class="fr-col-2 fr-col-lg-1 fr-displayed-md text-align-center text-align-right-lg">
            <button
              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-200 text-grey-380 fr-px-2w"
              @click="extendedForm = !extendedForm"
              data-cy="extend-form"
            >
              <span v-if="!extendedForm">…</span>
              <span v-else>X</span>
            </button>
          </div>
        </div>
        <div
          v-if="extendedForm"
          data-cy="extended-form"
          class="fr-grid-row fr-grid-row--gutters fr-mt-3v align-items-center"
        >
          <div class="fr-col-12 fr-col-md-6 fr-col-lg-5 row-inline">
            <Rangepicker
              :value="facets.temporal_coverage"
              :onChange="handleSuggestorChange('temporal_coverage')"
            />
          </div>
          <div class="fr-col-12 fr-col-md-3">
            <MultiSelect
              :placeholder="$t('Geographic area')"
              :searchPlaceholder="$t('Search a geographic area...')"
              suggestUrl="/spatial/zones/suggest/"
              entityUrl="/spatial/zone/"
              :values="facets.geozone"
              :onChange="handleSuggestorChange('geozone')"
            />
          </div>
          <div class="fr-col-12 fr-col-md-3">
            <MultiSelect
              :placeholder="$t('Territorial granularity')"
              :searchPlaceholder="$t('Search a granularity...')"
              listUrl="/spatial/granularities/"
              :values="facets.granularity"
              :onChange="handleSuggestorChange('granularity')"
            />
          </div>
        </div>
      </div>
      <div class="fr-my-9v text-align-center fr-hidden-md">
        <button
          class="fr-btn fr-btn--secondary fr-btn--secondary-grey-400"
          @click="extendedForm = !extendedForm"
        >{{ $t("Submit") }}</button>
      </div>
    </section>
  </form>
  <section class="search-results fr-mt-1w fr-mt-md-3w" ref="resultsRef" v-bind="$attrs">
    <transition mode="out-in">
      <div v-if="loading">
        <Loader />
      </div>
      <ul v-else-if="results.length">
        <li v-for="result in results" :key="result.id">
          <a :href="result.page" class="unstyled w-10 block">
            <Dataset v-bind="result" />
          </a>
        </li>
        <Pagination
          v-if="totalResults > pageSize"
          :page="currentPage"
          :pageSize="pageSize"
          :totalResults="totalResults"
          :changePage="changePage"
          class="fr-mt-2w"
        />
      </ul>
      <div v-else>
        <Empty
          wide
          :queryString="queryString"
          :cta="$t('Reset filters')"
          :copy="$t('No dataset matching your query')"
          :copyAfter="
            $t('You can try to reset the filters to expand your search.')
          "
          :onClick="() => resetFilters()"
        />
      </div>
    </transition>
  </section>
</template>

<script>
import { defineComponent, ref, Ref, onMounted, computed, watch } from "vue";
import {useI18n} from 'vue-i18n';
import axios from "axios";
import { generateCancelToken, api } from "../../plugins/api";
import {useToast} from "../../composables/useToast";
import useSearchUrl from "../../composables/useSearchUrl";
import SearchInput from "./search-input.vue";
import Suggestor from "./suggestor.vue";
import Rangepicker from "./rangepicker.vue";
import Dataset from "../dataset/search-result.vue";
import Loader from "../dataset/loader.vue";
import Empty from "./empty.vue";
import Pagination from "../pagination/pagination.vue";
import filterIcon from "svg/filter.svg";
import MultiSelect from "./multi-select.vue";

export default defineComponent({
  components: {
    MultiSelect,
    SearchInput,
    Rangepicker,
    Suggestor,
    Dataset,
    Empty,
    Loader,
    Pagination,
  },
  props: {
    disableFirstSearch: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const toast = useToast();
    /**
     * Update search params from URL on page load for deep linking
     */
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    
    /**
     * Search query
     */
    const queryString = ref('');

    const {reuseUrl} = useSearchUrl(queryString);

    /**
     * Search results
     */
    const results = ref([]);

    /**
     * Count of search results
     */
    const totalResults = ref(0);

    /**
     * Current page of results
     */
    const currentPage = ref(0);

    /**
     * Search page size
     */
    const pageSize = 20;

    /**
     * All other params are kept here as facets
     */
    const facets = ref(null);

    /**
     * Search loading state
     */
    const loading = ref(false);

    /**
     * Current request if any to be cancelled if a new one comes
     */
    const currentRequest = ref(null);

    /**
     * Vue ref to results HTML
     * @type {Ref<HTMLElement | null>}
     */
    const resultsRef = ref(null);

    /**
     * Vue ref to results HTML
     * @type {Ref<HTMLElement | null>}
     */
    const searchRef = ref(null);

    /**
     * Track form extended state
     * On desktop, extended form is simply another row of filters.
     * On mobile, form is hidden until extendedForm is triggered.
     */
    const extendedForm = ref(false);

    /**
     * Search new dataset results
     */
    const search = () => {
      loading.value = true;
      if (currentRequest.value) currentRequest.value.cancel();

      currentRequest.value = generateCancelToken();

      api
        .get("/datasets/", {
          cancelToken: currentRequest.value.token,
          params: {
            q: queryString.value,
            ...facets.value,
            page_size: pageSize,
            page: currentPage.value,
          },
        })
        .then((res) => res.data)
        .then((result) => {
          results.value = result.data;
          totalResults.value = result.total;
          loading.value = false;
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            toast.error(t("Error getting search results."));
            loading.value = false;
          }
        });
    }

    const handleSearchChange = (input) => {
      queryString.value = input;
      currentPage.value = 1;
      search();
    };
    
    /**
     * Called on every facet selector change, updates the `facets.xxx` object then searches with new values 
     */
    const handleSuggestorChange = (facet) => {
      return (values) => {
        // Values can either be an array of varying length, or a String.
        if (Array.isArray(values)) {
          if (values.length > 1)
            facets.value[facet] = values.map((obj) => obj.value);
          else if (values.length === 1) facets.value[facet] = values[0].value;
          else facets.value[facet] = null;
        } else {
          facets.value[facet] = values;
        }
        currentPage.value = 1;
        search();
      };
    };

    /**
     * Change current page
     * @param {number} page
     */
    const changePage = (page) => {
      currentPage.value = page;
      search();
      scrollToTop();
    };
    
    const scrollToTop = () => {
      if (searchRef.value) {
        searchRef.value.scrollIntoView({ behavior: "smooth" });
      }
    };

    const resetFilters = () => {
      queryString.value = "";
      facets.value = {};
      currentPage.value = 1;
      search();
    };

    /**
     * Is any filter active ?
     */ 
    const isFiltered = computed(() => {
      return Object.keys(facets.value).some(
        (key) => facets.value[key]?.length > 0
      );
    });

    const paramUrl = computed(() => {
      /**
       *  @type Record<string, string>
       */
      let params = {};
      for (key in facets.value) {
        if(facets.value[key]) {
          params[key] = facets.value[key];
        }
      }
      if (currentPage.value > 1) params.page = currentPage.value.toString();
      if (queryString.value) params.q = queryString.value;
      return params;
    });

    if (params.has('q')) {
      queryString.value = params.get('q');
      params.delete('q');
    }
    if (params.has('page')) {
      currentPage.value = parseInt(params.get('page'));
      params.delete('page');
    }

    watch(paramUrl, (val) => {
        // Update URL to match current search params value for deep linking
        let url = new URL(window.location.href);
        url.search = new URLSearchParams(val).toString();
        history.pushState(null, "", url);
      }, {deep: true});

    /**
     * @type {Ref<{organization: ?string, tag: ?string, license: ?string, format: ?string, temporal_coverage: ?string, geozone: ?string, granularity: ?string}>}
     */
    facets.value = Object.fromEntries(params);
    if (props.disableFirstSearch) {
      loading.value = true;
    } else {
      search();
    }
    onMounted(() => {
      if (props.disableFirstSearch && resultsRef.value) {
        if (parseInt(resultsRef.value.dataset.totalResults) > 0) {
          results.value = JSON.parse(resultsRef.value.dataset.results);
          totalResults.value = JSON.parse(resultsRef.value.dataset.totalResults);
        }
        loading.value = false;
      }
    });

    return {
      reuseUrl,
      isFiltered,
      search,
      handleSearchChange,
      handleSuggestorChange,
      changePage,
      resetFilters,
      filterIcon,
      extendedForm,
      facets,
      results,
      totalResults,
      queryString,
      loading,
      pageSize,
      currentPage,
      resultsRef,
      searchRef,
    };
  },
});
</script>
