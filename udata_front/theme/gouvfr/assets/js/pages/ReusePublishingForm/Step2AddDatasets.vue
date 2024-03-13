<template>
    <div class="fr-container">
      <Stepper :steps="steps" :currentStep="1"/>
      <div class="fr-grid-row">
        <Sidemenu
          class="fr-col-12 fr-col-md-5"
          :buttonText="$t('Help')"
          :onRight="true"
          :fixed="true"
          :showBorder="false"
        >
          <template #title>
            <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
            {{ $t('Help') }}
          </template>
          <Accordion
            :title= "$t('Associate datasets to your reuse')"
            :id="addDatasetsAccordionId"
            :state="state.datasets"
            :opened="true"
          >
            <div class="markdown fr-m-0">
              <p class="fr-m-0 fr-mb-1w">
                {{ $t("By default, your reuse will be linked to the dataset that served as your starting point. But if your reuse has involved other datasets, you can associate them with your reuse at this stage.") }}
              </p>
              <p class="fr-m-0 fr-mb-1w">
                {{ $t("It is important to associate all the datasets used, as this allows for understanding the intersections that were necessary and improving the visibility of your reuse.") }}
              </p>
            </div>
            <Well class="fr-mt-1w" v-if="fieldHasWarning('datasets')" color="orange-terre-battue">
              {{ getWarningText("files") }}
            </Well>
          </Accordion>
        </Sidemenu>
        <div class="fr-col-12 fr-col-md-7">
          <Container>
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
              <LinkedToAccordion
                class="fr-fieldset__element min-width-0"
                :accordion="addDatasetsAccordionId"
                @blur="touch"
              >
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
                />
              </LinkedToAccordion>
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
      </div>
    </div>
  </template>
<script setup lang="ts">
import { computed, reactive, ref, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import Accordion from '../../components/Accordion/Accordion.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Well from "../../components/Ui/Well/Well.vue";
import useUid from "../../composables/useUid";
import useFunctionalState from '../../composables/form/useFunctionalState';
import { requiredWithCustomMessage, withMessage } from '../../i18n';
import { api } from '../../plugins/api';
import CardSm from '../../components/dataset/CardSm.vue';
import { Dataset } from '@etalab/data.gouv.fr-components';
  
const props = defineProps<{
  errors: Array<string>,
  loading?: Boolean,
  steps: Array<string>,
  reuse: Reuse,
  originalDatasets?: Array<any>
}>();

const emit = defineEmits<{
  (event: 'next', datasets: Array<Dataset>): void,
}>();

const { t } = useI18n();
const { id: addDatasetsAccordionId } = useUid("accordion");

const datasets = ref([...props.originalDatasets]);

const reuse = ref(props.reuse)

const datasetRequired = requiredWithCustomMessage(t("At least one dataset is required."));

const requiredRules = {
  datasets: { datasetRequired },
};

const warningRules = {
  datasets: { datasetRequired },
};

const { getFunctionalState, getWarningText, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState({ datasets }, requiredRules, warningRules);

const addDataset = async (datasetId: string) => {
  const existingDataset = datasets.value.find(dataset => dataset.id === datasetId);
  if (!existingDataset) {
    let newDataset = await api.get('datasets/' + datasetId);
    datasets.value.push(newDataset.data);
  }
};

const removeDataset = (index: number) => datasets.value.splice(index, 1);

/**
 * @type {import("vue").ComputedRef<Record<string, import("../../types").AccordionFunctionalState>>}
 */
const state = computed(() => {
  return {
    datasets: getFunctionalState(vWarning$.value.datasets.$dirty, v$.value.datasets.$invalid, vWarning$.value.datasets.$error),
  };
});
  
const touch = () => {
  v$.value.datasets.$touch();
  vWarning$.value.datasets.$touch();
};

const submit = () => {
  validateRequiredRules().then(validated => {
    if(validated) {
      toValue(datasets).forEach(dataset => {
        reuse.value.datasets.push(dataset.id);
      });
      emit("next", reuse);
    }
  });
};

const fieldHasWarning = (field: string) => hasWarning(state, field);
</script>
