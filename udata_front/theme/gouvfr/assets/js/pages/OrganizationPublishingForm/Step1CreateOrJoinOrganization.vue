<template>
  <div class="fr-container">
    <Stepper :steps="props.steps" :currentStep="0"/>
    <Container>
      <ActionCard
        :title="t('Join an Organization')"
        :content="t('An organization is an entity in which many users can collaborate. The published datasets on the organization\'s name can be edited by its members', {site: title})"
        :icon="schemaIcon"
        :stretchHeight="true"
      >
      <template #actions>
        <div class="fr-col-12 fr-grid-row fr-grid-row--middle">
          <div class="fr-col-12 fr-col-lg-9 fr-pb-2v">
            <MultiSelect
              :searchPlaceholder="t('Search an organization...')"
              :allOption="t('All organizations')"
              suggestUrl="/organizations/suggest/"
              entityUrl="/organizations/"
              hasLink="true"
              :linkText="t('See organization')"
            />
          </div>
          <div class="fr-col-12 fr-col-lg-3 fr-grid-row fr-grid-row--right">
            <p class="fr-text--sm fr-px-2v fr-col-auto">{{ t('or') }}</p>
            <button class="fr-btn fr-col-auto" @click="$emit('start')">
              {{ t("Create an organization") }}
            </button>
          </div>
        </div>
      </template>
      </ActionCard>
    </Container>
  </div>
</template>
  
<script setup lang="ts">
import ActionCard from '../../components/Form/ActionCard/ActionCard.vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Container from '../../components/Ui/Container/Container.vue';
import { title } from "../../config";
import schemaIcon from "../../../../templates/svg/illustrations/schema.svg";
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  steps: Array<string>;
}>();

const { t } = useI18n();

const emits = defineEmits<{
  (event: 'start'): void,
}>();
</script>
