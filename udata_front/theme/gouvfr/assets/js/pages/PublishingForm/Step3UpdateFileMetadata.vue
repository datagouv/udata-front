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
              :title= "$t('Choose the correct link')"
              :id="chooseTheCorrectLinkAccordionId"
              :state="state.url"
              v-if="isRemote"
            >
              {{ $t("It's advised to put the link to the file itself instead of a web page to allow {site} to parse it.") }}
            </Accordion>
            <Accordion
              :title= "nameAFile"
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
              :title="$t('Choose the right type of file')"
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
              :title= "$t('Choose the correct format')"
              :id="chooseTheCorrectFormatAccordionId"
              :state="state.format"
            >
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
              <Well class="fr-mt-1w" v-if="stateHasWarning('description')" color="orange-terre-battue">
                {{ getWarningText("description") }}
              </Well>
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
            <Accordion
              :title= "$t('What is a Mime type')"
              :id="whatIsAMimeTypeAccordionId"
              :state="state.mime"
            >
              {{ $t("") }}
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
                :filename="file.file?.name"
                :filesize="file.filesize"
                :format="file.format"
                :lastModified="file.file?.lastModified"
                :missingMetadata="v$.$invalid"
                :title="file.title || file.file?.name || ''"
                :hideActions="true"
              />
            </div>
            <LinkedToAccordion
              v-if="isRemote"
              class="fr-fieldset__element min-width-0"
              :accordion="chooseTheCorrectLinkAccordionId"
              @blur="v$.url.$touch"
            >
              <InputGroup
                :label="$t('Link url')"
                :required="true"
                v-model="file.url"
                :hasError="stateHasError('url')"
                :errorText="getErrorText('url')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element min-width-0"
              :accordion="nameAFileAccordionId"
              @blur="v$.title.$touch"
            >
              <InputGroup
                :label="fileTitle"
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
              :accordion="chooseTheCorrectFormatAccordionId"
              @blur="v$.format.$touch"
            >
              <MultiSelect
                :placeholder="$t('Format')"
                :searchPlaceholder="$t('Search a format...')"
                listUrl="/datasets/extensions/"
                :values="file.format"
                @change="(value) => file.format = value"
                :required="true"
                :hasError="stateHasError('format')"
                :hasWarning="stateHasWarning('format')"
                :errorText="getErrorText('format')"
                :allOption="$t('Select a format')"
                :addAllOption="false"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element min-width-0"
              :accordion="writeAGoodDescriptionAccordionId"
              @blur="vWarning$.description.$touch"
            >
              <InputGroup
                :label="$t('Description')"
                v-model="file.description"
                :hasWarning="stateHasWarning('description')"
                :errorText="getWarningText('description')"
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
            <LinkedToAccordion
              class="fr-fieldset__element min-width-0"
              :accordion="whatIsAMimeTypeAccordionId"
              @blur="v$.mime.$touch"
            >
              <MultiSelect
                :placeholder="$t('Mime type')"
                :searchPlaceholder="$t('Search a mime type...')"
                suggestUrl="datasets/suggest/mime/"
                :values="file.mime"
                @change="(value) => file.mime = value"
                :allOption="$t('Select a mime type')"
                :addAllOption="false"
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
import MultiSelect from "../../components/MultiSelect/Multiselect.vue";
import SchemaSelect from "../../components/SchemaSelect/SchemaSelect.vue";
import SelectGroup from '../../components/Form/SelectGroup/SelectGroup.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Well from "../../components/Ui/Well/Well.vue";
import useFunctionalState from '../../composables/useFunctionalState';
import useUid from "../../composables/useUid";
import { quality_description_length, schema_documentation_url } from "../../config";
import { RESOURCE_TYPE, getResourceLabel } from '../../helpers';
import { minLengthWarning, required, requiredIf, requiredWithCustomMessage } from '../../i18n';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, InputGroup, FileCard, LinkedToAccordion, MultiSelect, SchemaSelect, SelectGroup, Sidemenu, Stepper, Well },
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
    const { t } = useI18n();
    const { id: chooseTheCorrectLinkAccordionId } = useUid("accordion");
    const { id: nameAFileAccordionId } = useUid("accordion");
    const { id: chooseTheRightTypeOfFileAccordionId } = useUid("accordion");
    const { id: chooseTheCorrectFormatAccordionId } = useUid("accordion");
    const { id: writeAGoodDescriptionAccordionId } = useUid("accordion");
    const { id: selectASchemaAccordionId } = useUid("accordion");
    const { id: whatIsAMimeTypeAccordionId } = useUid("accordion");

    /** @type {import("vue").UnwrapNestedRefs<import("../../types").DatasetFile>} */
    const file = reactive({...props.datasetFile, description: ""});

    const isRemote = computed(() => file.filetype === 'remote');

    const nameAFile = computed(() => isRemote.value ? t("Name a link") : t("Name a file"));
    const fileTitle = computed(() => isRemote.value ? t("Link title") : t("File title"));

    const requiredRules = {
      url: { required: requiredIf(isRemote.value) },
      title: { required },
      type: { required },
      format: { required },
      schema: {},
      mime: {},
    };

    const descriptionAdvised = requiredWithCustomMessage(t("It's advised to add a description."));

    const warningRules = {
      url: { required: requiredIf(isRemote.value) },
      title: { required },
      type: { required },
      format: { required },
      description: { required: descriptionAdvised, minLengthValue: minLengthWarning(quality_description_length) },
    };

    const { getErrorText, getWarningText, getFunctionalState, hasError, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState(file, requiredRules, warningRules);

    /**
     * @type {import("vue").ComputedRef<Record<string, import("../../types").PublishingFormAccordionState>>}
     */
     const state = computed(() => {
      return {
        url: v$.value.url.$dirty ? "info" : "disabled",
        title: getFunctionalState(v$.value.title.$dirty, v$.value.title.$error, false),
        type: getFunctionalState(v$.value.type.$dirty, v$.value.type.$error, false),
        format: v$.value.format.$dirty ? "info" : "disabled",
        description: getFunctionalState(vWarning$.value.description.$dirty, false, vWarning$.value.description.$error),
        schema: v$.value.schema.$dirty ? "info" : "disabled",
        mime: v$.value.mime.$dirty ? "info" : "disabled",
      };
    });


    /** @type {Array<{label: string, value: import("../../types").ResourceType}>} */
    const fileTypes = RESOURCE_TYPE.map(type => ({label: getResourceLabel(type), value: type}));

    /**
     *
     * @param {string} field
     */
     const stateHasError = (field) => hasError(state, field);

     /**
     *
     * @param {string} field
     */
     const stateHasWarning = (field) => hasWarning(state, field);

     const submit = () => {
      validateRequiredRules().then(validated => {
        if(validated) {
          emit("next", file);
        }
      });
    };

    return {
      chooseTheCorrectLinkAccordionId,
      nameAFileAccordionId,
      chooseTheRightTypeOfFileAccordionId,
      chooseTheCorrectFormatAccordionId,
      writeAGoodDescriptionAccordionId,
      selectASchemaAccordionId,
      fileTypes,
      file,
      fileTitle,
      isRemote,
      nameAFile,
      schema_documentation_url,
      state,
      getErrorText,
      getWarningText,
      stateHasError,
      stateHasWarning,
      submit,
      v$,
      vWarning$,
      whatIsAMimeTypeAccordionId,
    }
  },
});
</script>
