<template>
  <div class="avatar">
    <img
      :class="{'rounded-circle border border-default-grey': rounded}"
      :src="avatarUrl"
      :width="size"
      :height="size"
      loading="lazy"
      alt=""
    />
  </div>
</template>
<script lang="ts">
import type { User } from "@datagouv/components/ts";
export type AvatarProps = {
  user: User,
  rounded?: boolean,
  size?: number,
};
</script>
<script setup lang="ts">
import useUserAvatar from "../../../composables/useUserAvatar";

const props = withDefaults(defineProps<AvatarProps>(), {
  rounded: false,
  size: 40,
});
const avatarUrl = useUserAvatar(props.user, props.size);
</script>
