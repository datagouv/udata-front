<script>
  import { defineComponent } from "vue";
  import { ContentLoader } from "vue-content-loader";

  export default defineComponent({
    components: { ContentLoader }
  });
</script>

<template>
  <content-loader
    width="88"
    height="40"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <circle cx="20" cy="20" r="20" />
    <circle cx="68" cy="20" r="20" />
  </content-loader>
</template>
