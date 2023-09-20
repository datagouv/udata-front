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
            :size="60"
          />
        </div>
      </div>
      <div class="fr-col">
        <h4 class="fr-mb-1v fr-grid-row">
          <a :href="page" class="text-grey-500">
            {{ title }}
            <small v-if="acronym">{{ acronym }}</small>
          </a>
        </h4>
        <p class="fr-m-0 fr-text--sm" v-if="organization || owner">
          {{ $t('From') }}
          <span class="not-enlarged" v-if="organization">
            <a class="fr-link" :href="organization.page">
              <OrganizationNameWithCertificate :organization="organization" />
            </a>
          </span>
          <template v-if="owner">{{ownerName}}</template>
        </p>
        <p class="fr-mt-1w fr-mb-2w fr-hidden fr-unhidden-sm overflow-wrap-anywhere">
          {{ excerpt(description, 500) }}
        </p>
        <div class="fr-m-0 fr-grid-row fr-grid-row--middle fr-text--sm text-mention-grey">
          <div class="fr-grid-row fr-grid-row--middle fr-hidden flex-sm dash-after text-grey-500 not-enlarged">
            <Toggletip
              class="fr-btn fr-btn--tertiary-no-outline fr-btn--secondary-grey-500 fr-icon-info-line"
            >
              {{$t('Metadata quality:')}}
              <template #toggletip>
                <h5 class="fr-text--sm fr-my-0">{{$t("Metadata quality:")}}</h5>
                <QualityItem
                  :passed="quality.dataset_description_quality"
                  :messagePassed='$t("Data description filled")'
                  :messageFailed='$t("Data description empty")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="quality.resources_documentation"
                  :messagePassed='$t("Files documented")'
                  :messageFailed='$t("Files documentation missing")'
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
                <QualityItem
                  :passed="quality.all_resources_available"
                  :messagePassed='$t("All files are available")'
                  :messageFailed='$t("Some files are unavailable")'
                  class="fr-my-1w"
                />
                <div class="fr-grid-row fr-grid-row--right not-enlarged">
                  <a
                    :href="guides_quality_url"
                    target="_blank"
                    rel="noopener"
                    :title="$t('Learn more about this indicator - opens a new window')"
                  >
                    {{$t("Learn more about this indicator")}}
                  </a>
                </div>
              </template>
            </Toggletip>
            <p class="fr-m-0 fr-mr-1v" :id="id">
              {{$t('Metadata quality:')}}
            </p>
            <div class="fr-grid-row fr-grid-row--middle fr-mr-1v">
              <QualityScore :score="quality.score"/>
            </div>
          </div>
          <p class=fr-m-0>{{ $t('Updated {date}', {date: formatRelativeIfRecentDate(last_update)}) }}</p>
        </div>
      </div>
      <ul v-if="showMetrics" class="fr-hidden fr-unhidden-sm fr-hidden-md fr-unhidden-lg fr-col-auto fr-tags-group fr-grid-row--bottom self-center flex-direction-column">
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
                <strong class="fr-mr-1v">{{metrics.followers || 0}}</strong>
              </template>
            </i18n-t>
          </p>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import { defineComponent, computed } from "vue";
import useLicense from "../../composables/useLicense";
import useOwnerName from "../../composables/useOwnerName";
import useUid from "../../composables/useUid";
import Avatar from "../discussions/avatar.vue";
import OrganizationNameWithCertificate from "../organization/organization-name-with-certificate.vue";
import Placeholder from "../utils/placeholder.vue";
import QualityScore from "./quality-score.vue";
import Toggletip from "../utils/Toggletip/Toggletip.vue";
import QualityItem from "./quality-item.vue";
import { excerpt, formatRelativeIfRecentDate } from "../../helpers";
import { guides_quality_url } from "../../config";

export default defineComponent({
  components: {
    Avatar,
    OrganizationNameWithCertificate,
    Placeholder,
    QualityScore,
    Toggletip,
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
    organization: {
      /** @type {import("vue").PropType<import("../../types").Organization>} */
      type: Object
    },
    owner: {
      /** @type {import("vue").PropType<import("../../types").User>} */
      type: Object,
    },
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
    showMetrics: {
      type: Boolean,
      default: true,
    },
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
    /** @type {import("vue").ComputedRef<import("../../types").Owned>} */
    const owned = computed(() => {
      if(props.organization) {
        return { organization: props.organization };
      } else {
        return { owner: /** @type {import("../../types").User} */ (props.owner) };
      }
    });
    const {id} = useUid("metadata-quality");
    const ownerName = useOwnerName(owned);
    const license = useLicense(props.license);
    return {
      excerpt,
      formatRelativeIfRecentDate,
      guides_quality_url,
      license,
      id,
      ownerName,
    };
  }
});
</script>
