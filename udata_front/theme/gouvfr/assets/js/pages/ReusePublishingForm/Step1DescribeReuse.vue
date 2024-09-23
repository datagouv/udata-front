<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="0"/>
    <div class="fr-grid-row">
      <Sidemenu
        class="fr-col-12 fr-col-md-5"
        :buttonText="t('Help')"
        :onRight="true"
        :fixed="true"
        >
          <template #title>
            <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
            {{ t('Help') }}
          </template>
          <AccordionGroup>
            <Accordion
              :title= "t('Naming your reuse')"
              :id="nameReuseAccordionId"
              :state="state.title"
            >
              <p class="fr-m-0">
                {{ t('Prefer a title that allows understanding of the use made of the data rather than the name of the website or application ("Search Engine for Company Agreements" rather than "Accords-entreprise.fr" for example).') }}
              </p>
            </Accordion>
            <Accordion
              :title= "t('What link to provide')"
              :id="addLinkAccordionId"
              :state="state.url"
            >
              <p class="fr-m-0">
                {{ t("Enter the link of the page on which the reuse is visible. Point directly to the reuse itself rather than a homepage. Make sure the link is stable over time.") }}
              </p>
            </Accordion>
            <Accordion
              :title= "('Choose a type')"
              :id="addTypeAccordionId"
              :state="state.type"
            >
              <div class="markdown fr-m-0">
                <p class="fr-m-0">
                  {{ t('Please indicate the type under which to categorize the reuse (API, application, news article, visualization, etc.).') }}
                </p>
                <Well class="fr-mt-1w" v-if="fieldHasWarning('type')" color="orange-terre-battue">
                  {{ getWarningText("type") }}
                </Well>
              </div>
            </Accordion>
            <Accordion
              :title= "t('Choose a theme')"
              :id="addTopicAccordionId"
              :state="state.topic"
            >
              <p class="fr-m-0">
                {{ t("Choose the theme associated with your reuse.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('topic')" color="orange-terre-battue">
                {{ getWarningText("topic") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "t('Describe your reuse')"
              :id="addDescriptionAccordionId"
              :state="state.description"
            >
              <p class="fr-m-0">
                {{ t("You can provide information about the method of creating the reuse, what the reuse allows to do or show, or tell more about yourself and the context of this reuse. It is preferable to maintain a neutral tone: if the reuse resembles too much like a promotional message, we may delete it.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('description')" color="orange-terre-battue">
                {{ getWarningText("description") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "t('Add keywords')"
              :id="addTagsAccordionId"
              :state="state.tags"
            >
              <p class="fr-m-0">
                {{ t("Keywords appear on the presentation page and improve search engine optimization when a user is searching. From each keyword, you can obtain a list of reuses for which the keyword has also been assigned.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('tags')" color="orange-terre-battue">
                {{ getWarningText("tags") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "t('Choose an image')"
              :id="addImageAccordionId"
              :state="state.image"
            >
              <p class="fr-m-0">
                {{ t(`If your reuse takes the form of a graphical representation, you can provide a preview to other users through an image or screenshot. This image will appear in the "Reuses" section of the associated dataset page. When relevant, screenshots are more effective in conveying what the reuse is about, so they are preferable to logos or illustrations, for example.`) }}
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
                <img :src="reuseIcon" alt="" />
              </div>
              <div class="fr-col">
                <p class="fr-m-0 fr-text--bold">{{ t('What is a reuse?') }}</p>
                <p class="fr-m-0 fr-text--xs">{{ t("A reuse is an exemple of public data's usage.") }} {{ t('Publishing a reuse can allow you to gain visibility and start start a dialogue with the dataset producer.') }}</p>
              </div>
            </div>
          </Well>
          <fieldset class="fr-fieldset" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ t("Producer") }}
              </h2>
            </legend>
            <div class="fr-fieldset__element">
              <ProducerSelector
                :user="user"
                :hasError="fieldHasError('owned')"
                :errorText="t('You need to select a Producer')"
                @update:owned="updateOwned"
              />
            </div>
          </fieldset>
          <fieldset class="fr-fieldset" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ t("Description") }}
              </h2>
            </legend>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="nameReuseAccordionId"
              @blur="vWarning$.title.$touch"
            >
              <InputGroup
                :aria-describedby="nameReuseAccordionId"
                :label="t('Reuse name')"
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
                :label="t('Link')"
                type="url"
                :placeholder="t('https://...')"
                :required="true"
                v-model="reuse.url"
                :hasError="fieldHasError('url')"
                :hasWarning="fieldHasWarning('url')"
                :errorText="getErrorText('url')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addTypeAccordionId"
              @blur="vWarning$.type.$touch"
            >
            <MultiSelect
                :required="true"
                :placeholder="t('Type')"
                :searchPlaceholder="t('Select a type')"
                :listUrl="typesUrl"
                :values="reuse.type"
                @change="(value: string) => reuse.type = value"
                :hasError="fieldHasError('type')"
                :hasWarning="fieldHasWarning('type')"
                :errorText="getErrorText('type')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addTopicAccordionId"
              @blur="vWarning$.topic.$touch"
            >
              <MultiSelect
                :required="true"
                :placeholder="t('Theme')"
                :searchPlaceholder="t('Select a theme...')"
                :listUrl="topicsUrl"
                :values="reuse.topic"
                @change="(value: string) => reuse.topic = value"
                :hasError="fieldHasError('topic')"
                :hasWarning="fieldHasWarning('topic')"
                :errorText="getErrorText('topic')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addDescriptionAccordionId"
              @blur="vWarning$.description.$touch"
            >
              <InputGroup
                :label="t('Description')"
                :required="true"
                type="markdown"
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
                @change="(value: Array<string>) => reuse.tags = value"
                :placeholder="t('Tags')"
                :searchPlaceholder="t('Search a tag...')"
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
                :hintText="t('Max size: 4Mo. Accepted formats: JPG, JPEG, PNG')"
                accept=".jpeg, .jpg, .png"
                :label="t('Cover picture')"
                :isValid="!!file"
                :required="true"
                :showLabel="true"
                :validText="t('Your file is valid')"
                :hasError="fieldHasError('image')"
                :errorText="getErrorText('image')"
                @change="addFiles"
              />
              <div class="text-align-center" v-show="imagePreview?.src">
                <img class="fr-responsive-img fr-mx-1w fr-mb-1w" alt="" ref="imagePreview" width="300" height="300" />
              </div>
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
            <button class="fr-btn" @click="submit" :disabled="loading">
              {{ t("Next") }}
            </button>
          </div>
        </Container>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { getReuseTopicsUrl, getReuseTypesUrl, Well } from '@datagouv/components/ts';
import type { NewReuse, OwnedWithId } from '@datagouv/components/ts';
import { useI18n } from 'vue-i18n';
import { url } from '@vuelidate/validators';
import { minLengthWarning, required } from '../../i18n';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import ProducerSelector from '../../components/ProducerSelector/ProducerSelector.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import useUid from "../../composables/useUid";
import useFunctionalState from '../../composables/form/useFunctionalState';
import reuseIcon from "../../../../templates/svg/illustrations/reuse.svg";
import { quality_description_length } from "../../config";
import UploadGroup from '../../components/Form/UploadGroup/UploadGroup.vue';
import type { Me, PublishingFormAccordionState } from '../../types';
import Alert from '../../components/Alert/Alert.vue';

const props = defineProps<{
  reuse: NewReuse,
  steps: Array<string>,
  errors: Array<string>,
  loading?: boolean
  user: Me,
}>();

const emit = defineEmits<{
  (event: 'next', reuse: NewReuse, file: File): void,
}>();

const { t } = useI18n();
const { id: nameReuseAccordionId } = useUid("accordion");
const { id: addLinkAccordionId } = useUid("accordion");
const { id: addTypeAccordionId } = useUid("accordion");
const { id: addTopicAccordionId } = useUid("accordion");
const { id: addDescriptionAccordionId } = useUid("accordion");
const { id: addTagsAccordionId } = useUid("accordion");
const { id: addImageAccordionId } = useUid("accordion");

const reuse = reactive<NewReuse>({...props.reuse});
const file = ref<File | null>(null);
const imagePreview = ref<HTMLImageElement | null>(null);
const topicsUrl = getReuseTopicsUrl();
const typesUrl = getReuseTypesUrl();

const isSelectedProducer = ref<boolean>(false);

function hasImage () {
  return file.value !== null;
};

function checkOwned() {
  return isSelectedProducer.value;
};

function updateOwned(owned: OwnedWithId) {
  reuse.organization = owned.organization;
  reuse.owner = owned.owner;
  isSelectedProducer.value = true;
}

const requiredRules = {
  title: { required },
  url: { required, url },
  type: { required },
  topic: { required },
  description: { required },
  tags: {},
  image: { custom: hasImage },
  owned: { custom: checkOwned },
};

const warningRules = {
  title: { required },
  url: { required, url },
  type: { required },
  topic: { required },
  description: {required, minLengthValue: minLengthWarning(quality_description_length), },
  tags: {},
  image: { custom: hasImage },
  owned: { custom: checkOwned },
};

const { getErrorText, getFunctionalState, getWarningText, hasError, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState(reuse, requiredRules, warningRules);

const state = computed<Record<string, PublishingFormAccordionState>>(() => {
  return {
    title: getFunctionalState(vWarning$.value.title.$dirty, v$.value.title.$invalid, vWarning$.value.title.$error),
    url: getFunctionalState(vWarning$.value.url.$dirty, v$.value.url.$invalid, vWarning$.value.url.$error),
    type: getFunctionalState(vWarning$.value.type.$dirty, v$.value.type.$invalid, vWarning$.value.type.$error),
    topic: getFunctionalState(vWarning$.value.topic.$dirty, v$.value.topic.$invalid, vWarning$.value.topic.$error),
    description: getFunctionalState(vWarning$.value.description.$dirty, v$.value.description.$invalid, vWarning$.value.description.$error),
    tags: getFunctionalState(vWarning$.value.tags.$dirty, false, vWarning$.value.tags.$error),
    image: getFunctionalState(vWarning$.value.image.$dirty, v$.value.image.$invalid, vWarning$.value.image.$error),
    owned: getFunctionalState(vWarning$.value.owned.$dirty, v$.value.owned.$invalid, vWarning$.value.owned.$error),
  };
});

const fieldHasError = (field: string) => hasError(state, field);

const fieldHasWarning = (field: string) => hasWarning(state, field);

function addFiles(newFile: Array<File>) {
  file.value = newFile[0];
    if (imagePreview.value) {
      imagePreview.value.src = URL.createObjectURL(file.value);
    }
};

function submit() {
  validateRequiredRules().then(valid => {
    if(valid && file.value) {
      emit("next", reuse, file.value);
    }
  });
};
</script>
