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
          <div class="fr-col-auto fr-my-auto fr-ml-auto justify-center flex fr-mr-3v">
            <img :src="draggableIcon" alt="" />
          </div>
          <div class="fr-col relative">
            <DatasetCard
              :dataset="dataset"
              :dataset-url="dataset.slug"
            />
          </div>
          <button
            type="button"
            class="fr-btn fr-btn--tertiary-no-outline fr-btn--secondary--error fr-icon-close-line border-0 absolute right-1px fr-mr-3w fr-mt-5w"
            @click="removeDataset(index)"
          ></button>
        </div>
      </div>
      <MultiSelect
        :minimumCharacterBeforeSuggest="2"
        :placeholder="t('Look for a dataset')"
        :searchPlaceholder="t('Search a dataset...')"
        suggestUrl="/datasets/suggest/"
        :required="true"
        @change="handleDatasetChange"
        :hasError="fieldHasError('datasets')"
        :errorText="t('You need to provide at least one dataset')"
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
      <button class="fr-btn" @click="submit">
        {{ t("Next") }}
      </button>
    </div>
  </Container>
</template>
<script setup lang="ts">
import { computed, reactive, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import { type Dataset, DatasetCard, Well } from '@etalab/data.gouv.fr-components';
import { useSortable } from '@vueuse/integrations/useSortable';
import { helpers } from '@vuelidate/validators'
import Container from '../../components/Ui/Container/Container.vue';
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

const form = reactive<{
  datasets: Array<Dataset>;
  linkedDataset: string;
}>({
  datasets: [],
  linkedDataset: "",
});

const el = ref<HTMLElement | null>(null);
useSortable(el, form.datasets);

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

const { getErrorText, getFunctionalState, validateRequiredRules, v$, hasWarning, hasError, vWarning$ } = useFunctionalState(form, requiredRules, warningRules);

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
  addDataset(datasetId);
};

async function handleLinkedDatasetChange(value: string) {
  if (value == "") {
    return true;
  } else if (value.includes('/datasets/')) {
    try {
      const url = new URL(value);
      const slug = getSlug(url.pathname);
      const resp = await api.get('datasets/' + slug);
      const newDatasetId = resp.data.id;
      addDataset(newDatasetId);
      form.linkedDataset = "";
      return true;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

async function addDataset(datasetId: string) {
  const existingDataset = form.datasets.find(dataset => dataset.id === datasetId);
  if (!existingDataset) {
    let newDataset = await api.get('datasets/' + datasetId);
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
