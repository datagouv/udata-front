<template>
    <div class="fr-container">
      <Stepper :steps="props.steps" :currentStep="0"/>
      <Container>
        <ActionCard
            :title="$t('Join an Organization')"
            :content="$t('An organization is an entity in which many users can collaborate. The published datasets on the organization\'s name can be edited by its members', {site: title})"
            :icon="schemaIcon"
            :stretchHeight="true"
        >
          <template #actions>
            <div class="w-100 fr-grid-row fr-grid-row--middle fr-mt-5v justify-between">
                <div class="fr-col-8 fr-my-0">
                    <MultiSelect
                        :searchPlaceholder="$t('Search an organization...')"
                        :allOption="$t('All organizations')"
                        suggestUrl="/organizations/suggest/"
                        entityUrl="/organizations/"
                        values=""
                    />
                </div>
                <div class="fr-col-4 fr-grid-row fr-grid-row--middle fr-pl-1v">
                    <p class="fr-col-auto fr-text--sm fr-m-0 fr-mr-1w">{{ $t('or') }}</p>
                    <div class="fr-col">
                        <button class="fr-btn" @click="$emit('start')">
                        {{ $t("Create an organization") }}
                        </button>
                    </div>
                </div>
            </div>
          </template>
        </ActionCard>
      </Container>
    </div>
  </template>
  
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import ActionCard from '../../components/Form/ActionCard/ActionCard.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Container from '../../components/Ui/Container/Container.vue';
import { title } from "../../config";
import schemaIcon from "../../../../templates/svg/illustrations/schema.svg";

const props = defineProps<{
  steps: Array<any>;
}>();

const emits = defineEmits(["start"]);
</script>
