<template>
  <article class="fr-my-3w fr-p-3w border border-default-grey fr-enlarge-link" :style="style">
    <div class="absolute top-0 fr-grid-row fr-grid-row--middle fr-mt-n3v" v-if="private || archived">
      <p class="fr-badge fr-badge--mention-grey fr-mr-1w" v-if="private">
        <span class="fr-icon-lock-line" aria-hidden="true"></span>
        {{ $t('Private') }}
      </p>
      <p class="fr-badge fr-badge--mention-grey" v-if="archived">
        <span class="fr-icon-archive-line" aria-hidden="true"></span>
        {{ $t('Archived') }}
      </p>
    </div>
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
        <h4 class="fr-mb-1v fr-grid-row">
          <a :href="page" class="text-grey-500">
            {{ title }}
            <small v-if="acronym">{{ acronym }}</small>
          </a>
          <p
            v-if="private"
            class="fr-my-0 badge grey-300 fr-ml-1w"
          >
            {{ $t('Private') }}
        </p>
        </h4>
        <p class="fr-m-0 not-enlarged" v-if="organization || owner">
          {{ $t('From') }}
          <a :href="organization.page" v-if="organization">
              <OrganizationNameWithCertificate :organization="organization" />
          </a>
          <template v-if="owner">{{ownerName}}</template>
        </p>
        <p class="fr-mt-1w fr-mb-2w fr-hidden fr-unhidden-sm">
          {{ $filters.excerpt(description, 160) }}
        </p>
        <p class="fr-mb-0 fr-grid-row fr-grid-row--middle text-mention-grey">
          <Tooltip class="fr-hidden fr-grid-row fr-grid-row--middle fr-unhidden-sm">
              <template #tooltip>
                <h5 class="fr-text--sm fr-my-0">{{$t("Metadata quality:")}}</h5>
                <QualityItem
                  :passed="quality.dataset_description_quality"
                  :messagePassed='$t("Data description filled")'
                  :messageFailed='$t("Data description empty")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="quality.resources_documentation"
                  :messagePassed='$t("Resources documented")'
                  :messageFailed='$t("Resources documentation missing")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="quality.license"
                  :messagePassed='$t("License filled")'
                  :messageFailed='$t("No license set")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="quality.update_frequency && !!quality.update_fulfilled_in_time"
                  :messagePassed='$t("Update frequency followed")'
                  :messageFailed='quality.update_frequency ? $t("Update frequency not followed") : $t("Update frequency not set")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="quality.has_open_format"
                  :messagePassed='$t("File formats are open")'
                  :messageFailed='$t("File formats are closed")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="quality.temporal_coverage"
                  :messagePassed='$t("Temporal coverage filled")'
                  :messageFailed='$t("Temporal coverage not set")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="quality.spatial"
                  :messagePassed='$t("Spatial coverage filled")'
                  :messageFailed='$t("Spatial coverage not set")'
                  class="fr-my-1w"
                />
                <div class="fr-grid-row fr-grid-row--right not-enlarged">
                  <a
                    href="https://guides.etalab.gouv.fr/qualite/documenter-les-donnees/#le-score-de-qualite-des-metadonnees"
                    target="_blank"
                  >
                    {{$t("Learn more about this indicator")}}
                  </a>
                </div>
              </template>
              <span class="fr-icon-info-line" aria-hidden="true"></span>
              <p class="fr-m-0 fr-mx-1v">
                {{$t('Metadata quality:')}}
              </p>
              <QualityScore :score="quality.score"/>
          </Tooltip>
          <span class="fr-hidden inline-sm fr-mx-1v">
            &mdash;
          </span>
          {{ $t('Updated on {date}', {date: $filters.formatDate(last_update)}) }}
        </p>
      </div>
      <ul class="fr-hidden fr-unhidden-sm fr-hidden-md fr-unhidden-lg fr-col-auto fr-tags-group fr-grid-row--bottom self-center flex-direction-column">
        <li>
          <p class="fr-tag">
            <i18n-t keypath="{n} reuses" :plural="metrics.reuses || 0" scope="global">
              <template #n>
                <strong class="fr-mr-1v">{{metrics.reuses || 0}}</strong>
              </template>
            </i18n-t>
          </p>
        </li>
        <li>
          <p class="fr-tag">
            <i18n-t keypath="{n} favorites" :plural="metrics.followers || 0" scope="global">
              <template #n>
                <strong class="fr-mr-1v">{{metrics.followers}}</strong>
              </template>
            </i18n-t>
          </p>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import { defineComponent, computed, ComputedRef } from "vue";
import useLicense from "../../composables/useLicense";
import useOwnerName from "../../composables/useOwnerName";
import Avatar from "../discussions/avatar.vue";
import OrganizationNameWithCertificate from "../organization/organization-name-with-certificate.vue";
import Placeholder from "../utils/placeholder.vue";
import QualityScore from "./quality-score.vue";
import Tooltip from "../utils/tooltip.vue";
import QualityItem from "./quality-item.vue";

export default defineComponent({
  components: {
    Avatar,
    OrganizationNameWithCertificate,
    Placeholder,
    QualityScore,
    Tooltip,
    QualityItem,
},
  inheritAttrs: false,
  props: {
    acronym: String,
    archived: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    last_update: {
      type: Date,
      required: true,
    },
    license: {
      type: String,
      required: true,
    },
    metrics: Object,
    organization: Object,
    owner: Object,
    page: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      default: false,
    },
    quality: {
      type: Object,
      required: true,
    },
    resources: Object,
    style: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      required: true,
    },
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
      ownerName,
    };
  }
});
</script>
