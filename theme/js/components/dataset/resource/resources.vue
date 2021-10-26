<template>
<section class="resources-wrapper" ref="top" key="top">
    <transition mode="out-in">
      <div v-if="loading" key="loader">
        <Loader class="mt-md" />
      </div>
      <div v-else>
          <ul>
            <li
              :id="'resource-' + resource.id"
              v-for="resource in resources"
            >
              <resource :resource="resource" :type="type" :type-label="typeLabel"/>
            </li>
          </ul>
          <pagination
            class="fr-mt-3w"
            v-if="total_results > page_size"
            :page="current_page"
            :page_size="page_size"
            :total_results="total_results"
            :changePage="changePage"
            light
          />
      </div>
    </transition>
  </section>
</template>

<script>
import Loader from "../loader.vue";
import Pagination from "../../pagination/pagination.vue";
import Resource from "./resource.vue";
import config, {resources_default_page_size} from "../../../config";

export default {
  name: "resources",
  components: {
    Loader,
    Pagination,
    Resource,
  },
  data() {
    return {
      resources: [],
      current_page: 1,
      page_size: config.resources_default_page_size,
      total_results: 0,
      loading: true,
      readOnlyEnabled: config.read_only_enabled,
    };
  },
  props: {
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
  mounted() {
    this.loadPage(this.current_page);
  },
  methods: {
     changePage(index, scroll = true) {
      this.current_page = index;
      this.loadPage(index, scroll);
    },
    loadPage(page = 1, scroll = false) {
      console.log("Loading page", page);
      this.loading = true;

      // We can pass the second function parameter "scroll" to true if we want to scroll to the top of the resources section
      // This is useful for pagination buttons
      if (this.$refs.top && scroll)
        this.$refs.top.scrollIntoView({ behavior: "smooth" });

      return this.$apiv2
        .get("/datasets/" + this.datasetId + "/resources/", {
          params: {
            page,
            page_size: this.page_size,
          },
        })
        .then((resp) => resp.data)
        .then((data) => {
          console.log(data)
          if (data.data) {
            this.resources = data.data;
            this.total_results = data.total;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(
            this.$t("An error occurred while fetching resources")
          );
          this.discussion = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
  }
}
</script>

<style scoped>

</style>
