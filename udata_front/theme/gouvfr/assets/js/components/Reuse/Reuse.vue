<template>
  <ReuseCard :reuse :reuseUrl="reuse.page" />
</template>

<script setup lang="ts">
import  { ReuseCard, type Reuse } from '@datagouv/components/ts';

defineProps<{
  reuse: Reuse,
}>();
</script>
