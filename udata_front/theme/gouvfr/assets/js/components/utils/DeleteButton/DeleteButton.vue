<template>
  <button
    type="button"
    class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--secondary-warning-425 fr-btn--icon-left fr-icon-delete-line"
    :disabled="readOnlyEnabled"
    data-fr-opened="false"
    :aria-controls="modalId"
  >
    {{ t("Delete") }}
  </button>
  <Teleport to="body">
    <dialog :aria-labelledby="modalTitleId" :id="modalId" class="fr-modal" role="dialog">
      <div class="fr-container fr-container--fluid fr-container-md">
          <div class="fr-grid-row fr-grid-row--center">
              <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
                  <div class="fr-modal__body">
                      <div class="fr-modal__header">
                          <button class="fr-btn--close fr-btn" :aria-controls="modalId">{{ t("Close") }}</button>
                      </div>
                      <div class="fr-modal__content">
                          <h1 :id="modalTitleId" class="fr-modal__title">
                              <span class="fr-icon-delete-line fr-icon--lg"></span>
                              {{ t('Are you sure ?') }}
                          </h1>
                          <p>{{ t('The content will be permanently deleted.') }}</p>
                      </div>
                      <div class="fr-modal__footer">
                          <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                              <button
                                class="fr-btn fr-btn--secondary fr-btn--secondary-warning-425 fr-btn--icon-left fr-icon-delete-line"
                                role="button"
                                @click="deleteObject"
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
</template>

<script setup lang="ts">
import { read_only_enabled } from "../../../config";
import { api } from "../../../plugins/api";
import { auth } from "../../../plugins/auth";
import { useI18n } from "vue-i18n";
import { getRandomId } from "@datagouv/components/ts";
import { useToast } from "../../../composables/useToast";

const props = defineProps<{
  url: string,
}>();

const { t } = useI18n();
const { toast } = useToast();

const readOnlyEnabled = read_only_enabled;

const modalId = getRandomId("delete-modal");
const modalTitleId = modalId + "-title";

function deleteObject() {
  auth();
  return api.delete(props.url)
  .then(() => window.location.reload())
  .catch(() => toast.error(t("An error occured during the deletion.")));
};
</script>
