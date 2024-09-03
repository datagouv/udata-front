<template>
  <ReuseCard :reuse :reuseUrl="reuse.page" :organizationUrl="reuse.organization?.page" />
</template>

<script setup lang="ts">
import  { ReuseCard, type Reuse } from '@datagouv/components';

defineProps<{
  reuse: Reuse,
}>();
</script>
