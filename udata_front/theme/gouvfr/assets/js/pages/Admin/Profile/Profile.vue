<template>
  <div class="fr-container--fluid">
    <Breadcrumb>
      <li>
        <router-link class="fr-breadcrumb__link" to="/">
          {{ t('Administration') }}
        </router-link>
      </li>
      <li v-if="organization">
        <router-link class="fr-breadcrumb__link" to="/">
          {{ organization.name }}
        </router-link>
      </li>
      <li>
        <a class="fr-breadcrumb__link" aria-current="page">
          {{ t('Profile') }}
        </a>
      </li>
    </Breadcrumb>
    <DescribeOrganizationFrom v-if="organization" :organization="organization" :errors="errors" @submit="updateCurrentOrganization">
      <template #submitButton="{ submit }">
        <button
          class="fr-btn fr-btn--icon-left fr-icon-save-line"
          :disabled="loading"
          data-testid="submitButton"
          @click="submit"
        >
          {{ t("Save") }}
        </button>
      </template>
      <template #default>
        <AdminDangerZone
          class="fr-mt-6w"
        >
          <div class="fr-col">
            <p class="fr-m-0 text-grey-500">{{ t('Delete the organization') }}</p>
            <p class="fr-m-0 fr-text--xs text-default-error">{{ t("Be careful, this action can't be reverse.") }}</p>
          </div>
          <div class="fr-col-auto">
            <button
              class="fr-btn fr-btn--secondary fr-btn--secondary--error fr-btn--icon-left fr-icon-delete-line"
              :disabled="loading"
              @click="deleteCurrentOrganization"
            >
              {{ t('Delete') }}
            </button>
          </div>
        </AdminDangerZone>
      </template>
    </DescribeOrganizationFrom>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import AdminDangerZone from "../../../components/AdminDangerZone/AdminDangerZone.vue";
import DescribeOrganizationFrom from "../../OrganizationPublishingForm/Step2DescribeOrganization.vue";
import type { Me, OrganizationV1 } from "../../../types";
import { fetchMe } from "../../../api/me";
import { watchEffect } from 'vue';
import { deleteOrganization, getOrganization, updateOrganization } from '../../../api/organizations';
import { useToast } from '../../../composables/useToast';

const { t } = useI18n();
const { toast } = useToast();
const props = defineProps<{oid: string}>();

const me = ref<Me | null>(null);

// TODO : use `useCurrentOrganization` when merged
const organization = ref<OrganizationV1 | null>(null);

const errors = ref([]);

const loading = ref(false);

function deleteCurrentOrganization() {
  if(organization.value) {
    loading.value = true;
    deleteOrganization(organization.value.id)
    .then(() => window.location.reload())
    .catch(() => toast.error(t("An error occured when deleting the organization.")))
    .finally(() => loading.value = false);
  }
}

function updateCurrentOrganization(organization: OrganizationV1, logo: File | null) {
  loading.value = true;
  updateOrganization(organization)
  .then(() => toast.success(t("Organization updated !")))
  .catch(() => toast.error(t("An error occured when updating the organization.")))
  .finally(() => loading.value = false);
}

onMounted(async () => me.value = await fetchMe());

watchEffect(async () => {
  organization.value = await getOrganization(props.oid);
});
</script>
