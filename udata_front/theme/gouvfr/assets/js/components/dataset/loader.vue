<template>
  <ContentLoader
    :width="1200"
    :height="height * pageSize"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <template v-for="i in pageSize">
      <rect x="20" :y="getPosition(i, 24)" rx="4" ry="4" width="16" height="16" />
      <rect x="52" :y="getPosition(i, 20)" rx="4" ry="4" width="536" height="22" />
      <rect x="52" :y="getPosition(i, 52)" rx="4" ry="4" width="374" height="16" />
      <rect x="1052" :y="getPosition(i, 30)" rx="4" ry="4" width="80" height="20" />
      <rect x="1154" :y="getPosition(i, 20)" rx="20" ry="20" width="40" height="40" />
    </template>
  </ContentLoader>
</template>

<script>
import { defineComponent } from "vue";
import { ContentLoader } from "vue-content-loader";
import config from "../../config";

export default defineComponent({
  components: {
    ContentLoader,
  },
  setup(props) {
    const pageSize = config.resources_default_page_size;
    const height = 88;
    const getPosition = (i, y) => (i - 1) * height + y;
    return {
      pageSize,
      height,
      getPosition,
    };
  }
});
</script>
