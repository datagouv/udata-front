<template>
    <article class="fr-my-2w fr-p-2w border border-default-grey fr-enlarge-link" :style="style">
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
            <a :href="dataset.page" class="text-grey-500">
              {{ dataset.title }}
              <small v-if="dataset.acronym">{{ dataset.acronym }}</small>
            </a>
          </h4>
          <p class="fr-my-0 fr-text--xs " v-if="dataset.organization || dataset.owner">
            <span class="not-enlarged fr-mr-1v" v-if="dataset.organization">
              <a class="fr-link fr-text--xs" :href="dataset.organization.page">
                <OrganizationNameWithCertificate :organization="dataset.organization" />
              </a>
            </span>
            <span class="not-enlarged fr-mr-1v" v-else-if="dataset.owner">
              <a class="fr-link fr-text--xs" :href="dataset.owner.page">
                {{ ownerName }}
              </a>
            </span>
            <span class="text-mention-grey">{{ $t('Updated {date}', {date: formatRelativeIfRecentDate(dataset.last_update)}) }}</span>
          </p>
          <div class="fr-mx-0 fr-mt-n2v fr-grid-row fr-grid-row--middle fr-text--sm text-mention-grey">
            <div class="fr-grid-row fr-grid-row--middle fr-hidden flex-sm dash-after text-grey-500 not-enlarged">
              <p class="fr-m-0 fr-mr-1v text-mention-grey fr-text--sm" :id="id">
                {{$t('Metadata quality:')}}
              </p>
              <div class="fr-grid-row fr-grid-row--middle fr-mr-1v">
                <QualityScore :score="dataset.quality.score"/>
              </div>
            </div>
            <div class="fr-grid-row fr-grid-row--middle fr-mr-1v">
              <p class="fr-text--xs"><span class="fr-icon-download-line fr-px-1v" aria-hidden="true"></span>{{ dataset.metrics.discussions }}</p>
              <p class="fr-text--xs"><span class="fr-icon-star-line fr-px-1v" aria-hidden="true"></span>{{ dataset.metrics.followers }}</p>
              <p class="fr-text--xs"><span class="fr-icon-line-chart-line fr-px-1v" aria-hidden="true"></span>{{ dataset.metrics.views }}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { useI18n } from "vue-i18n";
  import useLicense from "../../composables/useLicense";
  import { OrganizationNameWithCertificate, useOwnerName, formatRelativeIfRecentDate} from "@etalab/data.gouv.fr-components";
  import useUid from "../../composables/useUid";
  import Avatar from "../discussions/Avatar/Avatar.vue";
  import Placeholder from "../utils/placeholder.vue";
  import QualityScore from "./quality-score.vue";
  import Toggletip from "../utils/Toggletip/Toggletip.vue";
  import QualityItem from "./quality-item.vue";
  import { excerpt } from "../../helpers";
  import { guides_quality_url } from "../../config";
  import type { Dataset } from "../../types";
  
  export default defineComponent({
    components: {
      Avatar,
      OrganizationNameWithCertificate,
      Placeholder,
      QualityScore,
      Toggletip,
      QualityItem,
  },
    inheritAttrs: false,
    props: {
      dataset: {
        type: Object as PropType<Dataset>,
        required: true,
      },
      style: {
        type: Object,
        default: () => ({})
      },
      showMetrics: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const { t } = useI18n();
      const { id } = useUid("metadata-quality");
      const ownerName = useOwnerName(props.dataset);
      const license = useLicense(props.dataset.license);
      return {
        excerpt,
        formatRelativeIfRecentDate,
        guides_quality_url,
        license,
        id,
        ownerName,
        t,
      };
    }
  });
  </script>
  