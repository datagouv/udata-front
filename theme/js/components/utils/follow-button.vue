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
        v-html="icon"
        class="magic fr-grid-row"
        :class="{ active: animating }"
        :style="{ color: _following ? 'inherit' : 'transparent' }"
      ></span>
      <span class="fr-ml-1w">
        <template v-if="_following">{{ $t("Remove from favourites") }}</template>
        <template v-else>{{ $t("Add to favourites") }}</template>
      </span>
  </button>
</template>

<script>
import {defineComponent} from "vue";
import config from "../../config";
import icon from "bundle-text:svg/actions/star.svg";

export default defineComponent({
  props: {
    followers: Number,
    url: String,
    following: Boolean,
  },
  created() {
    this.icon = icon;
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
