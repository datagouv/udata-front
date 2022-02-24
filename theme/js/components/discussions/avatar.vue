<template>
  <div class="avatar">
    <img :src="avatarUrl" alt="" />
  </div>
</template>

<script>
import useUserAvatar from "../../composables/useUserAvatar";

export default {
  props: {
    user: Object,
  },
  setup(props) {
    const avatarUrl = useUserAvatar(props.user);
    return {
      avatarUrl
    }
  },
};
</script>
