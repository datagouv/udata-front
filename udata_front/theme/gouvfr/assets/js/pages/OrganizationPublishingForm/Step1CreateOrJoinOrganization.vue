<template>
  <div class="fr-grid-row fr-grid-row--top no-wrap wrap-md">
    <Container class="fr-mb-6v">
      <ActionCard
        :title="t('Join an Organization')"
        :content="t('An organization is an entity in which many users can collaborate. The published datasets on the organization\'s name can be edited by its members.')"
        :icon="organizationIcon"
        :stretchHeight="true"
      >
      <template #actions>
        <div class="fr-col-12 fr-grid-row fr-grid-row--top relative">
          <div class="fr-col-12 fr-col-lg-9 fr-py-2v">
            <OrganizationSearch />
          </div>
          <div class="fr-col-12 fr-col-lg-3 fr-ml-auto">
            <div class="fr-grid-row fr-grid-row--middle no-wrap wrap-md">
              <p class="fr-col-auto fr-ml-3v fr-m-0">{{ t('or') }}</p>
              <div class="fr-col-auto fr-ml-3v fr-m-0">
                <button class="fr-btn fr-col-auto" @click="$emit('start')">
                  {{ t("Create an organization") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      </ActionCard>
    </Container>
  </div>
</template>

<script setup lang="ts">
import ActionCard from '../../components/Form/ActionCard/ActionCard.vue';
import OrganizationSearch from '../../components/search/OrganizationSearch/OrganizationSearch.vue';
import Container from '../../components/Ui/Container/Container.vue';
import organizationIcon from "../../../../templates/svg/illustrations/organization.svg";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const emits = defineEmits<{
  (event: 'start'): void,
}>();
</script>
