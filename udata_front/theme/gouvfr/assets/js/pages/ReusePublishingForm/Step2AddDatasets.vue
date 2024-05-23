<template>
  <Container class="fr-container">
    <div class="fr-grid-row">
        <Container>
          <Well
            color="blue-cumulus"
            weight="regular"
            class="fr-mb-2w"
          >
            <div class="fr-grid-row">
              <div class="fr-col-auto fr-mr-3v">
                <!--<img :src="reuseIcon" alt="" />-->
              </div>
              <div class="fr-col">
                <p class="fr-m-0 fr-text--bold">{{ $t('What is a reuse?') }}</p>
                <p class="fr-m-0 fr-text--xs">{{ $t('A reuse is an exemple of public data\'s usage.') }} {{ $t('Publishing a reuse can allow you to gain visibility and start start a dialogue with the dataset producer.') }}</p>
              </div>
            </div>
          </Well>
          <fieldset class="fr-fieldset min-width-0" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("Associated datasets") }}
              </h2>
            </legend>
            <div class="fr-grid-row fr-grid-row--center w-100" v-for="(dataset, index) in datasets" :key="dataset.id">
              <div class="fr-col">
                <CardSm
                  :dataset="dataset"
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
              :placeholder="$t('Look for a dataset')"
              :searchPlaceholder="$t('Search a dataset...')"
              suggestUrl="/datasets/suggest/"
            />
            <p class="fr-hr-or w-100 text-transform-lowercase fr-text--regular">
              <span class="fr-hr-or-text">{{ $t('or') }}</span>
            </p>
            <InputGroup
              :label="$t('Link to the dataset')"
              :placeholder="'https://...'"
              class="w-100"
              v-model="linkedDataset"
              @change="getLinkedDataset"
            />
            <div v-if="datasetNotFound" class="fr-col bg-contrast-grey text-align-center fr-p-2v">
              <p class="fr-text--md fr-text--bold">{{ t('No dataset associated to that link has been found') }}</p>
            </div>
          </fieldset>
          <Alert type="error" v-if="errors.length" class="fr-mt-n2w fr-mb-2w">
            <template #title>{{ t("An error occured | Some errors occured", errors.length) }}</template>
            <ul v-if="errors.length > 1">
              <li v-for="error in errors">{{ error }}</li>
            </ul>
            <p v-else> {{ errors[0] }}</p>
          </Alert>
          <div class="fr-grid-row fr-grid-row--right">
            <button class="fr-btn" @click="submit">
              {{ $t("Next") }}
            </button>
          </div>
        </Container>
      </div>
  </Container>
</template>
<script setup lang="ts">
import { ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import Alert from '../../components/Alert/Alert.vue';
import useFunctionalState from '../../composables/form/useFunctionalState';
import { requiredWithCustomMessage } from '../../i18n';
import { api } from '../../plugins/api';
import CardSm from '../../components/dataset/CardSM.vue';
import { type Dataset, Well } from '@etalab/data.gouv.fr-components';
import { Reuse } from '../../types';
  
const props = defineProps<{
  errors: Array<string>,
  loading?: Boolean,
  reuse: Reuse,
  originalDatasets?: Dataset[]
}>();

const emit = defineEmits<{
  (event: 'next', datasets: Array<Dataset>): void,
}>();

const { t } = useI18n();

const datasets = ref([...props.originalDatasets || []]);
const reuse = ref(props.reuse);
const linkedDataset = ref<String>("");
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
  const regex = /\/datasets\//;
  
  if (regex.test(linkedDataset.value)) {
    const datasetsIndex = linkedDataset.value.indexOf("/datasets/") + "/datasets/".length;
    let modifiedSubstring = linkedDataset.value.substring(datasetsIndex).replace(/-/g, " ");
    
    if (modifiedSubstring.endsWith("/")) {
      modifiedSubstring = modifiedSubstring.slice(0, -1);
    }
    
    try {
      const resp = await api.get('datasets/?q=' + modifiedSubstring);
      const newDatasetId = resp.data.data[0].id;
      addDataset(newDatasetId);
    } catch {
      datasetNotFound.value = true;
    }
  } else {
    datasetNotFound.value = true;
  }
}

const submit = () => {
  validateRequiredRules().then(validated => {
    if(validated) {
      toValue(datasets).forEach(dataset => {
        reuse.value.datasets.push(dataset.id);
      });
      emit("next", toValue(reuse));
    }
  });
};
</script>
