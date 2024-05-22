<template>
  <article class="fr-my-3w fr-p-3w border border-default-grey fr-enlarge-link" :style="props.style">
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
          <slot name="datasetUrl" :dataset="dataset" :datasetUrl="datasetUrl">
            <AppLink :to="datasetUrl" class="text-grey-500">
              {{ dataset.title }}
              <small v-if="dataset.acronym">{{ dataset.acronym }}</small>
            </AppLink>
          </slot>
        </h4>
        <p class="fr-m-0 fr-text--sm" v-if="dataset.organization || dataset.owner">
          {{ t('From') }}
          <template v-if="dataset.organization">
            <span class="not-enlarged" v-if="organizationUrl">
              <AppLink :to="organizationUrl" class="fr-link">
                <OrganizationNameWithCertificate :organization="dataset.organization" />
              </AppLink>
            </span>
            <OrganizationNameWithCertificate v-else :organization="dataset.organization" />
          </template>
          <template v-else>{{ownerName}}</template>
        </p>
        <p class="fr-mt-1w fr-mb-2w fr-hidden fr-unhidden-sm overflow-wrap-anywhere">
          {{ excerpt(dataset.description, 160) }}
        </p>
        <div v-if="showQualityScore" class="fr-m-0 fr-grid-row fr-grid-row--middle">
          <QualityComponentInline :quality="dataset.quality" :class="`fr-hidden flex-sm dash-after`" />
          <p class=fr-m-0>{{ t('Updated {date}', {date: formatRelativeIfRecentDate(dataset.last_update)}) }}</p>
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

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { RouteLocationRaw } from "vue-router";
import { formatRelativeIfRecentDate } from "../../helpers";
import { useOwnerName } from "../../composables"
import OrganizationNameWithCertificate from "../Organization/OrganizationNameWithCertificate.vue";
import { Avatar } from "../Avatar";
import { Placeholder } from "../utils/";
import { QualityComponentInline } from "../QualityComponentInline";
import { excerpt } from "../../helpers";
import type { Dataset, DatasetV2 } from "../../types/datasets";
import AppLink from "../AppLink/AppLink.vue";

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
  showQualityScore?: boolean,
  showMetrics?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  organizationUrl: "",
  style: () => ({}),
  showQualityScore: true,
  showMetrics: true,
});
const { t } = useI18n();
const ownerName = useOwnerName(props.dataset);
</script>
