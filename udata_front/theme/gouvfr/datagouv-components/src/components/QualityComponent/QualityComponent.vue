<template>
  <div class="fr-grid-row fr-grid-row--middle fr-ml-n1v">
  <Toggletip
    class="fr-btn fr-btn--tertiary-no-outline fr-btn--secondary-grey-500 fr-icon-info-line"
  >
    {{$t('Metadata quality:')}}
    <template #toggletip>
        <h5 class="fr-text--sm fr-my-0">{{$t("Metadata quality:")}}</h5>
        <QualityItem
            :passed="quality.dataset_description_quality"
            :messagePassed='$t("Data description filled")'
            :messageFailed='$t("Data description empty")'
            class="fr-my-1w"
        />
        <QualityItem
            :passed="quality.resources_documentation"
            :messagePassed='$t("Files documented")'
            :messageFailed='$t("Files documentation missing")'
            class="fr-my-1w"
        />
        <QualityItem
            :passed="quality.license"
            :messagePassed='$t("License filled")'
            :messageFailed='$t("No license set")'
            class="fr-my-1w"
        />
        <QualityItem
            :passed="quality.update_frequency && !!quality.update_fulfilled_in_time"
            :messagePassed='$t("Update frequency followed")'
            :messageFailed='quality.update_frequency ? $t("Update frequency not followed") : $t("Update frequency not set")'
            class="fr-my-1w"
        />
        <QualityItem
            :passed="quality.has_open_format"
            :messagePassed='$t("File formats are open")'
            :messageFailed='$t("File formats are closed")'
            class="fr-my-1w"
        />
        <QualityItem
            :passed="quality.temporal_coverage"
            :messagePassed='$t("Temporal coverage filled")'
            :messageFailed='$t("Temporal coverage not set")'
            class="fr-my-1w"
        />
        <QualityItem
            :passed="quality.spatial"
            :messagePassed='$t("Spatial coverage filled")'
            :messageFailed='$t("Spatial coverage not set")'
            class="fr-my-1w"
        />
        <QualityItem
            :passed="quality.all_resources_available"
            :messagePassed='$t("All files are available")'
            :messageFailed='$t("Some files are unavailable")'
            class="fr-my-1w"
        />
        <div class="fr-grid-row fr-grid-row--right not-enlarged">
            <a
            :href="config.guides_quality_url"
            target="_blank"
            rel="noopener"
            :title="$t('Learn more about this indicator - opens a new window')"
            >
            {{$t("Learn more about this indicator")}}
            </a>
        </div>
    </template>
  </Toggletip>
  <p class="fr-m-0 fr-mr-1v">
    {{$t('Metadata quality:')}}
  </p>
  </div>
  <QualityScore
    :score="quality.score"
    class="w-100"
  />
  <template v-if="showItemWarnings">
    <QualityItemWarning
      :quality-item="quality.dataset_description_quality"
      :message="$t('Data description empty')"
    />
    <QualityItemWarning
      :quality-item="quality.resources_documentation"
      :message="$t('Files documentation missing')"
    />
    <QualityItemWarning
      :quality-item="quality.license"
      :message="$t('No license set')"
    />
    <QualityItemWarning
      :quality-item="quality.update_frequency && quality.update_fulfilled_in_time"
      :message="quality.update_frequency ? $t('Update frequency not followed') : $t('Update frequency not set')"
    />
    <QualityItemWarning
      :quality-item="quality.has_open_format"
      :message="$t('File formats are closed')"
    />
    <QualityItemWarning
      :quality-item="quality.temporal_coverage"
      :message="$t('Temporal coverage not set')"
    />
    <QualityItemWarning
      :quality-item="quality.spatial"
      :message="$t('Spatial coverage not set')"
    />
    <QualityItemWarning
      :quality-item="quality.all_resources_available"
      :message="$t('Some files are unavailable')"
    />
  </template>
</template>
<script lang="ts">
export type QualityComponentProps = {
  quality: Quality;
  showItemWarnings?: boolean;
};
</script>
<script setup lang="ts">
import { QualityScore}  from '../QualityScore/';
import { QualityItem } from '../QualityItem/';
import { QualityItemWarning } from '../QualityItemWarning/';
import { Toggletip } from '../Toggletip/';
import { config } from '../../config';
import type { Quality } from '../../types/datasets';
withDefaults(defineProps<QualityComponentProps>(), {
  showItemWarnings: true,
});
</script>
