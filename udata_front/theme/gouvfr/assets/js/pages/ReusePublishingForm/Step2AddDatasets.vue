<template>
  <Container>
    <Stepper :steps="steps" :currentStep="1"/>
    <Well
      color="blue-cumulus"
      weight="regular"
      class="fr-mb-2w"
    >
      <div class="fr-grid-row">
        <div class="fr-col-auto fr-mr-3v">
          <span class="fr-icon-info-line" aria-hidden="true"></span>
        </div>
        <div class="fr-col">
          <p class="fr-m-0 fr-text--xs">{{ t('It is important to associate all the datasets used, as this allows to understand the cross-references and improve the visibility of your reuse.') }}</p>
        </div>
      </div>
    </Well>
    <fieldset class="fr-fieldset min-width-0" aria-labelledby="description-legend">
      <legend class="fr-fieldset__legend" id="description-legend" v-if="form.datasets.length > 0">
        <h2 class="subtitle subtitle--uppercase fr-mb-0">
          {{ t("Associated datasets") }}
        </h2>
      </legend>
      <div class="w-100" ref="el">
        <div class="fr-col fr-grid-row fr-grid-row--center w-100" v-for="(dataset, index) in form.datasets" :key="dataset.id">
          <button
            type="button"
            class="fr-col-auto fr-btn fr-btn--xs fr-btn--tertiary-no-outline fr-icon-svg fr-icon--sm fr-my-auto fr-mr-1v"
            :title="t('Drag to move this content')"
          >
            <img :src="draggableIcon" alt="" />
          </button>
          <div class="fr-col relative" :style="zIndex(index)">
            <CardLg :dataset />
            <button
              type="button"
              class="fr-btn fr-btn--tertiary-no-outline fr-btn--secondary--error fr-icon-close-line border-0 absolute top-3w right-1w"
              :title="t('Remove the dataset')"
              @click="removeDataset(index)"
            >
              {{ t('Remove the dataset') }}
            </button>
          </div>
        </div>
      </div>
      <MultiSelect
        ref="selectedDatasetRef"
        :placeholder="t('Look for a dataset')"
        :searchPlaceholder="t('Search a dataset...')"
        :minimumCharacterBeforeSuggest="2"
        suggestUrl="/datasets/suggest/"
        :required="true"
        @change="handleDatasetChange"
        :hasError="fieldHasError('datasets')"
        :errorText="t('You need to provide at least one dataset')"
        :allOption="t('Select a dataset')"
        :addAllOption="false"
        :values="selectedDataset"
      />
      <p class="fr-hr-or w-100 text-transform-lowercase fr-text--regular">
        <span class="fr-hr-or-text">{{ t('or') }}</span>
      </p>
      <InputGroup
        :label="t('Link to the dataset')"
        :placeholder="'https://...'"
        class="w-100"
        :required="true"
        v-model="form.linkedDataset"
        @change="vWarning$.linkedDataset.$touch"
        :hasError="fieldHasError('linkedDataset')"
        :hasWarning="fieldHasWarning('linkedDataset')"
        :errorText="t('No dataset has been found on the provided url')"
      />
    </fieldset>
    <Alert type="error" v-if="errors.length" class="fr-mb-2w">
      <template #title>{{ t("An error occured | Some errors occured", errors.length) }}</template>
      <ul v-if="errors.length > 1">
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <p v-else> {{ errors[0] }}</p>
    </Alert>
    <div class="fr-grid-row fr-grid-row--right">
      <button class="fr-btn" :disabled="linkedDatasetLoading || loading" @click="submit">
        {{ t("Next") }}
      </button>
    </div>
  </Container>
</template>
<script setup lang="ts">
import { computed, reactive, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import { type Dataset, Well } from '@datagouv/components/ts';
import { useSortable } from '@vueuse/integrations/useSortable';
import { helpers } from '@vuelidate/validators'
import Container from '../../components/Ui/Container/Container.vue';
import CardLg from '../../components/dataset/card-lg.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Alert from '../../components/Alert/Alert.vue';
import useFunctionalState from '../../composables/form/useFunctionalState';
import { api } from '../../plugins/api';
import draggableIcon from "../../../../templates/svg/illustrations/draggable.svg";

defineProps<{
  errors: Array<string>,
  steps: Array<string>,
  loading?: boolean,
}>();

const emit = defineEmits<{
  (event: 'next', datasets: Array<Dataset>): void,
}>();

const { t } = useI18n();

const zIndex = (key: number) => {
  return {zIndex: form.datasets.length - key}
};

const form = reactive<{
  datasets: Array<Dataset>;
  linkedDataset: string;
}>({
  datasets: [],
  linkedDataset: "",
});

const linkedDatasetLoading = ref(false);

const selectedDataset = ref<string | null>(null);

const el = ref<HTMLElement | null>(null);
useSortable(el, form.datasets);

const selectedDatasetRef = ref<InstanceType<typeof MultiSelect> | null>(null);

function checkDatasets() {
  return form.datasets.length > 0;
};

const { withAsync } = helpers;

const requiredRules = {
  datasets: { custom: checkDatasets },
  linkedDataset: { linked: withAsync(handleLinkedDatasetChange) },
};

const warningRules = {
  datasets: {},
  linkedDataset: {},
};

const { getFunctionalState, validateRequiredRules, v$, hasWarning, hasError, vWarning$ } = useFunctionalState(form, requiredRules, warningRules);

const state = computed(() => {
  return {
    datasets: getFunctionalState(vWarning$.value.datasets.$dirty, v$.value.datasets.$invalid, vWarning$.value.datasets.$error),
    linkedDataset: getFunctionalState(vWarning$.value.linkedDataset.$dirty, v$.value.linkedDataset.$invalid, vWarning$.value.linkedDataset.$error)
  }
});

function fieldHasError(field: string) {
  return hasError(state, field);
};

function fieldHasWarning(field: string) {
  return hasWarning(state, field);
};

async function handleDatasetChange(datasetId: string) {
  vWarning$.value.datasets.$touch();
  if (datasetId) {
    addDataset(datasetId);
    selectedDatasetRef.value?.selectOption("");
  }
};

async function handleLinkedDatasetChange(value: string) {
  if (value == "") {
    return true;
  } else if (value.includes('/datasets/')) {
    try {
      linkedDatasetLoading.value = true;
      const url = new URL(value);
      const slug = getSlug(url.pathname);
      const resp = await api.get(`datasets/${slug}/`);
      const newDatasetId = resp.data.id;
      addDataset(newDatasetId);
      form.linkedDataset = "";
      return true;
    } catch {
      return false;
    } finally {
      linkedDatasetLoading.value = false;
    }
  } else {
    return false;
  }
};

async function addDataset(datasetId: string) {
  const existingDataset = form.datasets.find(dataset => dataset.id === datasetId);
  if (!existingDataset) {
    let newDataset = await api.get(`datasets/${datasetId}/`);
    form.datasets.push(newDataset.data);
  }
};

function removeDataset(index: number) {
  form.datasets.splice(index, 1);
};

function getSlug(url: string) {
  const parts = url.split('/').filter(part => part !== "");
  return parts.pop();
};

function submit() {
  validateRequiredRules().then(validated => {
    if(validated) {
      emit("next", toValue(form.datasets));
    }
  });
};
</script>
