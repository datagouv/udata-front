<template>
  <article class="fr-my-2w fr-p-2w border border-default-grey fr-enlarge-link" :style="props.style">
    <div class="absolute top-0 fr-grid-row fr-grid-row--middle fr-mt-n3v fr-ml-n1v" v-if="dataservice.private">
      <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380 fr-mr-1w">
        <span class="fr-icon-lock-line fr-icon--sm" aria-hidden="true"></span>
        {{ t('Private') }}
      </p>
    </div>
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--top">
      <div class="fr-col">
        <h4 class="fr-text--md fr-mb-0 fr-grid-row">
          <slot name="dataserviceUrl" :dataservice="dataservice" :dataserviceUrl="dataserviceUrl">
            <span class="fr-icon-terminal-line fr-icon--sm fr-mr-1v" aria-hidden="true"></span>
            <AppLink :to="dataserviceUrl" class="text-grey-500">
              {{ dataservice.title }}
              <small v-if="dataservice.acronym">{{ dataservice.acronym }}</small>
            </AppLink>
          </slot>
        </h4>
        <div class="fr-text--sm fr-mb-n2v" v-if="dataservice.organization || dataservice.owner">
          <template v-if="dataservice.organization">
            <span class="not-enlarged dash-after-sm fr-mr-1v">
              <AppLink class="fr-link fr-text--sm" v-if="organizationUrl" :to="organizationUrl">
                <OrganizationNameWithCertificate :organization="dataservice.organization" />
              </AppLink>
              <OrganizationNameWithCertificate v-else :organization="dataservice.organization" />
            </span>
          </template>
          <span class="not-enlarged dash-after-sm fr-mr-1v" v-else>
            {{ ownerName }}
          </span>
          <span class="text-mention-grey">{{ $t('Updated {date}', {date: formatRelativeIfRecentDate(dataservice.metadata_modified_at)}) }}</span>
        </div>
        <div class="fr-mx-0 fr-mb-n1v fr-grid-row fr-grid-row--middle fr-text--sm text-mention-grey">
          <div class="fr-hidden flex-sm dash-after-sm text-grey-500 not-enlarged">
            <QualityComponentInline :quality="dataservice.quality"/>
          </div>
          <div class="fr-grid-row fr-grid-row--middle fr-mr-1v">
            <p class="fr-text--sm fr-my-0">
              <span class="fr-icon-download-line fr-icon--sm fr-px-1v" aria-hidden="true"></span>{{ dataservice.metrics.discussions }}
            </p>
            <p class="fr-text--sm fr-my-0">
              <span class="fr-icon-star-line fr-icon--sm fr-px-1v" aria-hidden="true"></span>{{ dataservice.metrics.followers }}
            </p>
            <p class="fr-text--sm fr-my-0">
              <span class="fr-icon-line-chart-line fr-icon--sm fr-px-1v" aria-hidden="true"></span>{{ dataservice.metrics.views }}
            </p>
          </div>
        </div>
        <div v-if="showDescription" class="fr-pt-2v">
          <p class="fr-text--sm fr-m-0 overflow-wrap-anywhere">{{ excerpt(dataservice.description, 160) }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { useI18n } from "vue-i18n";
import AppLink from "../AppLink/AppLink.vue";
import type { Dataservice } from "../../types/dataservices";
import { excerpt } from "../../helpers";
import { formatRelativeIfRecentDate } from "../../helpers";
import OrganizationNameWithCertificate from "../Organization/OrganizationNameWithCertificate.vue";
import { QualityComponentInline } from "../QualityComponentInline";
import { useOwnerName } from "../../composables";

type Props = {
  dataservice: Dataservice,

  /**
   * The dataserviceUrl is a route location object to allow Vue Router to navigate to the details of a dataservice.
   * It is used as a separate prop to allow other sites using the package to define their own dataservice pages.
   */
  dataserviceUrl: RouteLocationRaw,

  /**
   * The organizationUrl is an optional route location object to allow Vue Router to navigate to the details of the organization linked to tha dataservice.
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
const ownerName = useOwnerName(props.dataservice);
</script>
