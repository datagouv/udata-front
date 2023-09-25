<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="2"/>
    <div class="fr-grid-row">
      <Sidemenu
        class="fr-col-12 fr-col-md-5"
        :buttonText="$t('Help')"
        :onRight="true"
        :showBorder="false"
        >
          <template #title>
            <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
            {{ $t('Help') }}
          </template>
          <AccordionGroup>
            <Accordion
              :title= "$t('Name a file')"
              :id="nameAFileAccordionId"
              :state="state.title"
            >
              <div class="markdown fr-m-0">
                <p class="fr-m-0 fr-mb-1w">
                  {{ $t("It is recommended to choose a title that give information to any reuser about the file content. Some cases to avoid :") }}
                </p>
                <ul>
                  <li>{{ $t("to give a too generic title (i.e. : liste.csv) ;") }}</li>
                  <li>{{ $t("to give a too long title that make file handling difficult ;") }}</li>
                  <li>{{ $t("to give a title with accents or special characters (file interoperabity problems) ;") }}</li>
                  <li>{{ $t("to give a too technical title from business nomenclatures.") }}</li>
                </ul>
              </div>
            </Accordion>
            <Accordion
              :title= "$t('Choose the right type of file')"
              :id="chooseTheRightTypeOfFileAccordionId"
              :state="state.type"
            >
              <div class="markdown fr-m-0">
                <p class="fr-m-0 fr-mb-1w">
                  {{ $t("You can choose from the following types:") }}
                </p>
                <ul>
                  <li v-for="fileType in fileTypes">{{ fileType.label }}</li>
                </ul>
              </div>
            </Accordion>
            <Accordion
              :title= "$t('Write a good description')"
              :id="writeAGoodDescriptionAccordionId"
              :state="state.description"
            >
              <div class="markdown fr-m-0">
                <p class="fr-m-0 fr-mb-1w">
                  {{ $t("The description of the dataset eases the data reuse. It covers among others:") }}
                </p>
                <ul>
                  <li>{{ $t("a general description of the dataset ;") }}</li>
                  <li>{{ $t("a description of the data production mode ;") }}</li>
                  <li>{{ $t("a description of the data model ;") }}</li>
                  <li>{{ $t("a description of the data schema ;") }}</li>
                  <li>{{ $t("a description of the metadata ;") }}</li>
                  <li>{{ $t("a description of major changes.") }}</li>
                </ul>
              </div>
            </Accordion>
            <Accordion
              :title= "$t('Select a schema')"
              :id="selectASchemaAccordionId"
              :state="state.schema"
            >
              <i18n-t
                keypath="It is possible to identify an existing data schema by visiting the {schema} website, which references a list of existing data schema."
                tag="p"
                class="fr-m-0 fr-mb-1w"
              >
                <template v-slot:schema>
                  <a :href="schema_documentation_url">schema.data.gouv.fr</a>
                </template>
              </i18n-t>
            </Accordion>
          </AccordionGroup>
      </Sidemenu>
      <div class="fr-col-12 fr-col-md-7">
        <Container>
          <fieldset class="fr-fieldset min-width-0" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ $t("File metadata") }}
              </h2>
            </legend>
            <div class="fr-fieldset__element">
              <FileCard
                class="fr-mb-3v"
                :filename="file.file.name"
                :filesize="file.filesize"
                :format="file.format"
                :lastModified="file.file.lastModified"
                :missingMetadata="v$.$invalid"
                :title="file.title || file.file.name"
                :hideActions="true"
              />
            </div>
            <LinkedToAccordion
              class="fr-fieldset__element min-width-0"
              :accordion="nameAFileAccordionId"
              @blur="v$.title.$touch"
            >
              <InputGroup
                :label="$t('File title')"
                :required="true"
                v-model="file.title"
                :hasError="stateHasError('title')"
                :errorText="getErrorText('title')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element min-width-0"
              :accordion="chooseTheRightTypeOfFileAccordionId"
              @blur="v$.type.$touch"
            >
              <SelectGroup
                :label="$t('Type')"
                :required="true"
                v-model="file.type"
                :hasError="stateHasError('type')"
                :errorText="getErrorText('type')"
                :options="fileTypes"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element min-width-0"
              :accordion="writeAGoodDescriptionAccordionId"
              @blur="v$.description.$touch"
            >
              <InputGroup
                :label="$t('Description')"
                :required="true"
                v-model="file.description"
                :hasError="stateHasError('description')"
                :errorText="getErrorText('description')"
                type="textarea"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element min-width-0"
              :accordion="selectASchemaAccordionId"
              @blur="v$.schema.$touch"
            >
              <SchemaSelect
                :allOption="$t('Select a schema')"
                :values="file.schema"
                @change="(value) => file.schema = value"
                :showExplanation="false"
              />
            </LinkedToAccordion>
          </fieldset>
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
<script>
import { computed, defineComponent, reactive } from 'vue';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import FileCard from '../../components/Form/FileCard/FileCard.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import SchemaSelect from "../../components/SchemaSelect/SchemaSelect.vue";
import SelectGroup from '../../components/Form/SelectGroup/SelectGroup.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import useFunctionalState from '../../composables/useFunctionalState';
import useUid from "../../composables/useUid";
import { schema_documentation_url } from "../../config";
import { RESOURCE_TYPE, getResourceLabel } from '../../helpers';
import { required } from '../../i18n';

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, InputGroup, FileCard, LinkedToAccordion, SchemaSelect, SelectGroup, Sidemenu, Stepper },
  emits: ["next"],
  props: {
    steps: {
      type: Array,
      required: true,
    },
    datasetFile: {
      /** @type {import("vue").PropType<import("../../types").DatasetFile>} */
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const { id: nameAFileAccordionId } = useUid("accordion");
    const { id: chooseTheRightTypeOfFileAccordionId } = useUid("accordion");
    const { id: writeAGoodDescriptionAccordionId } = useUid("accordion");
    const { id: selectASchemaAccordionId } = useUid("accordion");

    /** @type {import("vue").UnwrapNestedRefs<import("../../types").DatasetFile>} */
    const file = reactive({...props.datasetFile});

    const requiredRules = {
      title: { required },
      type: { required },
      description: { required },
      schema: {},
    };

    const { getErrorText, getFunctionalState, hasError, validateRequiredRules, v$ } = useFunctionalState(file, requiredRules, requiredRules);

    /**
     * @type {import("vue").ComputedRef<Record<string, import("../../types").PublishingFormAccordionState>>}
     */
     const state = computed(() => {
      return {
        title: getFunctionalState(v$.value.title.$dirty, v$.value.title.$error, false),
        type: getFunctionalState(v$.value.type.$dirty, v$.value.type.$error, false),
        description: getFunctionalState(v$.value.description.$dirty, v$.value.description.$error, false),
        schema: v$.value.schema.$dirty ? "info" : "disabled",
      };
    });


    /** @type {Array<{label: string, value: import("../../types").ResourceType}>} */
    const fileTypes = RESOURCE_TYPE.map(type => ({label: getResourceLabel(type), value: type}));

    /**
     *
     * @param {string} field
     */
     const stateHasError = (field) => hasError(state, field);

     const submit = () => {
      validateRequiredRules().then(validated => {
        if(validated) {
          emit("next", file);
        }
      });
    };

    return {
      nameAFileAccordionId,
      chooseTheRightTypeOfFileAccordionId,
      writeAGoodDescriptionAccordionId,
      selectASchemaAccordionId,
      fileTypes,
      file,
      schema_documentation_url,
      state,
      getErrorText,
      stateHasError,
      submit,
      v$,
    }
  },
});
</script>
