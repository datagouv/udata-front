<template>
  <article class="fr-card fr-card--no-icon fr-enlarge-link">
    <div class="fr-card__body">
      <div class="fr-card__content fr-p-2w">
        <h3 class="fr-card__title fr-text--md fr-mt-1v">
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
        <div class="fr-card__desc fr-mt-1v text-mention-grey">
          <p class="not-enlarged">
            <span class="not-enlarged dash-after" v-if="reuse.organization">
              <a class="fr-link" :href="reuse.organization.page">
                <OrganizationNameWithCertificate :organization="reuse.organization" />
              </a>
            </span>
            <span class="not-enlarged dash-after" v-else>
              <a class="fr-link" :href="reuse.owner.page">
                {{ ownerName }}
              </a>
            </span>
            {{ t('Updated {date}', {date: formatRelativeIfRecentDate(reuse.last_update)}) }}
          </p>
          <p class="fr-m-0">
            <span class="dash-after">
              {{ reuseType }}
            </span>
            <span class="fr-icon-star-line icon fr-px-1v" aria-hidden="true">{{ reuse.metrics.followers }}</span>
            <span class="fr-icon-eye-line icon fr-px-1v" aria-hidden="true">{{ reuse.metrics.views }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="fr-card__header">
      <div class="fr-card__img">
        <Placeholder
          class="fr-responsive-img"
          type="reuse"
          :src="reuse.image"
          :size="80"
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
import Placeholder from '../utils/Placeholder.vue';
import { truncate } from "../../helpers";
import type { Reuse } from '../../types';
import { formatRelativeIfRecentDate, useOwnerName, OrganizationNameWithCertificate } from "@etalab/data.gouv.fr-components";
import useReuseType from '../../composables/useReuseType';

const props = defineProps<ReuseProps>();
console.log(props)

const { t } = useI18n();

const ownerName = useOwnerName(props.reuse);
const { label: reuseType } = useReuseType(() => props.reuse.type);
</script>

<style>
.icon {
  &::before {
    --icon-size: 1rem;
  }
};
</style>
