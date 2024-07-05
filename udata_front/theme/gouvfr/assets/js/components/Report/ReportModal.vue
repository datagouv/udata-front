<template>
  <Teleport to="body">
    <dialog v-bind="$attrs" :aria-labelledby="reportModalTitleId" :id="id" role="dialog" class="fr-modal" ref="modalRef">
      <div class="fr-container fr-container--fluid fr-container-md">
        <div class="fr-grid-row fr-grid-row--center">
          <div class="fr-col-12 fr-col-md-8">
            <div class="fr-modal__body">
              <div class="fr-modal__header">
                <button
                  class="fr-btn--close fr-btn"
                  :title="t('Close the modal dialog')"
                  :aria-controls="id"
                  target="_self"
                  @click="close"
                >
                  {{ t('Close') }}
                </button>
              </div>
              <div class="fr-modal__content">
                <h2 :id="reportModalTitleId" class="fr-mb-2w">
                  {{ t('Report this content') }}
                </h2>
                <Well class="fr-mb-2w" color="warning" weight="regular">
                  <span class="fr-icon-warning-line fr-mr-1v" aria-hidden="true"></span>
                  {{ t("Please only report in case of serious concern.") }}
                  <a href="">{{ t("See our usage policy") }}</a>
                </Well>
                <SelectGroup
                  :label="t('Report reason')"
                  :required="true"
                  v-model="form.reason"
                  :hasError="fieldHasError('reason')"
                  :errorText="getErrorText('reason')"
                  :options="reasons"
                />
                <InputGroup
                  type="textarea"
                  :label="t('Message')"
                  v-model="form.reason"
                  :placeholder="t('Reason of your report.\nDon\'t include any personal data.')"
                />
              </div>
              <div class="fr-modal__footer">
                <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg fr-btns-group--icon-left">
                  <button
                    class="fr-btn"
                    :aria-controls="id"
                    target="_self"
                    @click.prevent.stop.capture="send"
                  >
                    {{ t("Send") }}
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
<script lang="ts">
import type { ReportReason } from '../../api/reports';
import { required } from '../../i18n';
import useFunctionalState from '../../composables/form/useFunctionalState';
import SelectGroup from '../Form/SelectGroup/SelectGroup.vue';
import InputGroup from '../Form/InputGroup/InputGroup.vue';
import getReportReasons from '../../api/reports';

export type ReportModalProps = {
  id: string,
};
export type ReportModalForm = {
  reason: ReportReason,
  message: string,
};
</script>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Well, getRandomId } from '@etalab/data.gouv.fr-components';

defineProps<ReportModalProps>();

const emit = defineEmits<{
  (event: 'send', form: ReportModalForm): void,
}>();

const { t } = useI18n();
const reportModalTitleId = getRandomId("modal-title");
const modalRef = ref<HTMLDialogElement | null>();

const initialState = {
  reason: "",
  message: "",
};

const form = reactive<ReportModalForm>({...initialState});

const reasons = ref([]);

const requiredRules = {
  reason: { required },
};

const { getErrorText, getFunctionalState, hasError, reset, validateRequiredRules, v$ } = useFunctionalState(form, requiredRules, requiredRules);

const fieldHasError = (field: string) => hasError(state, field);

const state = computed(() => {
  return {
    reason: getFunctionalState(v$.value.reason.$dirty, v$.value.reason.$error, false),
  };
});

function close() {
  globalThis.dsfr(modalRef.value).modal.conceal();
  form.message = initialState.message;
  form.reason = initialState.reason;
  reset();
};

function send() {
  validateRequiredRules().then(valid => {
    if(valid) {
      emit('send', {...form});
      close();
    }
  });
};

onMounted(async () => {
  reasons.value = await getReportReasons();
});
</script>
