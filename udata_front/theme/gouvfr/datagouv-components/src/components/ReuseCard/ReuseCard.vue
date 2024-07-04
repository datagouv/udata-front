<template>
  <article class="fr-card fr-card--no-icon fr-enlarge-link">
    <div class="fr-card__body">
      <div class="fr-card__content fr-px-2w fr-py-1v">
        <h3 class="fr-card__title fr-text--bold fr-mt-1v fr-mb-0">
          <AppLink :to="reuseUrl">
            {{ truncate(reuse.title, 55) }}
          </AppLink>
        </h3>
        <div class="fr-card__desc fr-mt-1v text-mention-grey">
          <p class="fr-mb-0">
            <template v-if="reuse.organization">
              <span class="not-enlarged dash-after">
                <AppLink class="fr-link" v-if="organizationUrl" :to="organizationUrl">
                  <OrganizationNameWithCertificate :organization="reuse.organization" />
                </AppLink>
                <OrganizationNameWithCertificate v-else :organization="reuse.organization" />
              </span>
            </template>
            <span class="dash-after" v-else>
              {{ ownerName }}
            </span>
            {{ t('Published {date}', {date: formatRelativeIfRecentDate(reuse.created_at)}) }}
          </p>
          <p class="fr-mt-1v">
            <span class="dash-after">
              {{ reuseType }}
            </span>
            <span class="fr-icon-star-line fr-icon--sm fr-px-1v" aria-hidden="true">{{ reuse.metrics.followers }}</span>
            <span class="fr-icon-eye-line fr-icon--sm fr-px-1v" aria-hidden="true">{{ reuse.metrics.views }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="fr-card__header">
      <span
        v-if="reuse.private"
        class="absolute top-0 fr-badge fr-mt-2w fr-ml-2w"
      >
        {{ t('Private') }}
      </span>
      <Placeholder
        class="fr-responsive-img ratio-sm"
        type="reuse"
        :src="reuse.image"
        :size="80"
      />
    </div>
  </article>
</template>

<script lang="ts">
export type ReuseProps = {
  reuse: Reuse,

  /**
   * The reuseUrl is a route location object to allow Vue Router to navigate to the details of a reuse.
   * It is used as a separate prop to allow other sites using the package to define their own reuse pages.
   */
  reuseUrl: RouteLocationRaw,

  /**
   * The organizationUrl is an optional route location object to allow Vue Router to navigate to the details of the organization linked to tha reuse.
   * It is used as a separate prop to allow other sites using the package to define their own organization pages.
   */
  organizationUrl?: RouteLocationRaw
};
</script>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Placeholder from '../utils/Placeholder.vue';
import OrganizationNameWithCertificate from "../Organization";
import { truncate } from "../../helpers";
import type { Reuse } from '../../types/reuses';
import { formatRelativeIfRecentDate } from '../../helpers';
import { useOwnerName } from '../../composables';
import useReuseType from '../../composables/useReuseType';
import AppLink from "../AppLink/AppLink.vue";
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<ReuseProps>();

const { t } = useI18n();

const ownerName = useOwnerName(props.reuse);
const { label: reuseType } = useReuseType(() => props.reuse.type);
</script>

<style>
.ratio-sm {
  aspect-ratio: 1.4;
  object-fit: cover;
};
</style>
