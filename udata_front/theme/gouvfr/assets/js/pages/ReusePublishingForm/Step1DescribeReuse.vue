<template>
    <div class="fr-container">
      <Stepper :steps="steps" :currentStep="0"/>
      <div class="fr-grid-row">
        <Sidemenu
          class="fr-col-12 fr-col-md-5"
          :buttonText="$t('Help')"
          :onRight="true"
          :fixed="true"
          >
            <template #title>
              <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
              {{ $t('Help') }}
            </template>
            <AccordionGroup>
              <Accordion
                :title= "$t('Naming your reuse')"
                :id="nameReuseAccordionId"
                :state="state.title"
              >
                <p class="fr-m-0">
                  {{ $t("The title of your reuse should be as precise and specific as possible.") }} <br/>
                  {{ $t("It should also correspond to the vocabulary used by users.") }} <br/>
                  {{ $t("They often search for data in a search engine.") }}
                </p>
              </Accordion>
              <Accordion
                :title= "$t('What link to provide')"
                :id="addLinkAccordionId"
                :state="state.url"
              >
                <p class="fr-m-0">
                  {{ $t("You have the option to add an acronym to your reuse. The letters that make up this acronym do not need to be separated by periods.") }}
                </p>
              </Accordion>
              <Accordion
                :title= "$t('Choose a type')"
                :id="addTypeAccordionId"
                :state="state.type"
              >
                <div class="markdown fr-m-0">
                  <p class="fr-m-0">
                    {{ $t(`The description of your reuse allows to obtain information about the content and structure of the published resources. You can provide:`) }}
                  </p>
                  <ul class="fr-mt-3v">
                    <li>{{ $t("A list of the files available ;") }}</li>
                    <li>{{ $t("A description of the file format ;") }}</li>
                    <li>{{ $t("The update frequency.") }}</li>
                  </ul>
                  <ul class="fr-mt-3v">
                    <li>{{ $t("Motivations for creating the reuse ;") }}</li>
                    <li>{{ $t("The composition of the reuse ;") }}</li>
                    <li>{{ $t("The data collection process ;") }}</li>
                    <li>{{ $t("Data preprocessing ;") }}</li>
                    <li>{{ $t("reuse dissemination ;") }}</li>
                    <li>{{ $t("reuse maintenance ;") }}</li>
                    <li>{{ $t("Legal and ethical considerations.") }}</li>
                  </ul>
                  <Well class="fr-mt-1w" v-if="fieldHasWarning('type')" color="orange-terre-battue">
                    {{ getWarningText("type") }}
                  </Well>
                </div>
              </Accordion>
              <Accordion
                :title= "$t('Choose a theme')"
                :id="addThemeAccordionId"
                :state="state.theme"
              >
                <p class="fr-m-0">
                  {{ $t("Tags characterize your reuse. They are public and improve the reuse's search engine optimization during a user search.") }}
                </p>
                <Well class="fr-mt-1w" v-if="fieldHasWarning('theme')" color="orange-terre-battue">
                  {{ getWarningText("theme") }}
                </Well>
              </Accordion>
              <Accordion
                :title= "$t('Describe your reuse')"
                :id="addDescriptionAccordionId"
                :state="state.description"
              >
                <p class="fr-m-0">
                  {{ $t("Licenses define the rules for reuse. By choosing a reuse license, you ensure that the published reuse will be reused according to the usage conditions you have defined.") }}
                </p>
                <Well class="fr-mt-1w" v-if="fieldHasWarning('description')" color="orange-terre-battue">
                  {{ getWarningText("description") }}
                </Well>
              </Accordion>
              <Accordion
                :title= "$t('Add keywords')"
                :id="addTagsAccordionId"
                :state="state.tags"
              >
                <p class="fr-m-0">
                  {{ $t("The update frequency corresponds to how often you plan to update the published data. This update frequency is only indicative.") }}
                </p>
                <Well class="fr-mt-1w" v-if="fieldHasWarning('tags')" color="orange-terre-battue">
                  {{ getWarningText("tags") }}
                </Well>
              </Accordion>
              <Accordion
                :title= "$t('Choose an image')"
                :id="addImageAccordionId"
                :state="state.image"
              >
                <p class="fr-m-0">
                  {{ $t("The temporal coverage indicates the time range of the published data.") }} <br/>
                  {{ $t("For example : from 2012 to 2015.") }}
                </p>
                <Well class="fr-mt-1w" v-if="fieldHasWarning('image')" color="orange-terre-battue">
                  {{ getWarningText("image") }}
                </Well>
              </Accordion>
            </AccordionGroup>
        </Sidemenu>
        <div class="fr-col-12 fr-col-md-7">
          <Container>
            <Well
              color="blue-cumulus"
              weight="regular"
              class="fr-mb-2w"
            >
              <div class="fr-grid-row">
                <div class="fr-col-auto fr-mr-3v">
                  <img :src="editIcon" alt="" />
                </div>
                <div class="fr-col">
                  <p class="fr-m-0 fr-text--bold">{{ $t('What is a reuse?') }}</p>
                  <p class="fr-m-0 fr-text--xs">{{ $t('A reuse is an exemple of public data\'s usage') }}</p>
                </div>
              </div>
            </Well>
            <fieldset class="fr-fieldset" aria-labelledby="description-legend">
              <legend class="fr-fieldset__legend" id="description-legend">
                <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                  {{ $t("Producer") }}
                </h2>
              </legend>
              <div class="fr-fieldset__element">
                <MultiSelect
                  :required="true"
                  :minimumCharacterBeforeSuggest="2"
                  :placeholder="$t('Check the identity with which you want to publish')"
                  :searchPlaceholder="$t('Select an organization')"
                  suggestUrl="/tags/suggest/"
                  :values="reuse.tags"
                  :addNewOption="true"
                />
              </div>
            </fieldset>
            <fieldset class="fr-fieldset" aria-labelledby="description-legend">
              <legend class="fr-fieldset__legend" id="description-legend">
                <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                  {{ $t("Description") }}
                </h2>
              </legend>
              <LinkedToAccordion
                class="fr-fieldset__element"
                :accordion="nameReuseAccordionId"
                @blur="vWarning$.title.$touch"
              >
                <InputGroup
                  :aria-describedby="nameReuseAccordionId"
                  :label="$t('Reuse name')"
                  :required="true"
                  v-model="reuse.title"
                  :hasError="fieldHasError('title')"
                  :hasWarning="fieldHasWarning('title')"
                  :errorText="getErrorText('title')"
                />
              </LinkedToAccordion>
              <LinkedToAccordion
                class="fr-fieldset__element"
                :accordion="addLinkAccordionId"
                @blur="vWarning$.url.$touch"
              >
                <InputGroup
                  :aria-describedby="addLinkAccordionId"
                  :label="$t('Link')"
                  :placeholder="$t('https://...')"
                  :required="true"
                  v-model="reuse.link"
                />
              </LinkedToAccordion>
              <LinkedToAccordion
                class="fr-fieldset__element"
                :accordion="addTypeAccordionId"
                @blur="vWarning$.type.$touch"
              >
              <MultiSelect
                  :required="true"
                  :placeholder="$t('Type')"
                  :searchPlaceholder="$t('Select a type')"
                  :listUrl="typesUrl"
                  :values="reuse.type"
                />
              </LinkedToAccordion>
              <LinkedToAccordion
                class="fr-fieldset__element"
                :accordion="useThemeAccordionId"
                @blur="vWarning$.theme.$touch"
              >
                <MultiSelect
                  :required="true"
                  :placeholder="$t('Theme')"
                  :searchPlaceholder="$t('Select a theme...')"
                  :listUrl="topicsUrl"
                  :values="reuse.theme"
                />
              </LinkedToAccordion>
              <LinkedToAccordion
                class="fr-fieldset__element"
                :accordion="addDescriptionAccordionId"
                @blur="vWarning$.description.$touch"
              >
                <InputGroup
                  :label="$t('Description')"
                  :required="true"
                  type="textarea"
                  v-model="reuse.description"
                  :hasError="fieldHasError('description')"
                  :hasWarning="fieldHasWarning('description')"
                  :errorText="getErrorText('description')"
                />
              </LinkedToAccordion>
              <LinkedToAccordion
                class="fr-fieldset__element"
                :accordion="addTagsAccordionId"
                @blur="vWarning$.tags.$touch"
              >
                <MultiSelect
                  :minimumCharacterBeforeSuggest="2"
                  @change="(value) => reuse.tags = value"
                  :placeholder="$t('Tags')"
                  :searchPlaceholder="$t('Search a tag...')"
                  suggestUrl="/tags/suggest/"
                  :values="reuse.tags"
                  :hasWarning="fieldHasWarning('tags')"
                  :multiple="true"
                  :addNewOption="true"
                />
              </LinkedToAccordion>
              <LinkedToAccordion
                class="fr-fieldset__element"
                :accordion="addImageAccordionId"
                @blur="vWarning$.image.$touch"
              >
                <UploadGroup
                  label="Test"
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
  import { minLengthWarning, not, required, requiredWithCustomMessage, sameAs } from '../../i18n';
  import Accordion from '../../components/Accordion/Accordion.vue';
  import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
  import Container from '../../components/Ui/Container/Container.vue';
  import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
  import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
  import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
  import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
  import Stepper from '../../components/Form/Stepper/Stepper.vue';
  import Well from "../../components/Ui/Well/Well.vue";
  import useUid from "../../composables/useUid";
  import useFunctionalState from '../../composables/form/useFunctionalState';
  import editIcon from "../../../../templates/svg/illustrations/edit.svg";
  import { quality_description_length, title } from "../../config";
  import { useI18n } from 'vue-i18n';
  import { getReuseTypesUrl, getReuseTopicsUrl } from '../../api/reuses';
  import UploadGroup from '../../components/Form/UploadGroup/UploadGroup.vue';
  
  export default defineComponent({
    components: { Accordion, AccordionGroup, Container, InputGroup, LinkedToAccordion, MultiSelect, Stepper, Well, Sidemenu, MultiSelect, UploadGroup },
    emits: ["next"],
    props: {
      originalReuse: {
        /** @type {import("vue").PropType<import("../../types").Reuse>} */
        type: Object,
        required: true
      },
      steps: {
        type: Array,
        required: true,
      }
    },
    setup(props, { emit }) {
      const { t } = useI18n();
      const { id: nameReuseAccordionId } = useUid("accordion");
      const { id: addLinkAccordionId } = useUid("accordion");
      const { id: addTypeAccordionId } = useUid("accordion");
      const { id: addThemeAccordionId } = useUid("accordion");
      const { id: addDescriptionAccordionId } = useUid("accordion");
      const { id: addTagsAccordionId } = useUid("accordion");
      const { id: addImageCoverageAccordionId } = useUid("accordion");
  
      const reuse = reactive({...props.originalReuse});
      const topicsUrl = getReuseTopicsUrl();
      const typesUrl = getReuseTypesUrl();
  
      const notUnknown = not(t("The value must be different than unknown."), sameAs("unknown"));
      const tagsRequired = requiredWithCustomMessage(t("Adding tags helps improve the SEO of your data."));
      const temporalCoverageRequired = requiredWithCustomMessage(t("You did not provide the temporal coverage."));
      const spatialGranularityRequired = requiredWithCustomMessage(t("You have not specified the spatial granularity."));
  
      const requiredRules = {
        title: { required },
        url: { required },
        type: { required },
        theme: { required },
        description: { required },
        image: { required },
      };
  
      const warningRules = {
        title: { required },
        url: { required },
        type: { required },
        theme: { required },
        description: {required, minLengthValue: minLengthWarning(quality_description_length), },
        tags: {},
        image: { required },
      };
  
      const { getErrorText, getFunctionalState, getWarningText, hasError, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState(reuse, requiredRules, warningRules);
  
      /**
       * @type {import("vue").ComputedRef<Record<string, import("../../types").PublishingFormAccordionState>>}
       */
      const state = computed(() => {
        return {
          title: getFunctionalState(vWarning$.value.title.$dirty, v$.value.title.$invalid, vWarning$.value.title.$error),
          url: getFunctionalState(vWarning$.value.url.$dirty, v$.value.url.$invalid, vWarning$.value.url.$error),
          type: getFunctionalState(vWarning$.value.type.$dirty, v$.value.type.$invalid, vWarning$.value.type.$error),
          theme: getFunctionalState(vWarning$.value.theme.$dirty, v$.value.theme.$invalid, vWarning$.value.theme.$error),
          description: getFunctionalState(vWarning$.value.description.$dirty, v$.value.description.$invalid, vWarning$.value.description.$error),
          tags: getFunctionalState(vWarning$.value.tags.$dirty, false, vWarning$.value.tags.$error),
          image: getFunctionalState(vWarning$.value.image.$dirty, v$.value.image.$invalid, vWarning$.value.image.$error),
        };
      });
  
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
  
      const submit = () => {
        validateRequiredRules().then(valid => {
          if(valid) {
            emit("next", reuse);
          }
        });
      };
  
      return {
        nameReuseAccordionId,
        addLinkAccordionId,
        addTypeAccordionId,
        addThemeAccordionId,
        addDescriptionAccordionId,
        addTagsAccordionId,
        addImageCoverageAccordionId,
        reuse,
        editIcon,
        topicsUrl,
        typesUrl,
        state,
        fieldHasError,
        fieldHasWarning,
        getErrorText,
        getWarningText,
        submit,
        title,
        v$,
        vWarning$,
      };
    },
  });
  </script>
  