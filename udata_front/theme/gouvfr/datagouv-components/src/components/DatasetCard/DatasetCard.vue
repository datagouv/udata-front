<template>
  <div class="fr-my-2w fr-p-2w border border-default-grey fr-enlarge-link" :style="props.style">
    <div class="absolute top-0 fr-grid-row fr-grid-row--middle fr-mt-n3v fr-ml-n1v" v-if="dataset.private || dataset.archived">
      <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380 fr-mr-1w" v-if="dataset.private">
        <span class="fr-icon-lock-line fr-icon--sm" aria-hidden="true"></span>
        {{ t('Private') }}
      </p>
      <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380 fr-mr-1w" v-if="dataset.archived">
        <span class="fr-icon-archive-line fr-icon--sm" aria-hidden="true"></span>
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
            :size="40"
          />
          <Avatar
            v-else-if="dataset.owner"
            :user="dataset.owner"
            :size="40"
          />
          <Placeholder
            v-else
            type="dataset"
            :size="40"
          />
        </div>
      </div>
      <div class="fr-col-12 fr-col-sm">
        <h4 class="fr-text--md fr-mb-0 fr-grid-row">
          <slot name="datasetUrl" :dataset="dataset" :datasetUrl="datasetUrl">
            <AppLink :to="datasetUrl" class="text-grey-500 fr-grid-row">
              <TextClamp class="fr-col" :auto-resize="true" :text='dataset.title' :max-lines='1' />
              <small class="fr-col-auto fr-ml-1w" v-if="dataset.acronym">{{ dataset.acronym }}</small>
            </AppLink>
          </slot>
        </h4>
        <div class="fr-text--sm fr-m-0 inline-flex" v-if="dataset.organization || dataset.owner">
            <template v-if="dataset.organization">
              <span class="not-enlarged fr-mr-1v">
                <AppLink class="fr-link fr-text--sm" v-if="organizationUrl" :to="organizationUrl">
                  <OrganizationNameWithCertificate :organization="dataset.organization" />
                </AppLink>
                <OrganizationNameWithCertificate v-else :organization="dataset.organization" />
              </span>
            </template>
            <TextClamp class="not-enlarged fr-mr-1v" :auto-resize="true" :text='ownerName' :max-lines='1' v-else />
            <span class="text-mention-grey dash-before-sm whitespace-nowrap">{{ $t('Updated {date}', {date: formatRelativeIfRecentDate(dataset.last_update)}) }}</span>
          </div>
        <div class="fr-mx-0 fr-mb-n1v fr-grid-row fr-grid-row--middle fr-text--sm text-mention-grey">
          <div class="fr-hidden flex-sm dash-after-sm text-grey-500">
            <QualityComponentInline :quality="dataset.quality"/>
          </div>
          <div class="fr-grid-row fr-grid-row--middle fr-mr-1v">
            <p class="fr-text--sm fr-my-0" :aria-label="t('{n} resources downloads', dataset.metrics.resources_downloads)">
              <span class="fr-icon-download-line fr-icon--sm fr-px-1v" aria-hidden="true"></span>{{ summarize(dataset.metrics.resources_downloads) }}
            </p>
            <p class="fr-text--sm fr-my-0" :aria-label="t('{n} followers', dataset.metrics.followers)">
              <span class="fr-icon-star-line fr-icon--sm fr-px-1v" aria-hidden="true"></span>{{ summarize(dataset.metrics.followers) }}
            </p>
            <p class="fr-text--sm fr-my-0" :aria-label="t('{n} reuses', dataset.metrics.reuses)">
              <span class="fr-icon-line-chart-line fr-icon--sm fr-px-1v" aria-hidden="true"></span>{{ summarize(dataset.metrics.reuses) }}
            </p>
          </div>
        </div>
        <TextClamp
          v-if="showDescription"
          class="fr-text--sm fr-mt-1w fr-mb-0 overflow-wrap-anywhere"
          :auto-resize="true"
          :text="RemoveMarkdown(dataset.description)"
          :max-lines='2'
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RemoveMarkdown from "remove-markdown";
import { useI18n } from "vue-i18n";
import type { RouteLocationRaw } from "vue-router";
import TextClamp from 'vue3-text-clamp';
import AppLink from "../AppLink/AppLink.vue";
import Avatar from "../Avatar/Avatar.vue";
import type { Dataset, DatasetV2 } from "../../types/datasets";
import { formatRelativeIfRecentDate, summarize } from "../../helpers";
import OrganizationNameWithCertificate from "../Organization/OrganizationNameWithCertificate.vue";
import { Placeholder } from "../utils/";
import { QualityComponentInline } from "../QualityComponentInline";
import { useOwnerName } from "../../composables";

type Props = {
  dataset: Dataset | DatasetV2,

  /**
   * The datasetUrl is a route location object to allow Vue Router to navigate to the details of a dataset.
   * It is used as a separate prop to allow other sites using the package to define their own dataset pages.
   */
  datasetUrl: RouteLocationRaw,

  /**
   * The organizationUrl is an optional route location object to allow Vue Router to navigate to the details of the organization linked to tha dataset.
   * It is used as a separate prop to allow other sites using the package to define their own organization pages.
   */
  organizationUrl?: RouteLocationRaw,
  showDescription?: boolean,
};

const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
  showDescription: true,
});

const { t } = useI18n();
const ownerName = useOwnerName(props.dataset);
</script>
