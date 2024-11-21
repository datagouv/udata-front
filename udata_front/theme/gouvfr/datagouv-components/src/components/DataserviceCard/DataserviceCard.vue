<template>
  <article class="fr-my-2w fr-p-2w border fr-enlarge-link" :style="props.style" :class="{
    'border-tabular-api': isTabularApi,
  }">
    <div class="absolute top-0 fr-grid-row fr-grid-row--middle fr-mt-n3v fr-ml-n1v" v-if="dataservice.is_restricted || dataservice.private || dataservice.archived_at">
      <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380 fr-mr-1w" v-if="dataservice.is_restricted">
        <span class="fr-icon-lock-line fr-icon--sm" aria-hidden="true"></span>
        {{ t('Restricted access') }}
      </p>
      <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380 fr-mr-1w" v-if="dataservice.private">
        <span class="fr-icon-lock-line fr-icon--sm" aria-hidden="true"></span>
        {{ t('Draft') }}
      </p>
      <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380 fr-mr-1w" v-if="dataservice.archived_at">
        <span class="fr-icon-lock-line fr-icon--sm" aria-hidden="true"></span>
        {{ t('Archived') }}
      </p>
    </div>
    <h4 class="fr-text--md fr-mb-0">
      <slot name="dataserviceUrl" :dataservice="dataservice" :dataserviceUrl="dataserviceUrl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="fr-mr-1v" style="width:1rem" v-if="isTabularApi"><path d="M17.0007 1.20825 18.3195 3.68108 20.7923 4.99992 18.3195 6.31876 17.0007 8.79159 15.6818 6.31876 13.209 4.99992 15.6818 3.68108 17.0007 1.20825ZM10.6673 9.33325 15.6673 11.9999 10.6673 14.6666 8.00065 19.6666 5.33398 14.6666.333984 11.9999 5.33398 9.33325 8.00065 4.33325 10.6673 9.33325ZM11.4173 11.9999 9.18905 10.8115 8.00065 8.58325 6.81224 10.8115 4.58398 11.9999 6.81224 13.1883 8.00065 15.4166 9.18905 13.1883 11.4173 11.9999ZM19.6673 16.3333 18.0007 13.2083 16.334 16.3333 13.209 17.9999 16.334 19.6666 18.0007 22.7916 19.6673 19.6666 22.7923 17.9999 19.6673 16.3333Z"></path></svg>
        <span class="fr-icon-terminal-line fr-icon--sm fr-mr-1v" aria-hidden="true" v-else></span>
        <AppLink class="inline-flex" :to="dataserviceUrl">
          <TextClamp :auto-resize="true" :text='dataservice.title' :max-lines='1'/>
        </AppLink>
      </slot>
    </h4>
    <p class="fr-text--sm text-mention-grey inline-flex fr-mt-1v fr-mb-0" v-if="dataservice.organization || dataservice.owner">
      <span class="not-enlarged" v-if="dataservice.organization">
        <AppLink class="fr-link fr-text--sm" v-if="organizationUrl" :to="organizationUrl">
          <OrganizationNameWithCertificate :organization="dataservice.organization" />
        </AppLink>
        <OrganizationNameWithCertificate v-else :organization="dataservice.organization" />
      </span>
      <TextClamp class="not-enlarged fr-mr-1v" :auto-resize="true" :text='ownerName' :max-lines='1' v-else />
      <span class="dash-before whitespace-nowrap">{{ t('Updated {date}', {date: formatRelativeIfRecentDate(dataservice.metadata_modified_at)}) }}</span>
    </p>
    <p class="fr-text--sm text-mention-grey fr-my-0 fr-mt-1v">
      <span class="fr-icon-information-line fr-icon--sm text-grey-380"></span>
      {{ t('Availability :') }}
      <span class="text-grey-400">
        <template v-if="dataservice.availability">
          {{ t('{n}%', dataservice.availability) }}
        </template>
        <template v-else>
          {{ t('unknown') }}
        </template>
      </span>
    </p>
    <Suspense v-if="showDescription">
      <AsyncTextClamp
        class="fr-text--sm fr-mt-1w fr-mb-0 overflow-wrap-anywhere"
        :auto-resize="true"
        :text="removeMarkdown(dataservice.description)"
        :max-lines='2'
      />
    </Suspense>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { RouteLocationRaw } from "vue-router";
import TextClamp from 'vue3-text-clamp';
import AppLink from "../AppLink/AppLink.vue";
import AsyncTextClamp from "../AsyncTextClamp/AsyncTextClamp.vue";
import OrganizationNameWithCertificate from "../Organization/OrganizationNameWithCertificate.vue";
import { useOwnerName } from "../../composables";
import { config } from "../../config";
import { formatRelativeIfRecentDate } from "../../helpers";
import { removeMarkdown } from "../../helpers/markdown";
import type { Dataservice } from "../../types/dataservices";

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

const isTabularApi = computed(() => {
  return config.tabular_api_dataservice_id === props.dataservice.id
})
</script>
<style scoped>
.border-tabular-api {
  border-color: #373C42 !important;
}
</style>
