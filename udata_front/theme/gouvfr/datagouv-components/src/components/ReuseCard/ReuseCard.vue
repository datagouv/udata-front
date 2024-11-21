<template>
  <article class="fr-card fr-card--no-icon fr-enlarge-link">
    <div class="fr-card__body">
      <div class="fr-card__content fr-px-2w fr-py-1v">
        <h3 class="fr-card__title fr-text--md fr-mt-1v fr-mb-0">
          <AppLink class="text-grey-500" :to="reuseUrl">
            <TextClamp :auto-resize="true" :text='reuse.title' :max-lines='1' />
          </AppLink>
        </h3>
        <div class="fr-card__desc fr-mt-0 text-mention-grey">
          <p class="fr-text--sm fr-mb-0 inline-flex">
            <span class="not-enlarged" v-if="reuse.organization">
              <AppLink class="fr-link" v-if="organizationUrl" :to="organizationUrl">
                <OrganizationNameWithCertificate :organization="reuse.organization" />
              </AppLink>
              <OrganizationNameWithCertificate v-else :organization="reuse.organization" />
            </span>
            <TextClamp class="not-enlarged fr-mr-1v" :auto-resize="true" :text='ownerName' :max-lines='1' v-else />
            <span class="dash-before-sm whitespace-nowrap">{{ t('published {date}', { date: formatRelativeIfRecentDate(reuse.created_at) }) }}</span>
          </p>
          <div class="fr-grid-row fr-grid-row--middle">
            <p class="fr-text--sm fr-my-0 dash-after-sm">
              {{ reuseType }}
            </p>
            <p class="fr-text--sm fr-my-0" :aria-label="t('{n} views', reuse.metrics.views)">
              <span class="fr-icon-eye-line fr-icon--xs fr-px-1v" aria-hidden="true"></span>{{ summarize(reuse.metrics.views) }}
            </p>
            <p class="fr-text--sm fr-my-0" :aria-label="t('{n} followers', reuse.metrics.followers)">
              <span class="fr-icon-star-line fr-icon--xs fr-px-1v" aria-hidden="true"></span>{{ summarize(reuse.metrics.followers) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="fr-card__header">
      <div class="fr-card__img">
        <Placeholder
          class="fr-responsive-img reuse-ratio"
          alt=""
          type="reuse"
          :src="reuse.image"
          :size="320"
        />
      </div>
      <ul class="fr-badges-group" v-if="reuse.private || reuse.archived">
        <li  v-if="reuse.private">
          <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380">
            <span class="fr-icon-lock-line fr-icon--xs">
            </span>
            {{ t('Draft') }}
          </p>
        </li>
        <li v-if="reuse.archived">
          <p class="fr-badge fr-badge--sm fr-badge--mention-grey text-grey-380">
            <span class="fr-icon-lock-line fr-icon--xs">
            </span>
            {{ t('Archived') }}
          </p>
        </li>
      </ul>
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
import TextClamp from 'vue3-text-clamp';
import Placeholder from '../Placeholder/Placeholder.vue';
import { OrganizationNameWithCertificate } from "../Organization";
import { summarize } from "../../helpers";
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

<style scoped lang="less">
@import "../../../../assets/less/variables.less";

.fr-card__img img.reuse-ratio {
  aspect-ratio: 1.4;
  object-fit: cover;
}

.fr-card.fr-enlarge-link .fr-card__title a::after {
  content: none;
}
</style>
