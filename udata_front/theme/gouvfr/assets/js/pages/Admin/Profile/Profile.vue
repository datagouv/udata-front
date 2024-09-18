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
    <h2 class="subtitle subtitle--uppercase fr-mb-5v" v-if="form" :id="form.legend">
      {{ t("Edit profile") }}
    </h2>
    <DescribeOrganizationFrom
      v-if="currentOrganization"
      :organization="currentOrganization"
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
import { getRandomId } from '@datagouv/components/ts';
import { onMounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
import { fetchMe } from "../../../api/me";
import { deleteOrganization, updateOrganization } from '../../../api/organizations';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import AdminDangerZone from "../../../components/AdminDangerZone/AdminDangerZone.vue";
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import { useToast } from '../../../composables/useToast';
import DescribeOrganizationFrom from "../../OrganizationPublishingForm/Step2DescribeOrganization.vue";
import type { Me, OrganizationV1 } from "../../../types";

const { t } = useI18n();
const { toast } = useToast();
defineProps<{oid: string}>();
const router = useRouter();
const me = ref<Me | null>(null);
const form = ref<InstanceType<typeof DescribeOrganizationFrom> | null>(null);

const { currentOrganization } = useCurrentOrganization();
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

function updateCurrentOrganization(organization: OrganizationV1) {
  loading.value = true;
  updateOrganization(organization)
  .then(() => toast.success(t("Organization updated !")))
  .catch(() => toast.error(t("An error occured when updating the organization.")))
  .finally(() => loading.value = false);
}

onMounted(async () => me.value = await fetchMe());
</script>
