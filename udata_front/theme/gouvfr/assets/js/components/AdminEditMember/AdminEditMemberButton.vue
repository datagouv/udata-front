<template>
  <button
    class="fr-btn fr-btn--sm fr-btn--secondary-grey-500 fr-btn--tertiary-no-outline fr-icon-pencil-line"
    data-fr-opened="false"
    :aria-controls="modalId"
  >
    {{ t("Edit") }}
  </button>
  <AdminEditMemberModal
    :id="modalId"
    :member="member"
    :oid="oid"
    :roles="roles"
    @member-updated="$emit('memberUpdated')"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import AdminEditMemberModal, { type AdminEditMemberModalProps } from "./AdminEditMemberModal.vue";

const props = defineProps<Omit<AdminEditMemberModalProps, "id">>();
defineEmits<{
  (event: 'memberUpdated'): void,
}>();

const { t } = useI18n();

const modalId = computed(() => "fr-modal-user-" + props.member.user.id);
</script>
