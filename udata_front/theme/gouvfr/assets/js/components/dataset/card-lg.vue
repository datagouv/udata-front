<template>
  <article class="fr-my-3w fr-p-3w border border-default-grey fr-enlarge-link" :style="style">
    <div class="absolute top-0 fr-grid-row fr-grid-row--middle fr-mt-n3v" v-if="dataset.private || dataset.archived">
      <p class="fr-badge fr-badge--mention-grey fr-mr-1w" v-if="dataset.private">
        <span class="fr-icon-lock-line" aria-hidden="true"></span>
        {{ t('Private') }}
      </p>
      <p class="fr-badge fr-badge--mention-grey" v-if="dataset.archived">
        <span class="fr-icon-archive-line" aria-hidden="true"></span>
        {{ t('Archived') }}
      </p>
    </div>
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--top">
      <div class="fr-col-auto">
        <div class="logo">
          <Placeholder
            v-if="dataset.organization"
            type="dataset"
            :src="dataset.organization.logo_thumbnail"
            alt=""
            :size="60"
          />
          <Avatar
            v-else-if="dataset.owner"
            :user="dataset.owner"
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
          <a :href="dataset.page" class="text-grey-500">
            {{ dataset.title }}
            <small v-if="dataset.acronym">{{ dataset.acronym }}</small>
          </a>
        </h4>
        <p class="fr-m-0 fr-text--sm" v-if="dataset.organization || dataset.owner">
          {{ $t('From') }}
          <span class="not-enlarged" v-if="dataset.organization">
            <a class="fr-link" :href="dataset.organization.page">
              <OrganizationNameWithCertificate :organization="dataset.organization" />
            </a>
          </span>
          <span class="not-enlarged" v-else-if="dataset.owner">
            <a class="fr-link" :href="dataset.owner.page">
              {{ ownerName }}
            </a>
          </span>
        </p>
        <p class="fr-mt-1w fr-mb-2w fr-hidden fr-unhidden-sm overflow-wrap-anywhere">
          {{ excerpt(dataset.description, 160) }}
        </p>
        <div
          v-if="show_quality_score"
          class="fr-m-0 fr-grid-row fr-grid-row--middle fr-text--sm text-mention-grey">
          <div class="fr-grid-row fr-grid-row--middle fr-hidden flex-sm dash-after text-grey-500 not-enlarged">
            <Toggletip
              class="fr-btn fr-btn--tertiary-no-outline fr-btn--secondary-grey-500 fr-icon-info-line"
            >
              {{$t('Metadata quality:')}}
              <template #toggletip>
                <h5 class="fr-text--sm fr-my-0">{{$t("Metadata quality:")}}</h5>
                <QualityItem
                  :passed="dataset.quality.dataset_description_quality"
                  :messagePassed='$t("Data description filled")'
                  :messageFailed='$t("Data description empty")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="dataset.quality.resources_documentation"
                  :messagePassed='$t("Files documented")'
                  :messageFailed='$t("Files documentation missing")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="dataset.quality.license"
                  :messagePassed='$t("License filled")'
                  :messageFailed='$t("No license set")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="dataset.quality.update_frequency && !!dataset.quality.update_fulfilled_in_time"
                  :messagePassed='$t("Update frequency followed")'
                  :messageFailed='dataset.quality.update_frequency ? $t("Update frequency not followed") : $t("Update frequency not set")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="dataset.quality.has_open_format"
                  :messagePassed='$t("File formats are open")'
                  :messageFailed='$t("File formats are closed")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="dataset.quality.temporal_coverage"
                  :messagePassed='$t("Temporal coverage filled")'
                  :messageFailed='$t("Temporal coverage not set")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="dataset.quality.spatial"
                  :messagePassed='$t("Spatial coverage filled")'
                  :messageFailed='$t("Spatial coverage not set")'
                  class="fr-my-1w"
                />
                <QualityItem
                  :passed="dataset.quality.all_resources_available"
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
              <QualityScore :score="dataset.quality.score"/>
            </div>
          </div>
          <p class=fr-m-0>{{ $t('Updated {date}', {date: formatRelativeIfRecentDate(dataset.last_update)}) }}</p>
        </div>
      </div>
      <ul v-if="showMetrics" class="fr-hidden fr-unhidden-sm fr-hidden-md fr-unhidden-lg fr-col-auto fr-tags-group fr-grid-row--bottom self-center flex-direction-column">
        <li>
          <p class="fr-tag">
            <i18n-t keypath="{n} reuses" :plural="dataset.metrics.reuses || 0" scope="global">
              <template #n>
                <strong class="fr-mr-1v">{{dataset.metrics.reuses || 0}}</strong>
              </template>
            </i18n-t>
          </p>
        </li>
        <li>
          <p class="fr-tag">
            <i18n-t keypath="{n} favorites" :plural="dataset.metrics.followers || 0" scope="global">
              <template #n>
                <strong class="fr-mr-1v">{{dataset.metrics.followers}}</strong>
              </template>
            </i18n-t>
          </p>
        </li>
      </ul>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";
import useLicense from "../../composables/useLicense";
import { OrganizationNameWithCertificate, useOwnerName, formatRelativeIfRecentDate} from "@etalab/data.gouv.fr-components";
import useUid from "../../composables/useUid";
import Avatar from "../discussions/Avatar/Avatar.vue";
import Placeholder from "../utils/placeholder.vue";
import QualityScore from "./quality-score.vue";
import Toggletip from "../utils/Toggletip/Toggletip.vue";
import QualityItem from "./quality-item.vue";
import { excerpt } from "../../helpers";
import { guides_quality_url, quality_metadata_backend_ignore } from "../../config";
import type { Dataset } from "../../types";

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
    dataset: {
      type: Object as PropType<Dataset>,
      required: true,
    },
    style: {
      type: Object,
      default: () => ({})
    },
    showMetrics: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { id } = useUid("metadata-quality");
    const ownerName = useOwnerName(props.dataset);
    const license = useLicense(props.dataset.license);
    const show_quality_score = !(props.dataset.harvest && quality_metadata_backend_ignore.includes(props.dataset.harvest.backend));
    return {
      excerpt,
      formatRelativeIfRecentDate,
      guides_quality_url,
      show_quality_score,
      license,
      id,
      ownerName,
      t,
    };
  }
});
</script>
