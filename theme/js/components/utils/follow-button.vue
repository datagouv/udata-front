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
    class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 follow-button"
    :disabled="readOnlyEnabled"
  >
      <span
        class="magic fr-grid-row"
        :class="{ active: animating }"
        :style="{ color: _following ? 'inherit' : 'transparent' }"
      >
      <svg aria-hidden="true" width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.20703 1.24224L5.42968 4.87896L1.41015 5.45318C0.699214 5.56255 0.425776 6.43755 0.945308 6.95709L3.8164 9.77349L3.13281 13.7383C3.02343 14.4493 3.78906 14.9961 4.41796 14.668L8 12.7813L11.5547 14.668C12.1836 14.9961 12.9492 14.4493 12.8398 13.7383L12.1562 9.77349L15.0273 6.95709C15.5469 6.43755 15.2734 5.56255 14.5625 5.45318L10.5703 4.87896L8.76562 1.24224C8.46484 0.613336 7.53515 0.585992 7.20703 1.24224Z" stroke="#3558A2"/>
      </svg>
      </span>
      <span class="fr-ml-1w">
        <template v-if="_following">{{ $t("Remove from favourites") }}</template>
        <template v-else>{{ $t("Add to favourites") }}</template>
      </span>
  </button>
</template>

<script>
import {defineComponent} from "vue";
import config from "../../config";

export default defineComponent({
  props: {
    followers: Number,
    url: String,
    following: Boolean,
  },
  data() {
    return {
      loading: false,
      _following: this.following,
      animating: false,
      readOnlyEnabled: config.read_only_enabled,
    };
  },
  methods: {
    toggleFollow() {
      this.$auth();
      let request;

      if (!this._following) request = this.$api.post(this.url);
      else request = this.$api.delete(this.url);

      request
        .then(() => {
          this._following = !this._following;
          if (this._following) {
            this.animating = true;
            setTimeout(() => (this.animating = false), 1300);
          }
        });
    },
  },
});
</script>
