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
                @submit.prevent="submit"
              >
                <div class="fr-modal__content">
                  <h1
                    :id="modalTitleId"
                    class="fr-modal__title fr-mb-2w"
                  >
                    {{ t("Add member to the organization") }}
                  </h1>
                  <MultiSelect
                    :placeholder="$t('Search a user')"
                    :searchPlaceholder="$t('Search a user...')"
                    suggestUrl="/users/suggest/"
                    :values="userId"
                    @change="(value: string) => userId = value"
                    :allOption="$t('Select a user')"
                    :addAllOption="false"
                    :onSuggest="formatUsers"
                    :roundedImages="true"
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
                  <div class="fr-btns-group fr-btns-group--right fr-btns-group--sm fr-btns-group--inline-lg fr-btns-group--icon-left">
                    <button
                      class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500"
                      type="button"
                      @click="closeModal"
                      :disabled="loading"
                    >
                      {{ t("Cancel") }}
                    </button>
                    <button
                      class="fr-btn"
                      type="submit"
                      :disabled="loading"
                    >
                      {{ t("Add to the organization") }}
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
import { getUserAvatar, type User } from '@datagouv/components/ts';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { addMember } from "../../api/organizations";
import MultiSelect from "../MultiSelect/MultiSelect.vue";
import SelectGroup, { type Option } from "../Form/SelectGroup/SelectGroup.vue";
import type { MemberRole, MultiSelectOption } from '../../types';
import { useToast } from '../../composables/useToast';

const props = defineProps<AdminAddMemberModalProps>();

const emits = defineEmits<{
  (event: 'memberAdded'): void,
}>();

const { t } = useI18n();
const { toast } = useToast();
const loading = ref(false);
const userId = ref<string>();
const role = ref<MemberRole>("editor");
const modalTitleId = computed(() => "fr-modal-title-user-" + props.id);

async function submit() {
  try {
    loading.value = true;
    if(userId.value) {
      await addMember(props.oid, userId.value, role.value);
      emits('memberAdded');
      closeModal();
    }
  } catch (e) {
    toast.error(t("An error occurred while update member role."));
  } finally {
    loading.value = false;
  }
}

type UserSuggest = Omit<User, "avatar" | "avatar_thumbnail" | "roles" | "pages"> & { avatar_url: string | null };

function formatUsers(users: Array<UserSuggest>): Array<MultiSelectOption> {
  return users.map(userSuggested => {
    const user = { ...userSuggested, avatar_thumbnail: userSuggested.avatar_url ?? undefined };
    return  {
      value: user.id,
      label: user.first_name + " " + user.last_name,
      image: getUserAvatar(user, 32),
    };
  });
}

function closeModal() {
  loading.value = false;
  userId.value = undefined;
  role.value = "editor";
  const modal = document.getElementById(props.id);
  globalThis.dsfr(modal).modal.conceal();
}
</script>
