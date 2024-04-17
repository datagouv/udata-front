<template>
  <Teleport to="body">
    <dialog
      :aria-labelledby="modalTitleId"
      role="dialog"
      :id="id"
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
                  :aria-controls="id"
                >
                  {{ t("Close") }}
                </button>
              </div>
              <form
                @submit.prevent="addMember"
              >
                <div class="fr-modal__content">
                  <h1
                    :id="modalTitleId"
                    class="fr-modal__title fr-mb-2w"
                  >
                    {{ t("Add member to the organization") }}
                  </h1>
                  <InputGroup
                    :label="t('Search a user')"
                    :model-value="userId"
                    @update:model-value="(user) => userId = user"
                  />
                  <SelectGroup
                    :label="t('Role of the member')"
                    v-if="roles.length > 0"
                    :model-value="role"
                    @update:model-value="(newRole) => role = (newRole as MemberRole)"
                    :options="roles"
                  />
                </div>
                <div class="fr-modal__footer">
                  <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                    <button class="fr-btn fr-icon-checkbox-circle-line fr-btn--icon-left">
                      Label bouton
                    </button>
                    <button
                      class="fr-btn"
                      type="submit"
                      :disabled="loading"
                    >
                      {{ t("Validate") }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script lang="ts">
export type AdminAddMemberModalProps = {
  id: string,
  oid: string,
  roles: Array<Option>,
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { addMember } from "../../api/organizations";
import SelectGroup, { type Option } from "../Form/SelectGroup/SelectGroup.vue";
import type { MemberRole } from '../../types';
import { useToast } from '../../composables/useToast';

const props = defineProps<AdminAddMemberModalProps>();

const emits = defineEmits<{
  (event: 'memberAdded'): void,
}>();

const { t } = useI18n();
const { toast } = useToast();
const loading = ref(false);
const userId = ref<string>();
const role = ref<string>();
const modalTitleId = computed(() => "fr-modal-title-user-" + props.id);

async function addMember() {
  try {
    loading.value = true;
    await addMember(props.oid, userId, role);
    emits('memberAdded');
    closeModal();
  } catch (e) {
    toast.error(t("An error occurred while update member role."));
  } finally {
    loading.value = false;
  }
}

function closeModal() {
  loading.value = false;
  const modal = document.getElementById(props.id);
  globalThis.dsfr(modal).modal.conceal();
}
</script>
