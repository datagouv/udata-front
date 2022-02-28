<template>
  <article class="dataset-card compact">
    <div class="card-logo">
      <Placeholder type="dataset" :src="imageUrl" :alt="title" />
      <div class="logo-badge">
        <span v-html="privateIcon" v-if="private" />
        <span v-html="certified" v-else-if="organizationCertified" />
      </div>
    </div>
    <div class="card-data">
      <h3 class="card-body h4">
        {{ title }}
      </h3>
      <div class="card-footer">
        <ul class="card-features fs-xs"></ul>
      </div>
    </div>
  </article>
</template>

<script>
import Placeholder from "../utils/placeholder";
import certified from "svg/certified.svg";
import privateIcon from "svg/private.svg";
import useOrganizationCertified from "../../composables/useOrganizationCertified";
import useUserAvatar from "../../composables/useUserAvatar";

export default {
  created() {
    this.certified = certified;
    this.privateIcon = privateIcon;
    this.imageUrl = this.organization ? this.organization.logo_thumbnail : useUserAvatar(this.owner, 100);
    this.organizationCertified = this.organization ? useOrganizationCertified(this.organization) : false;
  },
  data() {
    return {
      imageUrl: null,
    };
  },
  props: {
    title: String,
    organization: Object,
    owner: Object,
    private: Boolean,
  },
  components: {
    Placeholder,
  },
};
</script>
