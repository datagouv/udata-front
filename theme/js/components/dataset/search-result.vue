<template>
  <article class="fr-pt-5v fr-pb-6v border-bottom border-default-grey fr-enlarge-link">
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--top">
      <div class="fr-col-auto">
          <div class="logo">
            <Placeholder
              v-if="organization"
              type="dataset"
              :src="organization.logo_thumbnail"
              :alt="organization.name"
              :size="60"
            />
            <Avatar
              v-else-if="owner"
              :user="owner"
              :size="60"
            />
            <Placeholder
              v-else
              type="dataset"
            />
          </div>
      </div>
      <div class="fr-col">
        <h4 class="fr-mb-1v">
          <a :href="page" class="text-grey-500">
            {{ title }}
            <small v-if="acronym">{{ acronym }}</small>
          </a>
          <span
            v-if="private"
            class="badge grey-300 fr-ml-1w"
          >
            {{ $t('Private') }}
          </span>
        </h4>
        <p class="fr-m-0 not-enlarged" v-if="organization || owner">
          {{ $t('From') }} 
          <a :href="page" v-if="organization">
              <OrganizationNameWithCertificate :organization="organization" />
          </a>
          <template v-if="owner">{{ownerName}}</template>
        </p>
        <p class="fr-mt-1w fr-mb-2w">
          {{ $filters.excerpt(description) }}
        </p>
        <p class="fr-mb-0">
          <!-- TODO : useExternalSource et !externalSource -->
          <template v-if="true">
            {{ $t('Updated on {date}', {date: $filters.formatDate(last_modified)}) }}
              <template v-if="license">
                &mdash;
              </template>
          </template>
          <template v-if="license">
            <span class="not-enlarged" v-if="license.url">
              <a :href="license.url" class="text-mention-grey text-decoration-underline">
                {{license.title}}
              </a>
            </span>
            <template v-else>
              {{license.title}}
            </template>
          </template>
        </p>
      </div>
      <ul class="fr-col-auto fr-tags-group flex-direction-column fr-grid-row--bottom self-center">
            <li>
              <span class="fr-tag">
                <i18n-t keypath="{n} reuses" :plural="resources.length || 0" scope="global">
                  <template #n>
                    <strong class="fr-mr-1v">{{resources.length || 0}}</strong>
                  </template>
                </i18n-t>
                </span>
            </li>
            <li>
              <span class="fr-tag">
                <i18n-t keypath="{n} favorites" :plural="metrics.followers || 0" scope="global">
                  <template #n>
                    <strong class="fr-mr-1v">{{metrics.followers}}</strong>
                  </template>
                </i18n-t>
              </span>
            </li>
        </ul>
    </div>
  </article>
</template>

<script>
import { defineComponent, computed, ComputedRef } from "vue";
import lock from "svg/private.svg";
import useLicense from "../../composables/useLicense";
import useOwnerName from "../../composables/useOwnerName";
import Avatar from "../discussions/avatar.vue";
import OrganizationNameWithCertificate from "../organization/organization-name-with-certificate.vue";
import Placeholder from "../utils/placeholder.vue";

export default defineComponent({
  props: {
    acronym: String,
    description: {
      type: String,
      required: true,
    },
    last_modified: {
      type: Date,
      required: true,
    },
    license: {
      type: String,
      required: true,
    },
    metrics: Object,
    /** @type {?{name: string}} */
    organization: Object,
    owner: Object,
    page: {
      type: String,
      required: true,
    },
    private: Boolean,
    resources: Object,
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    Avatar,
    OrganizationNameWithCertificate,
    Placeholder,
  },
  setup(props) {
    /** @type {ComputedRef<import("../../composables/useOwnerName").Owned>} */
    const owned = computed(() => {
      let owned = {};
      if(props.organization) {
        owned.organization = props.organization;
      }
      if(props.owner) {
        owned.owner = props.owner;
      }
      return owned;
    });
    const ownerName = useOwnerName(owned);
    const license = useLicense(props.license);
    return {
      license,
      lock,
      ownerName,
    };
  }
});
</script>
