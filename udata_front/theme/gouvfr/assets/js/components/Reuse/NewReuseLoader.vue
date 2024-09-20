<template>
    <ContentLoader
      viewBox="0 0 350 350"
      :speed="2"
      primaryColor="#eeeeee"
      secondaryColor="#ecebeb"
    >
    <rect x="1" y="-7" rx="0" ry="0" width="375" height="328" /> 
    <rect x="16" y="341" rx="0" ry="0" width="261" height="16" /> 
    <rect x="16" y="365" rx="0" ry="0" width="206" height="16" /> 
    <rect x="16" y="389" rx="0" ry="0" width="157" height="16" />
    </ContentLoader>
  </template>
  
  <script>
  import { ContentLoader } from "vue-content-loader";
  
  export default {
    components: {
      ContentLoader,
    },
  };
  </script>
  