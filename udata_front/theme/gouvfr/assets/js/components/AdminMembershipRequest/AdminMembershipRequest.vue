<template>
  <Container class="drop-shadow rounded-xxs fr-mt-3w">
    <div class="fr-mt-n9v fr-mb-2w">
      <p class="fr-badge fr-badge--info fr-badge--no-icon">
        <span class="fr-icon-user-add-line" aria-hidden="true"></span>
        {{ t("Membership Request") }}
      </p>
    </div>
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
      <div class="fr-col">
       <div class="fr-grid-row fr-grid-row--middle">
        <Avatar
          class="fr-mr-1v"
          :user="request.user"
          :rounded="true"
          :size="24"
        />
        {{ t("{fullName} asks to join the organization.", {fullName: request.user.first_name + " " + request.user.last_name}) }}
       </div>
       <div class="fr-ml-3v fr-mt-1-5v fr-mb-0 filet filet-default-grey fr-text--sm">
        {{ request.comment }}
       </div>
      </div>
      <div class="fr-col-auto fr-grid-row flex-direction-column" v-if="showActions">
        <button
          class="fr-btn fr-btn--sm fr-btn--icon-left fr-mb-1w fr-icon-check-line"
          @click="$emit('accept', request.id)"
          :disabled="loading"
          data-testid="accept"
        >
          {{ t("Accept request") }}
        </button>
        <button
          class="fr-btn fr-btn--icon-left fr-btn--sm fr-btn--secondary fr-btn--secondary--error fr-icon-close-line"
          :disabled="loading"
          data-fr-opened="false"
          :aria-controls="modalId"
          data-testid="refuse"
        >
          {{ t("Refuse") }}
        </button>
        <Teleport to="body">
          <dialog
            :aria-labelledby="modalTitleId"
            role="dialog"
            :id="modalId"
            class="fr-modal"
            data-testid="modal"
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
                        @click.prevent="cancel"
                      >
                        {{ t("Close") }}
                      </button>
                    </div>
                    <div class="fr-modal__content">
                      <h1
                        :id="modalTitleId"
                        class="fr-modal__title fr-mb-2w"
                      >
                        {{ t("Refuse membership request") }}
                      </h1>
                      <MembershipRequest
                        class="fr-mt-4w fr-mb-2w"
                        :loading="false"
                        :oid="oid"
                        :request="request"
                        :show-actions="false"
                      />
                      <form
                        @submit.prevent="refuse"
                        @reset="cancel"
                      >
                        <InputGroup
                          :label="t('You can provide the refusal reason:')"
                          v-model="comment"
                          data-testid="comment-group"
                        />
                        <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--right">
                          <div class="fr-col-auto">
                            <button
                              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500"
                              type="reset"
                              :disabled="loading"
                              data-testid="cancel-modal-button"
                            >
                              {{ t("Cancel") }}
                            </button>
                          </div>
                          <div class="fr-col-auto">
                            <button
                              class="fr-btn"
                              type="submit"
                              :disabled="loading"
                              data-testid="refuse-modal-button"
                            >
                              {{ t("Refuse request") }}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        </Teleport>
      </div>
    </div>
  </Container>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Avatar from '../discussions/Avatar/Avatar.vue';
import Container from '../Ui/Container/Container.vue';
import type { PendingMembershipRequest } from '../../types';
import InputGroup from '../Form/InputGroup/InputGroup.vue';
import { getRandomId } from '@etalab/data.gouv.fr-components';

const props = defineProps<{
  loading: boolean,
  oid: string,
  request: PendingMembershipRequest,
  showActions: boolean,
}>();

const emit = defineEmits<{
  (event: 'accept', id: string): void,
  (event: 'refuse', id: string, comment: string): void,
}>();

const { t } = useI18n();

const comment = ref("");
const modalId = getRandomId("modal");
const modalTitleId = getRandomId("modalTitle");

function hide() {
  const modal = document.getElementById(modalId);
  globalThis.dsfr(modal).modal.conceal();
}

function refuse() {
  emit('refuse', props.request.id, comment.value);
  hide();
}

function cancel() {
  comment.value = "";
  hide();
}
</script>
