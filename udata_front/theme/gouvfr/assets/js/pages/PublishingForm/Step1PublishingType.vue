<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="0"/>
    <Container>
      <h1 class="subtitle subtitle--uppercase">
        {{ $t("Publishing type") }}
      </h1>
      <Well
        color="blue-cumulus"
        weight="regular"
        class="fr-mb-3w"
      >
        <span class="fr-icon-info-line fr-mr-1w" aria-hidden="true"></span>
        <i18n-t
          keypath="If you want to do tests, use {demo_server}."
          scope="global"
        >
          <template #demo_server>
            <a :href="demo_server_url">{{ demo_server_name }}</a>
          </template>
        </i18n-t>
      </Well>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-12 fr-col-md-6">
          <ActionCard
            :title="$t('Publish a dataset')"
            :content="$t('Administration or public society, everybody can publish on {site} !', {site: title})"
            :icon="datasetIcon"
            actionsAlignment="end"
            :stretchHeight="true"
          >
            <template #actions>
              <button class="fr-btn" @click="$emit('start')">{{ $t("Start publishing") }}</button>
            </template>
          </ActionCard>
        </div>
        <div class="fr-col-12 fr-col-md-6">
          <ActionCard
            :title="$t('Publish with a schema')"
            :content="$t('Are your data following a reference schema ? Validate, correct and publish your data on {site} !', {site: title})"
            :icon="schemaIcon"
            actionsAlignment="end"
            :stretchHeight="true"
          >
            <template #actions>
              <a class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500" :href="schema_publishing_url">
                {{ $t("Use our dedicated tool") }}
              </a>
            </template>
          </ActionCard>
        </div>
      </div>
    </Container>
    <section class="fr-mt-3w" aria-labelledby="documentation-links">
      <h2 id="documentation-links" class="fr-m-0 fr-mb-3v fr-text--md fr-text--bold">
        {{ $t("Are you an administration and do you want to automate your data publishing ?") }}
      </h2>
      <p class="fr-m-0 fr-mb-3v">
        {{ $t("You can automatically publish via API or by linking your open data portal to {site} with an harvester.", {site: title}) }}
      </p>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-auto">
          <p class="fr-m-0">
            <a class="fr-link" :href="api_doc_external_link" target="_blank">{{ $t("See API documentation") }}</a>
          </p>
        </div>
        <div class="fr-col-auto">
          <p class="fr-m-0">
            <a class="fr-link" :href="guides_harvesting_url" target="_blank">{{ $t("Learn more about harvesting") }}</a>
          </p>
        </div>
        <div class="fr-col-auto">
          <p class="fr-m-0">
            <a class="fr-link" :href="support_url" target="_blank">{{ $t("Contact us") }}</a>
          </p>
        </div>
      </div>
    </section>
    <section class="fr-mt-5w" aria-labelledby="cataloging-links">
      <h2 id="cataloging-links" class="fr-m-0 fr-mb-3v fr-text--md fr-text--bold">
        {{ $t("Are you an administration and do you want to catalog your data ?") }}
      </h2>
      <p class="fr-m-0 fr-mb-3v">
        {{ $t("You can use the service for central administrations to manage and open their data catalog.", {site: title}) }}
      </p>
      <p class="fr-m-0">
        <a class="fr-link" :href="catalog_url" target="_blank">{{ $t("Go to cataloging space") }}</a>
      </p>
    </section>
  </div>
</template>

<script>
import { Well } from "@etalab/data.gouv.fr-components";
import { defineComponent } from 'vue';
import ActionCard from '../../components/Form/ActionCard/ActionCard.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Container from '../../components/Ui/Container/Container.vue';
import { api_doc_external_link, guides_harvesting_url, schema_publishing_url, support_url, catalog_url, demo_server_name, demo_server_url, title } from "../../config";
import datasetIcon from "../../../../templates/svg/illustrations/dataset.svg";
import schemaIcon from "../../../../templates/svg/illustrations/schema.svg";

export default defineComponent({
  components: { ActionCard, Container, Stepper, Well },
  emits: ["start"],
  props: {
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    return {
      api_doc_external_link,
      catalog_url,
      demo_server_name,
      demo_server_url,
      datasetIcon,
      guides_harvesting_url,
      schemaIcon,
      schema_publishing_url,
      support_url,
      title,
    }
  },
});
</script>
