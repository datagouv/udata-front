<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="1"/>
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
            :title= "t('Naming your organization')"
            :id="nameOrganizationAccordionId"
            :state="state.name"
          >
            <p class="fr-m-0">
              {{ t("The public name of your organization.") }} <br/>
            </p>
          </Accordion>
          <Accordion
            :title= "t('Why provide a SIRET number?')"
            :id="addSiretAccordionId"
            :state="state.business_number_id"
          >
            <p class="fr-m-0">
              {{ t("A SIRET number will allow us to assign a type to your organization (administrations, collectivities, companies, etc.) and will facilitate your certification.") }} <br/>
              {{ t("Please note that all administrations have a SIRET number.") }} <br/>
              {{ t("You can find your SIRET on ") }}<a class="text-decoration-underline" href="https://annuaire-entreprises.data.gouv.fr/" target="_blank">{{ t("l’Annuaire des Entreprises.") }}</a>
            </p>
          </Accordion>
          <Accordion
            :title= "t('Choose an acronym')"
            :id="addAcronymAccordionId"
            :state="state.acronym"
          >
            <div class="markdown fr-m-0">
              <p class="fr-m-0">
                {{ t('The acronym of your organization, if it exists.') }}
              </p>
            </div>
          </Accordion>
          <Accordion
            :title= "t('Write a good description')"
            :id="addDescriptionAccordionId"
            :state="state.description"
          >
            <p class="fr-m-0">
              {{ t("Please indicate here what your organization does and what mission it fulfills. Add any information that will allow users to contact you: email address, mailing address, Twitter account, etc.") }}
            </p>
            <Well class="fr-mt-1w" v-if="fieldHasWarning('description')" color="orange-terre-battue">
              {{ getWarningText("description") }}
            </Well>
          </Accordion>
          <Accordion
            :title= "t('Provide a website')"
            :id="addWebsiteAccordionId"
            :state="state.url"
          >
            <p class="fr-m-0">
              {{ t("If your organization has a website, please provide its URL.") }}
            </p>
          </Accordion>
          <Accordion
            :title= "t('Choose the right logo')"
            :id="addLogoAccordionId"
            :state="state.logo"
          >
            <p class="fr-m-0">
              {{ t("If your organization has a logo or a profile picture, please upload it here. To upload a logo, click on the \"Choose a file from your computer\" button. The following image formats are accepted: png, jpg/jpeg.") }}
            </p>
            <Well class="fr-mt-1w" v-if="fieldHasWarning('frequency')" color="orange-terre-battue">
              {{ getWarningText("frequency") }}
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
                <img :src="organizationIcon" alt="" />
              </div>
              <div class="fr-col">
                <p class="fr-m-0 fr-text--bold">{{ t('What is an organization?') }}</p>
                <p class="fr-m-0 fr-text--xs">{{ t('An organization is an entity in which many users can collaborate. The datasets published under the organization can be edited by its members.') }}</p>
              </div>
            </div>
          </Well>
          <fieldset class="fr-fieldset" aria-labelledby="description-legend">
            <legend class="fr-fieldset__legend" id="description-legend">
              <h2 class="subtitle subtitle--uppercase fr-mb-3v">
                {{ t("Description") }}
              </h2>
            </legend>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="nameOrganizationAccordionId"
              @blur="vWarning$.name.$touch"
            >
              <InputGroup
                data-testid="nameInput"
                :aria-describedby="nameOrganizationAccordionId"
                :label="t('Name')"
                :required="true"
                v-model="organization.name"
                :hasError="fieldHasError('name')"
                :hasWarning="fieldHasWarning('name')"
                :errorText="getErrorText('name')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addSiretAccordionId"
            >
              <InputGroup
                data-testid="siretInput"
                :aria-describedby="addSiretAccordionId"
                :label="t('SIRET Number')"
                v-model="organization.business_number_id"
                :hasError="fieldHasError('business_number_id')"
                :hasWarning="fieldHasWarning('business_number_id')"
                :errorText="t('This SIRET is not valid')"
              />
            </LinkedToAccordion>
            <div v-if="checkOrga.exists !== null" class="fr-col fr-mx-2v fr-mb-2v bg-contrast-grey text-align-center">
              <div v-if="checkOrga.exists">
                <p>{{ t('The SIRET n° {number} is matching', { number: organization.business_number_id }) }}</p>
                <p>{{ checkOrga.name }}</p>
                <p v-if="checkOrga.isPublicService">
                  <span class="fr-icon-bank-line" aria-hidden="true"></span>
                  {{ t('Public Service') }}
                </p>
              </div>
              <div v-else>
                <p>{{ t('No organization found matching this SIRET on annuaire-entreprises.data.gouv.fr') }}</p>
              </div>
            </div>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addAcronymAccordionId"
            >
            <InputGroup
                data-testid="acronymInput"
                :aria-describedby="addAcronymAccordionId"
                :label="t('Acronym')"
                v-model="organization.acronym"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addDescriptionAccordionId"
              @blur="vWarning$.description.$touch"
            >
            <InputGroup
                data-testid="descriptionInput"
                :aria-describedby="addDescriptionAccordionId"
                :label="t('Description')"
                :required="true"
                type="textarea"
                v-model="organization.description"
                :hasError="fieldHasError('description')"
                :hasWarning="fieldHasWarning('description')"
                :errorText="getErrorText('description')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addWebsiteAccordionId"
            >
            <InputGroup
                data-testid="websiteInput"
                :aria-describedby="addDescriptionAccordionId"
                :label="t('Website')"
                type="url"
                v-model="organization.url"
                :hasError="fieldHasError('url')"
                :hasWarning="fieldHasWarning('url')"
                :errorText="getErrorText('url')"
              />
            </LinkedToAccordion>
            <LinkedToAccordion
              class="fr-fieldset__element"
              :accordion="addLogoAccordionId"
              @blur="vWarning$.acronym.$touch"
            >
              <p>{{ t('Logo') }}</p>
              <UploadGroup
                :label="t('Logo')"
                :title="t('Logo')"
                hintText="Max size: 4Mo. Accepted formats: JPG, JPEG, PNG"
                accept=".jpeg, .jpg, .png"
                :isValid="file"
                :validText="t('Your file is valid')"
                @change="addFiles"
              />
              <div class="text-align-center">
                <img class="fr-col fr-mx-2v fr-mb-2v" ref="imagePreview" width="300px" />
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
            <button class="fr-btn" data-testid="submitButton" @click="submit">
              {{ t("Next") }}
            </button>
          </div>
        </Container>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue';
  import { minLengthWarning, required } from '../../i18n';
  import Accordion from '../../components/Accordion/Accordion.vue';
  import AccordionGroup from '../../components/Accordion/AccordionGroup.vue';
  import Alert from '../../components/Alert/Alert.vue';
  import Container from '../../components/Ui/Container/Container.vue';
  import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
  import LinkedToAccordion from '../../components/Form/LinkedToAccordion/LinkedToAccordion.vue';
  import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
  import Stepper from '../../components/Form/Stepper/Stepper.vue';
  import UploadGroup from '../../components/Form/UploadGroup/UploadGroup.vue';
  import useUid from "../../composables/useUid";
  import useFunctionalState from '../../composables/form/useFunctionalState';
  import organizationIcon from "../../../../templates/svg/illustrations/organization.svg";
  import config, { quality_description_length } from "../../config";
  import { PublishingFormAccordionState } from '../../types';
  import { Well } from '@etalab/data.gouv.fr-components';
  import type { NewOrganization } from '@etalab/data.gouv.fr-components';
  import axios from 'axios';
  import { url } from '@vuelidate/validators';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    organization: NewOrganization,
    steps: Array<string>
    errors: Array<string>,
  }>();

  const emit = defineEmits<{
    (event: 'next', organization: NewOrganization, file: File): void,
  }>();

  const { id: nameOrganizationAccordionId } = useUid("accordion");
  const { id: addAcronymAccordionId } = useUid("accordion");
  const { id: addDescriptionAccordionId } = useUid("accordion");
  const { id: addSiretAccordionId } = useUid("accordion");
  const { id: addWebsiteAccordionId } = useUid("accordion");
  const { id: addLogoAccordionId } = useUid("accordion");

  const { t } = useI18n();

  const organization = reactive({...props.organization});
  const file = ref<File | null>(null);
  const imagePreview = ref<HTMLImageElement | null>(null);

  const checkOrga = ref({
    name: '',
    siren: '',
    isPublicService: '',
    exists: null as boolean | null
  });

  const checkBusinessId = () => {
    if (organization.business_number_id.length == 0) {
      return true;
    } else if (organization.business_number_id.length == 14 && checkOrga.value.exists) {
      return true;
    } else {
      return false;
    }
  };

  const requiredRules = {
    business_number_id: { custom: checkBusinessId },
    description: { required },
    name: { required },
    url: { url },
  };

  const warningRules = {
    acronym: {},
    business_number_id: { custom: checkBusinessId },
    description: {required, minLengthValue: minLengthWarning(quality_description_length) },
    logo: {},
    name: { required },
    url: { url },
  };

  const { getErrorText, getFunctionalState, getWarningText, hasError, hasWarning, validateRequiredRules, v$, vWarning$ } = useFunctionalState(organization, requiredRules, warningRules);

  const state = computed<Record<string, PublishingFormAccordionState>>(() => {
    return {
      acronym: vWarning$.value.acronym.$dirty ? "info" : "disabled",
      business_number_id: getFunctionalState(vWarning$.value.business_number_id.$dirty, v$.value.business_number_id.$invalid, vWarning$.value.business_number_id.$error),
      description: getFunctionalState(vWarning$.value.description.$dirty, v$.value.description.$invalid, vWarning$.value.description.$error),
      logo: vWarning$.value.logo.$dirty ? "info" : "disabled",
      name: getFunctionalState(vWarning$.value.name.$dirty, v$.value.name.$invalid, vWarning$.value.name.$error),
      url: getFunctionalState(vWarning$.value.url.$dirty, v$.value.url.$invalid, vWarning$.value.url.$error),
    };
  });

  function fieldHasError(field: string) {
    return hasError(state, field);
  };

  function fieldHasWarning(field: string) {
    return hasWarning(state, field);
  }

  function submit() {
    validateRequiredRules().then(valid => {
      if(valid) {
        emit("next", organization, file);
      }
    });
  };

  function addFiles(newFile: File) {
    file.value = newFile;
    if (imagePreview.value) {
      imagePreview.value.src = URL.createObjectURL(file.value[0]);
    }
  };

  watch(() => organization.business_number_id, (newValue) => {
    let siret = newValue.replace(/\s/g,'')
    if (siret.length === 14) {
      axios.get(config.search_siren_url, {
        params: {
          q: siret,
          mtm_campaign: "udata-front"
        }
      })
      .then((res) => res.data)
      .then((result) => {
        if (result.total_results === 0) {
          checkOrga.value.exists = false;
        } else {
          checkOrga.value.name = result.results[0].nom_complet;
          checkOrga.value.siren = result.results[0].siren;
          checkOrga.value.isPublicService = result.results[0].complements.est_service_public;
          checkOrga.value.exists = true;
        }
      })
    } else {
      checkOrga.value.exists = null;
    }
  });
</script>
  