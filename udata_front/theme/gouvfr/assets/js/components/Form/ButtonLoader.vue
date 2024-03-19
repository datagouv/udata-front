<script>
  import { defineComponent } from "vue";
  import { ContentLoader } from "vue-content-loader";

  export default defineComponent({
    components: { ContentLoader },
    props: {
      width: {
        type: Number,
        default: 80,
      }
    }
  });
</script>

<template>
  <content-loader
    :width="width"
    height="40"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="21" ry="21" :width="width" height="40" />
  </content-loader>
</template>
