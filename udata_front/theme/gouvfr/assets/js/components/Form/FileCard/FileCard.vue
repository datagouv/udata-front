<template>
  <div class="border border-default-grey fr-p-1w">
    <div class="fr-grid-row fr-grid-row--middle no-wrap wrap-md justify-between">
      <div class="fr-col-auto min-width-0">
        <div class="fr-grid-row no-wrap">
          <div class="fr-col-auto fr-mr-1v fr-icon-svg fr-icon--sm">
            <img :src="resourceImage" alt="" />
          </div>
          <h4 class="fr-col fr-m-0 fr-text--sm overflow-wrap-anywhere text-overflow-ellipsis">
            {{ title || $t('Nameless resource') }}
          </h4>
        </div>
        <div class="fr-my-0 text-grey-380 fr-grid-row fr-grid-row--middle">
          <p class="fr-text--xs fr-m-0 dash-after">{{ filename }}</p>
          <p class="fr-text--xs fr-m-0">{{ $t('Updated {date}', { date: formatRelativeIfRecentDate(lastModified) }) }}</p>
          <p v-if="format" class="fr-text--xs fr-m-0 dash-before">
            {{ format.trim()?.toLowerCase() }}
            <template v-if="filesize">({{ formatFilesize(filesize) }})</template>
          </p>
        </div>
      </div>
      <div class="fr-col-auto">
        <div class="fr-grid-row fr-grid-row--middle no-wrap wrap-md">
          <p class="fr-col-auto fr-m-0">
            <button
              type="button"
              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-delete-line fr-icon--sm"
              @click="$emit('delete')"
            >
              {{ $t("Remove file") }}
            </button>
          </p>
          <p class="fr-col-auto fr-ml-1w fr-m-0">
            <button class="fr-btn fr-icon-pencil-line fr-icon--sm">
              {{ $t("Edit file") }}
            </button>
          </p>
        </div>
      </div>
    </div>
    <p v-if="missingMetadata" class="fr-mt-1w fr-mb-0 fr-text--xs text-default-warning">
      <span class="fr-icon-warning-line fr-icon--sm" aria-hidden="true"></span>
      {{ $t("Metadata are missing.") }}
    </p>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import useResourceImage from '../../../composables/useResourceImage';
import { filesize as formatFilesize, formatRelativeIfRecentDate } from "../../../helpers";

export default defineComponent({
  emits: ["delete", "edit"],
  props: {
    filename: {
      type: String,
    },
    filesize: {
      type: Number,
    },
    format: {
      type: String,
    },
    lastModified: {
      type: Number,
      required: true,
    },
    missingMetadata: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const resourceImage = useResourceImage(props.format || "");
    return {
      format: props.format,
      formatFilesize,
      formatRelativeIfRecentDate,
      resourceImage,
    }
  }
});
</script>
