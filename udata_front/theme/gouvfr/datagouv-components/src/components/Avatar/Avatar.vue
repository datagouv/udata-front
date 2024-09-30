<template>
  <img
    :class="{'rounded-circle border border-default-grey': rounded}"
    :src="avatarUrl"
    :width="size"
    :height="size"
    loading="lazy"
    alt=""
  />
</template>

<script setup lang="ts">
import useUserAvatar from "../../composables/useUserAvatar";
import type { User } from "../../types/users";
type Props = {
  rounded?: boolean;
  size?: number;
  user: User;
}
const props = withDefaults(defineProps<Props>(), {
  rounded: false,
  size: 40,
});
const avatarUrl = useUserAvatar(props.user, props.size);
</script>
