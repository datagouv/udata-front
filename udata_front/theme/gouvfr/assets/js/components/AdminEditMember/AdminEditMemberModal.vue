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
              <div class="fr-modal__content">
                <h1
                  :id="modalTitleId"
                  class="fr-modal__title fr-mb-2w"
                >
                  {{ t("Edit member") }}
                </h1>
                <p class="fr-grid-row fr-grid-row--middle fr-text--bold fr-mb-2w">
                  <Avatar
                    class="fr-mr-1v"
                    :user="member.user"
                    :rounded="true"
                    :size="24"
                  />
                  {{ member.user.first_name }} {{ member.user.last_name }}
                </p>
                <form
                  class="fr-grid-row fr-grid-row--gutters fr-grid-row--bottom"
                  @submit.prevent="updateRole(member)"
                >
                  <div class="fr-col">
                    <SelectGroup
                      :label="t('Role of the member')"
                      v-if="roles.length > 0"
                      :model-value="member.role"
                      @update:model-value="(newRole) => member.newRole = (newRole as MemberRole)"
                      :options="getRolesWithSelected(member.role)"
                    />
                  </div>
                  <div class="fr-col-auto">
                    <button
                      class="fr-btn"
                      type="submit"
                      :disabled="loading"
                    >
                      {{ t("Validate") }}
                    </button>
                  </div>
                </form>
                <AdminDangerZone
                  class="fr-mt-2w"
                >
                  <div class="fr-col">
                    <p class="fr-m-0 text-grey-500">{{ t('Remove member from the organization') }}</p>
                    <p class="fr-m-0 fr-text--xs text-default-error">{{ t("Be careful, this action can't be reverse.") }}</p>
                  </div>
                  <div class="fr-col-auto">
                    <button
                      class="fr-btn fr-btn--secondary fr-btn--secondary--error fr-btn--icon-left fr-icon-logout-box-r-line"
                      :disabled="loading"
                      @click="removeMemberFromOrganization(member)"
                    >
                      {{ t('Remove member') }}
                    </button>
                  </div>
                </AdminDangerZone>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script lang="ts">
export type AdminEditMemberModalProps = {
  id: string,
  member: EditingMember,
  oid: string,
  roles: Array<Option>,
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { removeMember, updateMemberRole } from "../../api/organizations";
import AdminDangerZone from "../AdminDangerZone/AdminDangerZone.vue";
import Avatar from "../discussions/Avatar/Avatar.vue";
import SelectGroup, { type Option } from "../Form/SelectGroup/SelectGroup.vue";
import type { EditingMember, Member, MemberRole } from '../../types';
import { useToast } from '../../composables/useToast';

const props = defineProps<AdminEditMemberModalProps>();

const emits = defineEmits<{
  (event: 'memberUpdated'): void,
}>();

const modalTitleId = computed(() => "fr-modal-title-user-" + props.id);

const { t } = useI18n();

const { toast } = useToast();

const loading = ref(false);

async function updateRole(member: EditingMember) {
  if(!member.newRole) {
    closeModal();
    return;
  }
  try {
    loading.value = true;
    await updateMemberRole(props.oid, member.user.id, member.newRole);
    emits('memberUpdated');
    closeModal();
  } catch (e) {
    toast.error(t("An error occurred while update member role."));
  } finally {
    loading.value = false;
  }
}

async function removeMemberFromOrganization(member: Member) {
  try {
    loading.value = true;
    await removeMember(props.oid, member.user.id);
    emits('memberUpdated');
  } catch (e) {
    toast.error(t("An error occurred while removing this member."));
  } finally {
    loading.value = false;
  }
}

function getRolesWithSelected(role: MemberRole) {
  return props.roles.map(memberRole => {
    const updatedMemberRole = {...memberRole};
    if(updatedMemberRole.value === role) {
      updatedMemberRole.selected = true;
    }
    return updatedMemberRole;
  });
}

function closeModal() {
  loading.value = false;
  const modal = document.getElementById(props.id);
  globalThis.dsfr(modal).modal.conceal();
}
</script>
