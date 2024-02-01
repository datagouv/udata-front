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
            :alt="dataset.organization.name"
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
          {{ t('From') }}
          <span class="not-enlarged" v-if="dataset.organization">
            <a class="fr-link" :href="dataset.organization.page">
              <OrganizationNameWithCertificate :organization="dataset.organization" />
            </a>
          </span>
          <span class="not-enlarged" v-else>
            <a class="fr-link" :href="dataset.owner.page">
              {{ ownerName }}
            </a>
          </span>
        </p>
        <p class="fr-my-3v fr-hidden fr-unhidden-sm overflow-wrap-anywhere">
          {{ excerpt(dataset.description, 500) }}
        </p>
        <div class="fr-m-0 fr-grid-row fr-grid-row--middle fr-text--sm text-mention-grey">
          <p class="fr-m-0">{{ t('Updated {date}', {date: formatRelativeIfRecentDate(dataset.last_update)}) }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Dataset } from "../../types";
export type CardMDProps = {
  dataset: Dataset,
  style?: CSSProperties,
};
</script>

<script setup lang="ts">
import Avatar from "../discussions/Avatar/Avatar.vue";
import Placeholder from "../utils/placeholder.vue";
import { excerpt } from "../../helpers";
import { useI18n } from "vue-i18n";
import { type CSSProperties } from "vue";
import { formatRelativeIfRecentDate, useOwnerName, OrganizationNameWithCertificate } from "@etalab/data.gouv.fr-components";

defineOptions({inheritAttrs: false});

const props = withDefaults(defineProps<CardMDProps>(), {
  style: () => ({})
});

const { t } = useI18n();

const ownerName = useOwnerName(props.dataset);
</script>
