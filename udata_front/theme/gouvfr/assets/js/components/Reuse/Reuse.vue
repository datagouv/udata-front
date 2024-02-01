<template>
  <article class="fr-card fr-card--no-icon fr-enlarge-link">
    <div class="fr-card__body">
      <div class="fr-card__content fr-p-2w">
        <h3 class="fr-card__title fr-text--md fr-mt-1w">
          <a :href="reuse.page">
            {{ truncate(reuse.title, 55) }}
            <span
              v-if="reuse.private"
              class="fr-badge fr-ml-1w"
            >
              {{ t('Private') }}
            </span>
          </a>
        </h3>
        <p class="fr-card__detail fr-m-0">
          {{ reuseType }}
        </p>
        <p class="fr-card__desc fr-mt-1w text-mention-grey not-enlarged">
          {{ t('Updated {date}', {date: formatRelativeIfRecentDate(reuse.last_update)}) }}
          {{ t(' by ') }}
          <span class="not-enlarged" v-if="reuse.organization">
            <a class="fr-link" :href="reuse.organization.page">
              <OrganizationNameWithCertificate :organization="reuse.organization" />
            </a>
          </span>
          <span class="not-enlarged" v-else>
            <a class="fr-link" :href="reuse.owner.page">
              {{ ownerName }}
            </a>
          </span>
        </p>
      </div>
    </div>
    <div class="fr-card__header">
      <div class="fr-card__img">
        <Placeholder
          class="fr-responsive-img"
          type="reuse"
          :src="reuse.image"
          />
      </div>
    </div>
  </article>
</template>

<script lang="ts">
export type ReuseProps = {
  reuse: Reuse,
};
</script>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Placeholder from '../utils/placeholder.vue';
import { truncate } from "../../helpers";
import type { Reuse } from '../../types';
import { formatRelativeIfRecentDate, useOwnerName, OrganizationNameWithCertificate } from "@etalab/data.gouv.fr-components";
import useReuseType from '../../composables/useReuseType';

const props = defineProps<ReuseProps>();

const { t } = useI18n();

const ownerName = useOwnerName(props.reuse);
const { label: reuseType } = useReuseType(() => props.reuse.type);
</script>
