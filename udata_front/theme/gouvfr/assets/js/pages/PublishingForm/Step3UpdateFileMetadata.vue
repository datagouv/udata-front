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
                  {{ $t("It is recommended to choose a title that can inform any user about the content of the file. Some practices to avoid:") }}
                </p>
                <ul>
                  <li>{{ $t('giving a too generic title (e.g., "list.csv");') }}</li>
                  <li>{{ $t("giving a too long title that would make the file manipulation difficult;") }}</li>
                  <li>{{ $t("giving a title containing accents or special characters (file interoperability issues);") }}</li>
                  <li>{{ $t("giving a title that is too technical and derived from business nomenclatures.") }}</li>
                </ul>
              </div>
            </Accordion>
            <Accordion
              :title="$t('Publish the correct file types')"
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
              :title= "$t('Choose the right format')"
              :id="chooseTheCorrectFormatAccordionId"
              :state="state.format"
            >
            <div class="markdown fr-m-0">
                <p class="fr-m-0 fr-mb-1w">
                  {{ $t("The formats must be:") }}
                </p>
                <ul>
                  <li>{{ $t("open : an open format doesn't add technical specifications that restrict data use (i.e. using a paid software) ;") }}</li>
                  <li>{{ $t("easily reusable : a format easily reusable implies that anybody or server can reuse easily the dataset ;") }}</li>
                  <li>{{ $t("usable in an automated processing system : an automated processing system allows to make automatic operations, related to data exploitation (i.e. a CSV file is easily usable by an automated system unlike a PDF file).") }}</li>
                </ul>
              </div>
            </Accordion>
            <Accordion
              :title= "$t('Add documentation')"
              :id="writeAGoodDescriptionAccordionId"
              :state="state.description"
            >
              <div class="markdown fr-m-0">
                <p class="fr-m-0 fr-mb-1w">
                  {{ $t("The description of a file facilitates the reuse of data. It includes, among others:") }}
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
              <Well class="fr-mt-1w" v-if="fieldHasWarning('description')" color="orange-terre-battue">
                {{ getWarningText("description") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Select a schema')"
              :id="selectASchemaAccordionId"
              :state="state.schema"
            >
              <i18n-t
                keypath="It is possible to identify an existing data schema by visiting the {schema} website, that references a list of existing data schema."
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
                :file="file"
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
                :hasError="fieldHasError('url')"
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
                :hasError="fieldHasError('title')"
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
                :hasError="fieldHasError('type')"
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
                :listUrl="allowedExtensionsUrl"
                :suggestUrl="isRemote ? 'datasets/suggest/formats/' : null"
                :values="file.format"
                @change="(value) => file.format = value"
                :required="true"
                :hasError="fieldHasError('format')"
                :hasWarning="fieldHasWarning('format')"
                :errorText="getErrorText('format')"
                :allOption="$t('Select a format')"
                :addAllOption="false"
                :addNewOption="isRemote"
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
                :hasWarning="fieldHasWarning('description')"
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
                :addNewOption="isRemote"
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
import { Well } from "@etalab/data.gouv.fr-components";
import { computed, defineComponent, ref } from 'vue';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import FileCard from '../../components/Form/FileCard/FileCard.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import MultiSelect from "../../components/MultiSelect/MultiSelect.vue";
import SchemaSelect from "../../components/SchemaSelect/SchemaSelect.vue";
import SelectGroup from '../../components/Form/SelectGroup/SelectGroup.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import useUid from "../../composables/useUid";
import useFileValidation from '../../composables/form/useFileValidation';
import { schema_documentation_url } from "../../config";
import { RESOURCE_TYPE, getResourceLabel } from '../../helpers';
import { useI18n } from 'vue-i18n';
import { getAllowedExtensionsUrl } from '../../api/resources';

export default defineComponent({
  components: { Accordion, AccordionGroup, Container, InputGroup, FileCard, LinkedToAccordion, MultiSelect, SchemaSelect, SelectGroup, Sidemenu, Stepper, Well },
  emits: ["next"],
  props: {
    steps: {
      type: Array,
      required: true,
    },
    datasetFile: {
      /** @type {import("vue").PropType<import("../../types").NewDatasetFile>} */
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

    const allowedExtensionsUrl = getAllowedExtensionsUrl();

    /** @type {import("vue").Ref<import("../../types").NewDatasetFile>} */
    const file = ref({...props.datasetFile});

    const { isRemote, getErrorText, getWarningText, state, fieldHasError, fieldHasWarning, validateRequiredRules, v$, vWarning$ } = useFileValidation(file);

    const nameAFile = computed(() => isRemote.value ? t("Name a link") : t("Name a file"));
    const fileTitle = computed(() => isRemote.value ? t("Link title") : t("File title"));

    /** @type {Array<{label: string, value: import("../../types").ResourceType}>} */
    const fileTypes = RESOURCE_TYPE.map(type => ({label: getResourceLabel(type), value: type}));

     const submit = () => {
      validateRequiredRules().then(validated => {
        if(validated) {
          emit("next", file);
        }
      });
    };

    return {
      allowedExtensionsUrl,
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
      fieldHasError,
      fieldHasWarning,
      submit,
      v$,
      vWarning$,
      whatIsAMimeTypeAccordionId,
    }
  },
});
</script>
