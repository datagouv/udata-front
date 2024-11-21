<template>
    <div class="fr-m-0 fr-grid-row fr-grid-row--middle fr-text--sm text-mention-grey">
        <div class="fr-grid-row fr-grid-row--middle">
          <Toggletip class="relative z-2">
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
          <p class="fr-my-0 fr-mr-1v text-mention-grey fr-text--sm">
              {{$t('Metadata :')}}
          </p>
          <div class="fr-grid-row fr-grid-row--middle fr-mr-1v">
              <QualityScore :score="quality.score"/>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { QualityScore}  from '../QualityScore/';
import { QualityItem } from '../QualityItem/';
import { Toggletip } from '../Toggletip/';
import { config } from '../../config';
import type { Quality } from '../../types/datasets';
defineProps<{
    quality: Quality
}>();
</script>
