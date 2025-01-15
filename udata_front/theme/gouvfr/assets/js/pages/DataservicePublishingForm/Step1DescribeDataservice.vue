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
              :title= "t('Name your API')"
              :id="nameDataserviceAccordionId"
              :state="state.title"
            >
              <p class="fr-m-0">
                {{ t('Give your API a relevant and explicit name to reflect its function or application domain. A good name helps users search for and identify the API easily.') }}
              </p>
            </Accordion>
            <Accordion
              :title= "t('Add an acronym to the API')"
              :id="acronymDataserviceAccordionId"
              :state="state.acronym"
            >
              <p class="fr-m-0"> 
                {{ t('You have the option to add an acronym to your API. The letters that make up this acronym do not need to be separated by periods.') }}
              </p>
            </Accordion>
            <Accordion
              :title= "t('Write a good description')"
              :id="addDescriptionAccordionId"
              :state="state.description"
            >
              <p class="fr-m-0">
                {{ t("Write a clear and precise description of the API. Users need to understand the purpose of the API, the data provided, the scope covered (is the data exhaustive, are there any gaps?), the frequency of data updates, as well as the parameters with which they can make a call.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('description')" color="orange-terre-battue">
                {{ getWarningText("description") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Define a point of contact')"
              :id="contactPointAccordionId"
              :state="state.contact_point"
              v-if="dataservice.organization"
            >
              <p class="fr-m-0">
                {{ $t("Specify a contact point, such as an email or a link to a form, so users can reach you in case of issues or for questions.") }}
              </p>
            </Accordion>
            <Accordion
              :title= "$t('Select an access type')"
              :id="selectIsRestrictedAccordionId"
              :state="state.is_restricted"
            >
              <p class="fr-m-0">
                {{ $t("Choose the access type (open or restricted). Select open if the data is open data.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('is_restricted')" color="orange-terre-battue">
                {{ getWarningText("is_restricted") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "$t('Access token')"
              :id="selectHasTokenAccordionId"
              :state="state.has_token"
            >
              <p class="fr-m-0">
                {{ $t("Please indicate whether the dataservice is freely accessible or whether a user requires a token to access the data.") }}
              </p>
              <Well class="fr-mt-1w" v-if="fieldHasWarning('has_token')" color="orange-terre-battue">
                {{ getWarningText("has_token") }}
              </Well>
            </Accordion>
            <Accordion
              :title= "t('Define the correct link to the API')"
              :id="addBaseUrlAccordionId"
              :state="state.base_api_url"
            >
              <p class="fr-m-0">
                {{ t("The base URL of an API is the common entry point for all requests, often consisting of a domain or server address. It serves as the foundation to which specific paths (endpoints) are added to access the various resources of the API.") }}
              </p>
            </Accordion>
            <Accordion
              :title= "t('Add a link to the authorization')"
              :id="addAuthorizationUrlAccordionId"
              :state="state.authorization_request_url"
            >
              <p class="fr-m-0">
                {{ t("If your API is restricted access, please add the link to the access request form. Are you an administration? The Datapass solution allows you to easily create and manage access request forms for data.") }}
              </p>
            </Accordion>
            <Accordion
              :title= "t('Add a link to the technical documentation')"
              :id="addEndpointUrlAccordionId"
              :state="state.endpoint_description_url"
            >
              <p class="fr-m-0">
                {{ t("Ideally, provide an OpenAPI (swagger) link that allows developers to explore the endpoints, see the available methods, and test requests directly from the documentation. In the case of geographic services, you can provide a link to the service with a GetCapabilities request to obtain the service's metadata.") }}
              </p>
            </Accordion>
            <Accordion
              :title= "t('Set the rate limiting')"
              :id="rateLimitingDataserviceAccordionId"
              :state="state.rate_limiting"
            >
              <p class="fr-m-0"> 
                {{ t('You can specify the rate limiting for your API.') }}
              </p>
            </Accordion>
            <Accordion
              :title= "t('Availability')"
              :id="availabilityDataserviceAccordionId"
              :state="state.availability"
            >
              <p class="fr-m-0"> 
                {{ t('Specify the mean availability of your dataservice. Value should be a percentage.') }}
              </p>
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
                <img :src="dataserviceIcon" alt="" />
              </div>
              <div class="fr-col">
                <p class="fr-m-0 fr-text--bold">{{ t('What is a dataservice?') }}</p>
                <p class="fr-m-0 fr-text--xs">{{ t('A dataservice is a computer tool that allows a website or software to communicate with another computer and exchange data.') }}</p>
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
              :accordion="nameDataserviceAccordionId"
              @blur="vWarning$.title.$touch"
            >
              <InputGroup
                :aria-describedby="nameDataserviceAccordionId"
                :label="t('Dataservice name')"
                :required="true"
                v-model="dataservice.title"
                :hasError="fieldHasError('title')"
                :hasWarning="fieldHasWarning('title')"
                :errorText="getErrorText('title')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="acronymDataserviceAccordionId"
              @blur="vWarning$.acronym.$touch"
            >
              <InputGroup
                :aria-describedby="acronymDataserviceAccordionId"
                :label="t('Acronym')"
                :required="false"
                v-model="dataservice.acronym"
                :hasError="fieldHasError('acronym')"
                :hasWarning="fieldHasWarning('acronym')"
                :errorText="getErrorText('acronym')"
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
                v-model="dataservice.description"
                :hasError="fieldHasError('description')"
                :hasWarning="fieldHasWarning('description')"
                :errorText="getErrorText('description')"
              />
            </LinkedToAccordion>
          </fieldset>
          <fieldset class="fr-fieldset" aria-labelledby="description-legend" v-if="dataservice.organization">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ t("Access Point") }}
              </h2>
            </legend>
            <div 
              class="fr-fieldset__element"
              :accordion="contactPointAccordionId"
            >
              <ContactPointSelector
                :oid="dataservice.organization"
                @update:contact="updateContact"
              />
            </div>
          </fieldset>
          <fieldset class="fr-fieldset" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ t("Access") }}
              </h2>
            </legend>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="selectIsRestrictedAccordionId"
              @blur="vWarning$.is_restricted.$touch"
            >
              <MultiSelect
                :placeholder="$t('Access type')"
                :searchPlaceholder="$t('Chose an access type')"
                :initialOptions="isRestrictedValues"
                :values="dataservice.is_restricted"
                @change="(value: string) => dataservice.is_restricted = JSON.parse(value)"
                :allOption="$t('Chose an access type')"
                :addAllOption="false"
                :showDescription="true"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="selectHasTokenAccordionId"
              @blur="vWarning$.has_token.$touch"
            >
              <MultiSelect
                :placeholder="$t('Access token')"
                :searchPlaceholder="$t('Access token')"
                :initialOptions="hasTokenValues"
                :values="dataservice.has_token"
                @change="(value: string) => dataservice.has_token = JSON.parse(value)"
                :allOption="$t('Access token')"
                :addAllOption="false"
                :showDescription="true"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addBaseUrlAccordionId"
              @blur="vWarning$.base_api_url.$touch"
            >
              <InputGroup
                :aria-describedby="addBaseUrlAccordionId"
                :label="t('Dataservice Base URL')"
                type="url"
                :placeholder="t('https://...')"
                :required="false"
                v-model="dataservice.base_api_url"
                :hasError="fieldHasError('base_api_url')"
                :hasWarning="fieldHasWarning('base_api_url')"
                :errorText="getErrorText('base_api_url')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addAuthorizationUrlAccordionId"
              @blur="vWarning$.authorization_request_url.$touch"
            >
              <InputGroup
                :aria-describedby="addAuthorizationUrlAccordionId"
                :label="t('Dataservice authorization request URL')"
                type="url"
                :placeholder="t('https://...')"
                :required="false"
                v-model="dataservice.authorization_request_url"
                :hasError="fieldHasError('authorization_request_url')"
                :hasWarning="fieldHasWarning('authorization_request_url')"
                :errorText="getErrorText('authorization_request_url')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addEndpointUrlAccordionId"
              @blur="vWarning$.endpoint_description_url.$touch"
            >
              <InputGroup
                :aria-describedby="addEndpointUrlAccordionId"
                :label="t('Dataservice endpoint URL')"
                type="url"
                :placeholder="t('https://...')"
                :required="false"
                v-model="dataservice.endpoint_description_url"
                :hasError="fieldHasError('endpoint_description_url')"
                :hasWarning="fieldHasWarning('endpoint_description_url')"
                :errorText="getErrorText('endpoint_description_url')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="rateLimitingDataserviceAccordionId"
              @blur="vWarning$.rate_limiting.$touch"
            >
              <InputGroup
                :aria-describedby="rateLimitingDataserviceAccordionId"
                :label="t('Rate limiting')"
                :required="false"
                v-model="dataservice.rate_limiting"
                :hasError="fieldHasError('rate_limiting')"
                :hasWarning="fieldHasWarning('rate_limiting')"
                :errorText="getErrorText('rate_limiting')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="availabilityDataserviceAccordionId"
              @blur="vWarning$.availability.$touch"
            >
              <InputGroup
                :aria-describedby="acronymDataserviceAccordionId"
                :label="t('Availability')"
                :required="false"
                v-model="dataservice.availability"
                :hasError="fieldHasError('availability')"
                :hasWarning="fieldHasWarning('availability')"
                :errorText="getErrorText('availability')"
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
import { Well } from '@datagouv/components/ts';
import type { NewDataservice, Dataservice, OwnedWithId, ContactPoint } from '@datagouv/components/ts';
import { useI18n } from 'vue-i18n';
import { url, numeric } from '@vuelidate/validators';
import { minLengthWarning, required } from '../../i18n';
import Accordion from '../../components/Accordion/Accordion.vue';
import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
import Container from '../../components/Ui/Container/Container.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import ProducerSelector from '../../components/ProducerSelector/ProducerSelector.vue';
import ContactPointSelector from '../../components/ContactPointSelector/ContactPointSelector.vue'
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import useUid from "../../composables/useUid";
import useFunctionalState from '../../composables/form/useFunctionalState';
import dataserviceIcon from "../../../../templates/svg/illustrations/dataservice.svg";
import { license_groups_options, quality_description_length } from "../../config";
import UploadGroup from '../../components/Form/UploadGroup/UploadGroup.vue';
import type { Me, PublishingFormAccordionState } from '../../types';
import Alert from '../../components/Alert/Alert.vue';

const props = defineProps<{
  dataservice: NewDataservice,
  steps: Array<string>,
  errors: Array<string>,
  loading?: boolean
  user: Me,
}>();

const emit = defineEmits<{
  (event: 'next', dataservice: NewDataservice): void,
}>();

const { t } = useI18n();
const { id: nameDataserviceAccordionId } = useUid("accordion");
const { id: acronymDataserviceAccordionId } = useUid("accordion");
const { id: addDescriptionAccordionId } = useUid("accordion");
const { id: selectLicenseAccordionId } = useUid("accordion");
const { id: selectIsRestrictedAccordionId } = useUid("accordion");
const { id: selectHasTokenAccordionId } = useUid("accordion");
const { id: addBaseUrlAccordionId } = useUid("accordion");
const { id: addAuthorizationUrlAccordionId } = useUid("accordion");
const { id: addEndpointUrlAccordionId } = useUid("accordion");
const { id: rateLimitingDataserviceAccordionId } = useUid("accordion");
const { id: availabilityDataserviceAccordionId } = useUid("accordion");
const { id: contactPointAccordionId } = useUid("accordion");

const dataservice = reactive<NewDataservice>({...props.dataservice});

const isRestrictedValues = [{ id: false, label: t("Open")}, { id: true, label: t("Restricted")}]
const hasTokenValues = [{ id: true, label: t("Yes")}, { id: false, label: t("No")}]

function updateOwned(owned: OwnedWithId) {
  dataservice.organization = owned.organization;
  dataservice.owner = owned.owner;
  isSelectedProducer.value = true;
}

const isNewContact = ref<boolean>(false);
const contactPoint = ref<ContactPoint>(null);
const isSelectedProducer = ref<boolean>(false);

function updateContact(isNew: boolean, contact: ContactPoint) {
  isNewContact.value = isNew;
  contactPoint.value = contact;
}

function checkOwned() {
  return isSelectedProducer.value;
};

const requiredRules = {
  acronym: {},
  availability: { numeric },
  base_api_url: { url },
  authorization_request_url: { url },
  endpoint_description_url: { url },
  rate_limiting: {},
  title: { required },
  description: { required },
  contact_point: {},
  owned: { custom: checkOwned },
};

const warningRules = {
  acronym: {},
  availability: { numeric },
  base_api_url: {},
  authorization_request_url: {},
  endpoint_description_url: {},
  has_token: {},
  license: { required },
  is_restricted: { required },
  rate_limiting: {},
  title: { required },
  description: {required, minLengthValue: minLengthWarning(quality_description_length), },
  contact_point: {},
  owned: { custom: checkOwned },
};

const { getErrorText, getFunctionalState, getWarningText, hasError, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState(dataservice, requiredRules, warningRules);

const state = computed<Record<string, PublishingFormAccordionState>>(() => {
  return {
    acronym: getFunctionalState(vWarning$.value.acronym.$dirty, v$.value.acronym.$invalid, vWarning$.value.acronym.$error),
    availability: getFunctionalState(vWarning$.value.availability.$dirty, v$.value.availability.$invalid, vWarning$.value.availability.$error),
    base_api_url: getFunctionalState(vWarning$.value.base_api_url.$dirty, v$.value.base_api_url.$invalid, vWarning$.value.base_api_url.$error),
    authorization_request_url: getFunctionalState(vWarning$.value.authorization_request_url.$dirty, v$.value.authorization_request_url.$invalid, vWarning$.value.authorization_request_url.$error),
    endpoint_description_url: getFunctionalState(vWarning$.value.endpoint_description_url.$dirty, v$.value.endpoint_description_url.$invalid, vWarning$.value.endpoint_description_url.$error),
    has_token: getFunctionalState(vWarning$.value.has_token.$dirty, false, vWarning$.value.has_token.$error),
    license: getFunctionalState(vWarning$.value.license.$dirty, false, vWarning$.value.license.$error),
    is_restricted: getFunctionalState(vWarning$.value.is_restricted.$dirty, false, vWarning$.value.is_restricted.$error),
    rate_limiting: getFunctionalState(vWarning$.value.rate_limiting.$dirty, v$.value.rate_limiting.$invalid, vWarning$.value.rate_limiting.$error),
    title: getFunctionalState(vWarning$.value.title.$dirty, v$.value.title.$invalid, vWarning$.value.title.$error),
    description: getFunctionalState(vWarning$.value.description.$dirty, v$.value.description.$invalid, vWarning$.value.description.$error),
    contact_point: getFunctionalState(vWarning$.value.contact_point.$dirty, v$.value.contact_point.$invalid, vWarning$.value.contact_point.$error),
    owned: getFunctionalState(vWarning$.value.owned.$dirty, v$.value.owned.$invalid, vWarning$.value.owned.$error),
  };
});

const fieldHasError = (field: string) => hasError(state, field);

const fieldHasWarning = (field: string) => hasWarning(state, field);

function submit() {
  validateRequiredRules().then(valid => {
    if(valid) {
      emit("next", dataservice, isNewContact.value, contactPoint.value);
    }
  });
};
</script>
