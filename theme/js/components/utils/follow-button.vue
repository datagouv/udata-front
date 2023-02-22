<!--
---
name: Follow
category: 5 - Interactions
---

# Follow button

A simple button to follow various entities on the website.
The `following` prop allow to pass the current state (user is already following or user is not following) and makes the component react accordingly on click (follow/unfollow)
`followers` is the number of current followers
The `url` prop is the API URL.
-->

<template>
  <button
    @click.prevent="toggleFollow"
    type="button"
    class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 follow-button"
    :disabled="readOnlyEnabled"
  >
      <span
        class="magic fr-grid-row"
        :class="{ active: animating }"
        :style="{ color: following ? 'inherit' : 'transparent' }"
      >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.20703 1.24224L5.42968 4.87896L1.41015 5.45318C0.699214 5.56255 0.425776 6.43755 0.945308 6.95709L3.8164 9.77349L3.13281 13.7383C3.02343 14.4493 3.78906 14.9961 4.41796 14.668L8 12.7813L11.5547 14.668C12.1836 14.9961 12.9492 14.4493 12.8398 13.7383L12.1562 9.77349L15.0273 6.95709C15.5469 6.43755 15.2734 5.56255 14.5625 5.45318L10.5703 4.87896L8.76562 1.24224C8.46484 0.613336 7.53515 0.585992 7.20703 1.24224Z" stroke="#161616"/>
      </svg>
      </span>
      <span class="fr-ml-1w">
        <template v-if="following">{{ $t("Remove from favourites") }}</template>
        <template v-else>{{ $t("Add to favourites") }}</template>
      </span>
  </button>
</template>

<script>
import { defineComponent, ref } from "vue";
import config from "../../config";
import { api } from "../../plugins/api";
import { auth } from "../../plugins/auth";

export default defineComponent({
  props: {
    followers: Number,
    url: {
      type: String,
      required: true,
    },
    following: Boolean,
  },
  setup(props) {
    const animating = ref(false);
    const following = ref(props.following);
    const readOnlyEnabled = config.read_only_enabled;

    const toggleFollow = () => {
      auth();
      let request;

      if (!following.value) request = api.post(props.url);
      else request = api.delete(props.url);

      request
        .then(() => {
          following.value = !following.value;
          if (following.value) {
            animating.value = true;
            setTimeout(() => (animating.value = false), 1300);
          }
        });
    };

    return {
      following,
      animating,
      readOnlyEnabled,
      toggleFollow,
    };
  },
});
</script>
