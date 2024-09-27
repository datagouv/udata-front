<template>
  <Avatar v-bind="$attrs" :user="user" :size :rounded="true" />
  <span class="fr-ml-1v fr-text--bold">
    {{ user.first_name }}
    {{ user.last_name }}
  </span>
</template>

<script setup lang="ts">
import type { User } from '../../types/users';
import Avatar from './Avatar.vue';

withDefaults(defineProps<{
  user: User;
  size?: number;
}>(), {
  size: 12
});
</script>
