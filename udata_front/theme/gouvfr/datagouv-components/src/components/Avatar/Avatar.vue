<template>
  <div class="avatar">
    <img
      :src="avatarUrl"
      :width="size"
      :height="size"
      loading="lazy"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import useUserAvatar from "../../composables/useUserAvatar";
import type { User } from "../../types/users";
type Props = {
    user: User;
    size?: number;
}
const props = withDefaults(defineProps<Props>(), {
  size: 40,
});
const avatarUrl = useUserAvatar(props.user, props.size);
</script>
