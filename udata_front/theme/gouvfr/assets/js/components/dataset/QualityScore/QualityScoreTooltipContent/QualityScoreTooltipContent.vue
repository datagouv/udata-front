<template>
  <h5 class="fr-text--sm fr-my-0">{{ t("Metadata quality:") }}</h5>
  <QualityItem
    :passed="dataset.quality.dataset_description_quality"
    :messagePassed='t("Data description filled")'
    :messageFailed='t("Data description empty")'
    class="fr-my-1w"
  />
  <QualityItem
    :passed="dataset.quality.resources_documentation"
    :messagePassed='t("Files documented")'
    :messageFailed='t("Files documentation missing")'
    class="fr-my-1w"
  />
  <QualityItem
    :passed="dataset.quality.license"
    :messagePassed='t("License filled")'
    :messageFailed='t("No license set")'
    class="fr-my-1w"
  />
  <QualityItem
    :passed="dataset.quality.update_frequency && !!dataset.quality.update_fulfilled_in_time"
    :messagePassed='t("Update frequency followed")'
    :messageFailed='dataset.quality.update_frequency ? t("Update frequency not followed") : t("Update frequency not set")'
    class="fr-my-1w"
  />
  <QualityItem
    :passed="dataset.quality.has_open_format"
    :messagePassed='t("File formats are open")'
    :messageFailed='t("File formats are closed")'
    class="fr-my-1w"
  />
  <QualityItem
    :passed="dataset.quality.temporal_coverage"
    :messagePassed='t("Temporal coverage filled")'
    :messageFailed='t("Temporal coverage not set")'
    class="fr-my-1w"
  />
  <QualityItem
    :passed="dataset.quality.spatial"
    :messagePassed='t("Spatial coverage filled")'
    :messageFailed='t("Spatial coverage not set")'
    class="fr-my-1w"
  />
  <QualityItem
    :passed="dataset.quality.all_resources_available"
    :messagePassed='t("All files are available")'
    :messageFailed='t("Some files are unavailable")'
    class="fr-my-1w"
  />
  <div class="fr-grid-row fr-grid-row--right not-enlarged">
    <a
      :href="guides_quality_url"
      target="_blank"
      rel="noopener"
      :title="t('Learn more about this indicator - opens a new window')"
    >
      {{t("Learn more about this indicator")}}
    </a>
  </div>
</template>
<script setup lang="ts">
import type { Dataset, DatasetV2 } from '@datagouv/components/ts';
import { QualityItem } from '@datagouv/components/ts';
import { useI18n } from 'vue-i18n';
import { guides_quality_url } from "../../../../config";

defineProps<{
  dataset: Dataset | DatasetV2;
}>();

const { t } = useI18n();
</script>
