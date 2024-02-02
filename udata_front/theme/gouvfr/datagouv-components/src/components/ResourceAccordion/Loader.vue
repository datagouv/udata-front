<template>
  <ContentLoader
    :width="1200"
    :height="height"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
      <rect x="20" y="24" rx="4" ry="4" width="16" height="16" />
      <rect x="52" y="20" rx="4" ry="4" width="536" height="22" />
      <rect x="52" y="52" rx="4" ry="4" width="374" height="16" />
      <rect x="1052" y="30" rx="4" ry="4" width="80" height="20" />
      <rect x="1154" y="20" rx="20" ry="20" width="40" height="40" />
  </ContentLoader>
</template>

<script setup lang="ts">
import { ContentLoader } from "vue-content-loader";

const height = 88;
</script>
