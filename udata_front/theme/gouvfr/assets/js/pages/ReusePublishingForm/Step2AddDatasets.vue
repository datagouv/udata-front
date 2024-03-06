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
              <div v-for="(dataset, index) in datasets" :key="dataset.id">
                <div class="fr-grid-row fr-grid-row--center">
                  <div class="fr-col-10">
                    <cardLg
                      :dataset="dataset"
                    />
                  </div>
                  <div class="fr-col-2 fr-m-auto fr-p-auto">
                    <button
                      type="button"
                      class="fr-btn fr-btn--sm fr-btn--tertiary fr-icon-delete-line"
                      @click="removeDataset(index)"
                    ></button>
                  </div>
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
            <div class="fr-grid-row fr-grid-row--right">
              <button class="fr-btn" @click="">
                {{ $t("Next") }}
              </button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { computed, defineComponent, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import Accordion from '../../components/Accordion/Accordion.vue';
  import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
  import Alert from '../../components/Alert/Alert.vue';
  import ButtonLoader from '../../components/Form/ButtonLoader.vue';
  import Container from '../../components/Ui/Container/Container.vue';
  import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
  import FileCard from '../../components/Form/FileCard/FileCard.vue';
  import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
  import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
  import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
  import Stepper from '../../components/Form/Stepper/Stepper.vue';
  import UploadModalButton from '../../components/Form/UploadGroup/UploadModalButton.vue';
  import Well from "../../components/Ui/Well/Well.vue";
  import useUid from "../../composables/useUid";
  import useFunctionalState from '../../composables/form/useFunctionalState';
  import { requiredWithCustomMessage, withMessage } from '../../i18n';
  import editIcon from "../../../../templates/svg/illustrations/edit.svg";
  import { isLoading, isLoaded } from "../../api/resources";
  import { api } from '../../plugins/api';
  import cardLg from '../../components/dataset/card-lg.vue';
  import DeleteButton from '../../components/utils/DeleteButton/DeleteButton.vue';
  import { Input } from '../../components/Form/InputGroup/InputGroup.stories';
  
  export default defineComponent({
    components: { Accordion, AccordionGroup, Alert, ButtonLoader, Container, FileCard, InputGroup, LinkedToAccordion, MultiSelect, Sidemenu, Stepper, UploadModalButton, Well, cardLg, DeleteButton, Input },
    emits: ["editFile", "next"],
    props: {
      errors: {
        type: Array,
        required: true,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      steps: {
        type: Array,
        required: true,
      },
      originalDatasets: {
        /** @type {import("vue").PropType<Readonly<Array<import("../../types").NewDataset>>>} */
        type: Array,
        required: true,
      }
    },
    setup(props, { emit }) {
      const { t } = useI18n();
      const { id: addDatasetsAccordionId } = useUid("accordion");
  
      const datasets = ref([...props.originalDatasets]);
  
      const datasetRequired = requiredWithCustomMessage(t("At least one dataset is required."));

      const requiredRules = {
        datasets: { datasetRequired },
      };
  
      const warningRules = {
        datasets: { datasetRequired },
      };
  
      const { getErrorText, getFunctionalState, getWarningText, hasError, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState({ datasets }, requiredRules, warningRules);
  
      /**
       *
       * @param {string} datasetId
       */
      const addDataset = async (datasetId) => {
        console.log(datasetId);
        let newDataset = await api.get('datasets/' + datasetId);
        console.log(newDataset.data);
        datasets.value.push(newDataset.data);
        console.log(datasets.value);
      };
  
      /**
       *
       * @param {number} index
       */
      const removeDataset = (index) => datasets.value.splice(index, 1);
  
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
            emit("next", files);
          }
        });
      };
  
      /**
       *
       * @param {string} field
       */
      const fieldHasError = (field) => hasError(state, field);
  
      /**
       *
       * @param {string} field
       */
      const fieldHasWarning = (field) => hasWarning(state, field);
  
      return {
        addDataset,
        datasets,
        editIcon,
        getErrorText,
        getFunctionalState,
        getWarningText,
        isLoaded,
        isLoading,
        addDatasetsAccordionId,
        removeDataset,
        state,
        fieldHasError,
        fieldHasWarning,
        submit,
        touch,
        v$,
        vWarning$,
      };
    },
  });
  </script>
  