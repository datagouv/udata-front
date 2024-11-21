<template>
  <div class="fr-container--fluid">
    <Breadcrumb>
      <li>
        <router-link class="fr-breadcrumb__link" to="/">
          {{ t('Administration') }}
        </router-link>
      </li>
      <li v-if="currentOrganization">
        <router-link class="fr-breadcrumb__link" to="/">
          {{ currentOrganization.name }}
        </router-link>
      </li>
      <li>
        <a class="fr-breadcrumb__link" aria-current="page">
          {{ t('Profile') }}
        </a>
      </li>
    </Breadcrumb>
    <h1 class="fr-h3 fr-mb-5v">{{ t("Profile") }}</h1>
    <Container
      v-if="organization"
      class="fr-mb-5v"
    >
      <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle justify-between">
        <div class="fr-col-12 fr-col-md fr-grid-row fr-grid-row--middle">
          <Placeholder
              :src="organization.logo"
              type="organization"
              :size="80"
              class="rounded-xxs border"
            />
          <div class="fr-ml-3v fr-my-0 fr-h3">
            {{ organization.name }}
            <span
              v-if="organizationCertified"
              class="fr-icon-success-line fr-icon--lg text-blue-400"
              :title="t('The identity of this public service is certified by {certifier}', { certifier: title })"
              aria-hidden="true"
            >
            </span>
          </div>
        </div>
        <div class="fr-col-auto">
          <a
            :href="organization.page"
            class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 fr-btn--icon-left fr-icon-eye-line"
          >
            {{ t('See the organization page') }}
          </a>
        </div>
      </div>
    </Container>
    <h2 class="subtitle subtitle--uppercase fr-mb-5v" v-if="form" :id="form.legend">
      {{ t("Edit profile") }}
    </h2>
    <AdminLoader v-if="loading && !organization" />
    <DescribeOrganizationFrom
      v-if="organization"
      :organization="organization"
      :errors="errors"
      :showLegend="false"
      :showWell="false"
      ref="form"
      @submit="updateCurrentOrganization"
    >
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
              data-fr-opened="false"
              :aria-controls="modalId"
            >
              {{ t('Delete') }}
            </button>
            <Teleport to="body">
              <dialog
                :aria-labelledby="modalTitleId"
                role="dialog"
                :id="modalId"
                class="fr-modal"
              >
                <div class="fr-container fr-container--fluid fr-container-md">
                  <div class="fr-grid-row fr-grid-row--center">
                    <div class="fr-col-12 fr-col-md-8">
                      <div class="fr-modal__body">
                        <div class="fr-modal__header">
                          <button
                            class="fr-btn--close fr-btn"
                            :title="t('Close the modal dialog')"
                            :aria-controls="modalId"
                          >
                            {{ t("Close") }}
                          </button>
                        </div>
                        <div class="fr-modal__content">
                          <h1
                            :id="modalTitleId"
                            class="fr-modal__title fr-mb-2w"
                          >
                            {{ t("Are you sure you want to delete this organization ?") }}
                          </h1>
                          <p class="fr-text--bold">{{ t("This action can't be reverse.") }}</p>
                          <p>{{ t("All content published with this organization will stay online, with the same URL but in an anonymous form, i.e. without being linked to a data producer.") }}</p>
                          <p>{{ t("If you want to delete your published content too, start by deleting the contents before deleting your account.") }}</p>
                        </div>
                        <div class="fr-modal__footer">
                          <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                              <button
                                class="fr-btn fr-btn--secondary fr-btn--secondary--error"
                                role="button"
                                :disabled="loading"
                                @click="deleteCurrentOrganization"
                              >
                                  {{ t("Delete") }}
                              </button>
                          </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </Teleport>
          </div>
        </AdminDangerZone>
      </template>
    </DescribeOrganizationFrom>
  </div>
</template>
<script setup lang="ts">
import { getRandomId, NewOrganization, Placeholder, useOrganizationCertified, type Organization } from '@datagouv/components/ts';
import { onMounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
import { deleteOrganization, getOrganization, updateOrganization, uploadLogo } from '../../../api/organizations';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import AdminDangerZone from "../../../components/AdminDangerZone/AdminDangerZone.vue";
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import { useToast } from '../../../composables/useToast';
import DescribeOrganizationFrom from "../../OrganizationPublishingForm/Step2DescribeOrganization.vue";
import AdminLoader from '../../../components/AdminLoader/AdminLoader.vue';
import Container from '../../../components/Ui/Container/Container.vue';
import { title } from '../../../config';

const { t } = useI18n();
const { toast } = useToast();
const props = defineProps<{oid: string}>();
const router = useRouter();
const form = ref<InstanceType<typeof DescribeOrganizationFrom> | null>(null);

const { currentOrganization } = useCurrentOrganization();
const organization = ref<Organization | null>(null);
const { organizationCertified } = useOrganizationCertified(organization);
const errors = ref([]);
const loading = ref(false);
const modalId = getRandomId("modal");
const modalTitleId = getRandomId("modalTitle");

function deleteCurrentOrganization() {
  if(currentOrganization.value) {
    loading.value = true;
    deleteOrganization(currentOrganization.value.id)
    .then(() => {
      router.replace("/");
      window.location.reload();
    })
    .catch(() => toast.error(t("An error occured when deleting the organization.")))
    .finally(() => loading.value = false);
  }
}

async function updateCurrentOrganization(updatedOrganization: NewOrganization | Organization, logo_file: File | null) {
  loading.value = true;
  try {
    organization.value = await updateOrganization(updatedOrganization as Organization)
    toast.success(t("Organization updated !"))
  } catch (e) {
    toast.error(t("An error occured when updating the organization."))
  } finally {
    loading.value = false;
  }
  if (logo_file && organization.value) {
    loading.value = true;
    try {
      const resp = await uploadLogo(organization.value.id, logo_file);
      organization.value.logo_thumbnail = resp.image;
    } catch (e) {
      toast.error(t("Failed to upload logo, you can upload it again in your management panel"));
    } finally {
      loading.value = false;
    }
  }
}

onMounted(async () => {
  loading.value = true;
  try {
    organization.value = await getOrganization(props.oid);
  } finally {
    loading.value = false;
  }
});
</script>
