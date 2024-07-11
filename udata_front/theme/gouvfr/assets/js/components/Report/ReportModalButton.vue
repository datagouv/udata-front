<template>
  <button
      class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-flag-line"
      data-fr-opened="false"
      :aria-controls="id"
      v-bind="$attrs"
      :disabled="loading"
    >
      {{ t("Report this content") }}
    </button>
    <ReportModal
      :id="id"
      @send="send"
    />
</template>
<script setup lang="ts">
import { getRandomId } from '@etalab/data.gouv.fr-components';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ReportModal, { type ReportModalForm } from './ReportModal.vue';
import { type ObjectType, postReport } from '../../api/reports';
import { useToast } from '../../composables/useToast';

type ObjectData = {
  objectType: ObjectType;
  objectId: string;
};

const props = defineProps<ObjectData>();

const emit = defineEmits<{
  (event: 'send', form: ReportModalForm & ObjectData): void,
}>();

const { t } = useI18n();

const { toast } = useToast();

const loading = ref(false);

const id = getRandomId();

async function send(form: ReportModalForm) {
  loading.value = true;
  await postReport(props.objectType, props.objectId, form.reason, form.message);
  loading.value = false;
  toast.success(t('The content has been reported !'));
}
</script>
