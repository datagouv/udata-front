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
      :loading="loading"
      :succeeded="succeeded"
      @send="send"
    />
</template>
<script setup lang="ts">
import { getRandomId } from '@datagouv/components/ts';
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

const { t } = useI18n();

const { toast } = useToast();

const loading = ref(false);

const succeeded = ref(false);

const id = getRandomId();

async function send(form: ReportModalForm) {
  try {
    loading.value = true;
    await postReport(props.objectType, props.objectId, form.reason, form.message);
    succeeded.value = true;
  } catch (e) {
    toast.error(t('An unexpected error occured while reporting this content.'))
  } finally {
    loading.value = false;
  }
}
</script>
