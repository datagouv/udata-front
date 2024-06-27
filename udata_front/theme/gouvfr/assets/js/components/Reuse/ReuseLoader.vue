<template>
    <ContentLoader
      viewBox="0 0 350 350"
      :speed="2"
      primaryColor="#EEEEEE"
      secondaryColor="#ecebeb"
    >
    <rect x="0" y="0" rx="0" ry="0" width="350" height="200" /> 
    <rect x="10" y="240" rx="0" ry="0" width="240" height="15" /> 
    <rect x="10" y="280" rx="0" ry="0" width="325" height="12" /> 
    <rect x="10" y="320" rx="0" ry="0" width="325" height="12" /> 
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
  