<template>
  <button
    class="fr-btn fr-btn--sm fr-btn--icon-left fr-icon-add-line"
    data-fr-opened="false"
    :aria-controls="modalId"
  >
    {{ t("Add member") }}
  </button>
  <AdminAddMemberModal
    :id="modalId"
    :oid="oid"
    :roles="roles"
    @member-added="$emit('memberAdded')"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import AdminAddMemberModal, { type AdminAddMemberModalProps } from "./AdminAddMemberModal.vue";

const props = defineProps<Omit<AdminAddMemberModalProps, "id">>();
defineEmits<{
  (event: 'memberAdded'): void,
}>();

const { t } = useI18n();

const modalId = computed(() => "fr-modal-add-user-" + props.oid);
</script>
