<template>
    <Container>
      <Stepper :steps="steps" :currentStep="1"/>
      <fieldset class="fr-fieldset min-width-0" aria-labelledby="description-legend">
        <legend class="fr-fieldset__legend" id="description-legend">
          <h2 class="subtitle subtitle--uppercase fr-mb-3v">
            {{ t("Associated datasets") }}
          </h2>
        </legend>
        <div class="fr-grid-row fr-grid-row--center w-100" v-for="(dataset, index) in datasets" :key="dataset.id">
          <div class="fr-col">
            <DatasetCard
              :dataset="dataset"
              :dataset-url="dataset.slug"
            />
          </div>
          <div class="fr-col-1 fr-my-auto fr-ml-auto justify-center flex">
            <button
              type="button"
              class="fr-btn fr-btn--sm fr-btn--tertiary fr-icon-delete-line"
              @click="removeDataset(index)"
            ></button>
          </div>
        </div>
        <MultiSelect
          :minimumCharacterBeforeSuggest="2"
          @change="addDataset"
          :placeholder="t('Look for a dataset')"
          :searchPlaceholder="t('Search a dataset...')"
          suggestUrl="/datasets/suggest/"
        />
        <p class="fr-hr-or w-100 text-transform-lowercase fr-text--regular">
          <span class="fr-hr-or-text">{{ t('or') }}</span>
        </p>
        <InputGroup
          :label="t('Link to the dataset')"
          :placeholder="'https://...'"
          class="w-100"
          v-model="linkedDataset"
          @change="getLinkedDataset"
        />
        <div v-if="datasetNotFound" class="fr-col bg-contrast-grey text-align-center fr-p-2v">
          <p class="fr-text--md fr-text--bold">{{ t('No dataset associated to that link has been found') }}</p>
        </div>
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
import { ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Alert from '../../components/Alert/Alert.vue';
import useFunctionalState from '../../composables/form/useFunctionalState';
import { requiredWithCustomMessage } from '../../i18n';
import { api } from '../../plugins/api';
import { type Dataset, DatasetCard } from '@etalab/data.gouv.fr-components';
import { useToast } from "../../composables/useToast";
  
const props = defineProps<{
  errors: Array<string>,
  steps: Array<string>,
  loading?: Boolean,
}>();

const emit = defineEmits<{
  (event: 'next', datasets: Array<Dataset>): void,
}>();

const { t } = useI18n();
const { toast } = useToast();

const datasets = ref<Dataset[]>([]);
const linkedDataset = ref<string>("");
const datasetNotFound = ref<Boolean>(false);

const datasetRequired = requiredWithCustomMessage(t("At least one dataset is required."));

const requiredRules = {
  datasets: { datasetRequired },
};

const warningRules = {
  datasets: { datasetRequired },
};

const { validateRequiredRules } = useFunctionalState({ datasets }, requiredRules, warningRules);

const addDataset = async (datasetId: string) => {
  const existingDataset = datasets.value.find(dataset => dataset.id === datasetId);
  if (!existingDataset) {
    let newDataset = await api.get('datasets/' + datasetId);
    datasets.value.push(newDataset.data);
  }
};

const removeDataset = (index: number) => datasets.value.splice(index, 1);

const getLinkedDataset = async () => {
  datasetNotFound.value = false;
  if (linkedDataset.value.includes('/datasets/')) {
    try {
      const slug = getSlug(linkedDataset.value);
      const resp = await api.get('datasets/' + slug);
      const newDatasetId = resp.data.id;
      addDataset(newDatasetId);
    } catch {
      datasetNotFound.value = true;
    }
  } else {
    datasetNotFound.value = true;
  }
};

function getSlug(url: string) {
  const parts = url.split('/').filter(part => part !== "");
  return parts.pop();
};

const submit = () => {
  validateRequiredRules().then(validated => {
    if(validated) {
      emit("next", toValue(datasets));
    } else {
      toast.error(t("Please provide at least one dataset."));
    }
  });
};
</script>
