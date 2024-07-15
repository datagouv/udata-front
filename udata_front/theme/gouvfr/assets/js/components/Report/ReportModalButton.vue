<template>
  <button
      class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-flag-line"
      data-fr-opened="false"
      :aria-controls="id"
      v-bind="$attrs"
      :disabled="loading"
      :title="t('Make a report')"
    >
      {{ t("Make a report") }}
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

type ObjectData = {
  objectType: ObjectType;
  objectId: string;
};

const props = defineProps<ObjectData>();

const emit = defineEmits<{
  (event: 'send', form: ReportModalForm & ObjectData): void,
}>();

const { t } = useI18n();

const loading = ref(false);

const id = getRandomId();

async function send(form: ReportModalForm) {
  loading.value = true;
  await postReport(props.objectType, props.objectId, form.reason, form.message);
  loading.value = false;
}
</script>
