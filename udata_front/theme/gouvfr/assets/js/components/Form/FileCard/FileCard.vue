<template>
  <div class="border border-default-grey fr-p-1w">
    <div class="fr-grid-row fr-grid-row--middle no-wrap wrap-md justify-between">
      <div class="fr-col-auto min-width-0">
        <div class="fr-grid-row no-wrap">
          <div class="fr-col-auto fr-mr-1v fr-icon-svg fr-icon--sm">
            <img :src="resourceImage" alt="" />
          </div>
          <h4 class="fr-col fr-m-0 fr-text--sm overflow-wrap-anywhere text-overflow-ellipsis">
            {{ file.title || $t('Nameless resource') }}
          </h4>
        </div>
        <div class="fr-my-0 text-grey-380 fr-grid-row fr-grid-row--middle">
          <p v-if="file.file?.name" class="fr-text--xs fr-m-0 overflow-wrap-anywhere text-overflow-ellipsis dash-after">{{ file.file?.name }}</p>
          <p class="fr-text--xs fr-m-0">{{ $t('Updated {date}', { date: formatRelativeIfRecentDate(file.file?.lastModified) }) }}</p>
          <p v-if="file.format" class="fr-text--xs fr-m-0 dash-before">
            {{ file.format.trim()?.toLowerCase() }}
            <template v-if="file.filesize">({{ formatFilesize(file.filesize) }})</template>
          </p>
        </div>
      </div>
      <div class="fr-col-auto" v-if="!hideActions && !loaded">
        <FileLoader v-if="loading"/>
        <div class="fr-grid-row fr-grid-row--middle no-wrap wrap-md" v-else>
          <p class="fr-col-auto fr-m-0">
            <button
              type="button"
              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-delete-line fr-icon--sm"
              @click="$emit('delete')"
            >
              {{ $t("Remove file") }}
            </button>
          </p>
          <p class="fr-col-auto fr-ml-1w fr-m-0" v-if="showEditAndWarning">
            <button
              type="button"
              class="fr-btn fr-icon-pencil-line fr-icon--sm"
              @click="$emit('edit')"
            >
              {{ $t("Edit file") }}
            </button>
          </p>
        </div>
      </div>
    </div>
    <p v-if="stateErrors.length" v-for="stateError in stateErrors" class="fr-mt-1w fr-mb-0 fr-text--xs text-default-error">
      <span class="fr-icon-error-line fr-icon--sm" aria-hidden="true"></span>
      {{ stateError }}
    </p>
    <p v-else-if="stateWarnings.length && showEditAndWarning" v-for="stateWarning in stateWarnings" class="fr-mt-1w fr-mb-0 fr-text--xs text-default-warning">
      <span class="fr-icon-warning-line fr-icon--sm" aria-hidden="true"></span>
      {{ stateWarning }}
    </p>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useResourceImage, filesize as formatFilesize, formatRelativeIfRecentDate } from '@etalab/data.gouv.fr-components';
import FileLoader from './FileLoader.vue';
import useFileValidation from '../../../composables/form/useFileValidation';
import { isLoaded, isLoading } from '../../../api/resources';

export default defineComponent({
  components: { FileLoader },
  emits: ["delete", "edit"],
  props: {
    showEditAndWarning: {
      type: Boolean,
      default: true
    },
    hideActions: {
      type: Boolean,
      default: false,
    },
    file: {
      type: /** @type {import("vue").PropType<import("../../../types").NewDatasetFile>} */(Object),
      required: true,
    },
  },
  setup(props) {
    /** @type {import("vue").Ref<import("../../../types").NewDatasetFile>} */
    const file = ref({...props.file});
    const loading = computed(() => isLoading(file.value));
    const loaded = computed(() => isLoaded(file.value));
    const {url: resourceImage} = useResourceImage(file.value);
    const { stateErrors, stateWarnings, validateRequiredRules } = useFileValidation(file);

    onMounted(() => validateRequiredRules());

    watch(props.file, () => file.value = {...props.file});

    return {
      file,
      format: props.file.format,
      formatFilesize,
      formatRelativeIfRecentDate,
      loaded,
      loading,
      resourceImage,
      stateErrors,
      stateWarnings,
    };
  },
});
</script>
