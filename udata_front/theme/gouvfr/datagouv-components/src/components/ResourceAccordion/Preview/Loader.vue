<template>
  <ContentLoader :width="1124" :height="300" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="16" y="16" rx="4" ry="4" width="112" height="24" />
    <rect x="160" y="16" rx="4" ry="4" width="116" height="24" />
    <rect x="308" y="16" rx="4" ry="4" width="140" height="24" />
    <rect x="480" y="16" rx="4" ry="4" width="106" height="24" />
    <rect x="618" y="16" rx="4" ry="4" width="140" height="24" />
    <rect x="790" y="16" rx="4" ry="4" width="144" height="24" />
    <rect x="966" y="16" rx="4" ry="4" width="142" height="24" />
    <rect x="4" y="56" rx="4" ry="4" width="1116" height="4" />

    <template v-for="n in 5">
      <rect x="16" :y="getY(n)" rx="4" ry="4" width="112" height="32" />
      <rect x="160" :y="getY(n)" rx="4" ry="4" width="116" height="32" />
      <rect x="308" :y="getY(n)" rx="4" ry="4" width="140" height="32" />
      <rect x="480" :y="getY(n)" rx="4" ry="4" width="106" height="32" />
      <rect x="618" :y="getY(n)" rx="4" ry="4" width="140" height="32" />
      <rect x="790" :y="getY(n)" rx="4" ry="4" width="144" height="32" />
      <rect x="966" :y="getY(n)" rx="4" ry="4" width="142" height="32" />
    </template>
  </ContentLoader>
</template>

<script setup lang="ts">
import { ContentLoader } from "vue-content-loader";

function getY(row: number) {
  const topMargin = 16;
  const borderHeight = 4;
  const cellHeight = 32;
  const gapHeight = 24;
  return topMargin + borderHeight + row * (cellHeight + gapHeight);
}
</script>
