<template>
  <article class="dataset-card compact">
    <div class="card-logo">
      <Placeholder type="reuse" :src="image_url" :alt="title" />
      <div class="logo-badge">
        <span v-html="lock" v-if="private" />
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
import lock from "svg/private.svg";
import useOrganizationCertified from "../../composables/useOrganizationCertified";

export default {
  components: {
    Placeholder,
  },
  props: {
    title: String,
    image_url: String,
    organization: Object,
    private: Boolean,
  },
  setup(props) {
    const {organizationCertified} = useOrganizationCertified(props.organization)
    return {
      certified,
      lock,
      organizationCertified,
    };
  }
};
</script>
