<template>
    <div class="fr-container">
      <Stepper :steps="steps" :currentStep="2"/>
      <Container>
        <Well
          color="blue-cumulus"
          weight="regular"
          class="fr-mb-n3v"
        >
          <div class="fr-grid-row">
            <div class="fr-col-auto fr-mr-3v">
              <img :src="successIcon" alt="" />
            </div>
            <div class="fr-col">
              <p class="fr-m-0 fr-text--bold">{{ $t('Your organization is created !') }}</p>
              <p class="fr-m-0 fr-text--xs">{{ $t('You can now publish content or incite members to join your organization.') }}</p>
            </div>
          </div>
        </Well>
        <article class="fr-my-3w fr-p-3w border border-default-grey fr-enlarge-link">
          <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--top">
            <div class="fr-col-auto">
              <Placeholder
                v-if="organization.logo_thumbnail"
                type="organization"
                :src="organization.logo_thumbnail"
                alt=""
                :size="60"
              />
              <Placeholder
                v-else
                type="organization"
                :size="60"
              />
            </div>
            <div class="fr-col">
              <h4 class="fr-mb-1v fr-grid-row">
                <a :href="organization.page" class="text-grey-500">
                  {{ organization.name }}
                  <small v-if="organization.acronym">{{ organization.acronym }}</small>
                </a>
              </h4>
              <p class="fr-mt-1w fr-mb-2w fr-hidden fr-unhidden-sm overflow-wrap-anywhere">
                {{ excerpt(organization.description, 160) }}
              </p>
            </div>
          </div>
        </article>
        <div class="fr-grid-row fr-grid-row--right">
          <a href="" class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-mr-3v">
            {{ $t("Manage the organization") }}
          </a>
          <a href="" class="fr-btn fr-mr-3v">
            {{ $t("Publish a reuse") }}
          </a>
          <a href="" class="fr-btn">
            {{ $t("Publish a dataset") }}
          </a>
        </div>
      </Container>
    </div>
  </template>
  
  <script setup lang="ts">
  import Container from '../../components/Ui/Container/Container.vue';
  import Stepper from '../../components/Form/Stepper/Stepper.vue';
  import Well from "../../components/Ui/Well/Well.vue";
  import Placeholder from '../../components/utils/placeholder.vue';
  import successIcon from "../../../../templates/svg/illustrations/success.svg";
  import { excerpt } from "../../helpers";
  import { Organization } from '@etalab/data.gouv.fr-components';

  const props = defineProps<{
    organization: Organization;
    steps: Array<any>;
  }>();
  </script>
  