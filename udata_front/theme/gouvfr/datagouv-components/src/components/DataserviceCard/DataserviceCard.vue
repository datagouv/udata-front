<template>
  <article class="fr-my-2w fr-p-2w border border-default-grey fr-enlarge-link" :style="props.style">
    <div class="absolute top-0 fr-grid-row fr-grid-row--middle fr-mt-n3v fr-ml-n1v" v-if="dataservice.is_restricted || dataservice.private || dataservice.archived_at">
      <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380 fr-mr-1w" v-if="dataservice.is_restricted">
        <span class="fr-icon-lock-line fr-icon--sm" aria-hidden="true"></span>
        {{ t('Restricted access') }}
      </p>
      <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380 fr-mr-1w" v-if="dataservice.private">
        <span class="fr-icon-lock-line fr-icon--sm" aria-hidden="true"></span>
        {{ t('Private') }}
      </p>
      <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380 fr-mr-1w" v-if="dataservice.archived_at">
        <span class="fr-icon-lock-line fr-icon--sm" aria-hidden="true"></span>
        {{ t('Archived') }}
      </p>
    </div>
    <h4 class="fr-text--md fr-mb-0 fr-grid-row">
      <slot name="dataserviceUrl" :dataservice="dataservice" :dataserviceUrl="dataserviceUrl">
        <span class="fr-icon-terminal-line fr-icon--sm fr-mr-1v" aria-hidden="true"></span>
        <AppLink :to="dataserviceUrl">
          {{ dataservice.title }}
        </AppLink>
      </slot>
    </h4>
    <p class="fr-text--sm text-mention-grey fr-mt-1v fr-mb-0" v-if="dataservice.organization || dataservice.owner">
      <span class="not-enlarged" v-if="dataservice.organization">
        <AppLink class="fr-link fr-text--sm" v-if="organizationUrl" :to="organizationUrl">
          <OrganizationNameWithCertificate :organization="dataservice.organization" />
        </AppLink>
        <OrganizationNameWithCertificate v-else :organization="dataservice.organization" />
        &mdash;
      </span>
      <span class="not-enlarged" v-else>
        {{ ownerName }}
        &mdash;
      </span>
      <span>{{ t('Updated {date}', {date: formatRelativeIfRecentDate(dataservice.metadata_modified_at)}) }}</span>
    </p>
    <p class="fr-text--sm text-mention-grey fr-my-0 fr-mt-1v">
      <span class="fr-icon-information-line fr-icon--sm text-grey-380"></span>
      {{ t('Availability :') }}
      <span class="text-grey-400">{{ t('{n}%', dataservice.availability) }}</span>
    </p>
    <p class="fr-text--sm fr-mt-1w fr-mb-0 overflow-wrap-anywhere" v-if="showDescription">{{ excerpt(dataservice.description, 160) }}</p>
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
