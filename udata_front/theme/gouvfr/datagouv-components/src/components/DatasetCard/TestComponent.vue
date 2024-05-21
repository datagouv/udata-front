<template>
  <div>You've successfully accessed the item number {{ itemId }}</div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const itemId = route.params.id;
</script>
