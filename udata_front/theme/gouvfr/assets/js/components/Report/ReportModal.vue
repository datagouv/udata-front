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
                  :disabled="loading"
                  @click="close"
                >
                  {{ t('Close') }}
                </button>
              </div>
              <template v-if="succeeded">
                <div class="fr-modal__content">
                  <h2 :id="reportModalTitleId" class="fr-mb-2w">
                    <span class="fr-icon-success-line fr-icon--lg"></span>{{ t('Thanks for reporting this content') }}
                  </h2>
                  <i18n-t
                    keypath="{site} team will examine the content to check if it breaks our {markup}. Thanks for your help."
                    tag="p"
                    class="fr-mt-0 fr-mb-1w fr-text--xs"
                    scope="global"
                  >
                  <template #site>
                      {{ title }}
                    </template>
                    <template #markup>
                      <a :href="terms_url">{{ t("usage policy") }}</a>
                    </template>
                  </i18n-t>
                </div>
                <div class="fr-modal__footer">
                  <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg fr-btns-group--icon-left">
                    <button
                      class="fr-btn"
                      :aria-controls="id"
                      target="_self"
                      @click.prevent.stop.capture="close"
                    >
                      {{ t("Close") }}
                    </button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="fr-modal__content">
                  <h2 :id="reportModalTitleId" class="fr-mb-2w">
                    {{ t('Report this content') }}
                  </h2>
                  <Well class="fr-mb-2w" color="warning" weight="regular">
                    <span class="fr-icon-warning-line fr-mr-1v" aria-hidden="true"></span>
                    {{ t("Please only report in case of serious concern.") }}
                    <a :href=terms_url>{{ t("See our usage policy") }}</a>
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
                    :required="true"
                    :hasError="fieldHasError('message')"
                    :errorText="getErrorText('message')"
                    v-model="form.message"
                    :placeholder="t(`Reason of your report.{newline}Don't include any personal data.`)"
                  />
                </div>
                <div class="fr-modal__footer">
                  <div class="fr-btns-group fr-btns-group--right fr-btns-group--inline-lg fr-btns-group--icon-left">
                    <button
                      class="fr-btn"
                      :aria-controls="id"
                      target="_self"
                      :disabled="loading"
                      @click.prevent.stop.capture="send"
                    >
                      {{ t("Send") }}
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
<script lang="ts">
import { getReportReasons, type ReportReason } from '../../api/reports';
import { terms_url, title } from '../../config';
import { required } from '../../i18n';
import useFunctionalState from '../../composables/form/useFunctionalState';
import SelectGroup, { type Option } from '../Form/SelectGroup/SelectGroup.vue';
import InputGroup from '../Form/InputGroup/InputGroup.vue';

export type ReportModalProps = {
  id: string,
  loading: boolean,
  succeeded: boolean,
};

export type ReportModalForm = {
  reason: ReportReason,
  message: string,
};
</script>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Well, getRandomId } from '@datagouv/components/ts';

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

const reasons = ref<Array<Option>>([]);

const requiredRules = {
  reason: { required },
  message: { required },
};

const { getErrorText, getFunctionalState, hasError, reset, validateRequiredRules, v$ } = useFunctionalState(form, requiredRules, requiredRules);

const fieldHasError = (field: string) => hasError(state, field);

const state = computed(() => {
  return {
    reason: getFunctionalState(v$.value.reason.$dirty, v$.value.reason.$error, false),
    message: getFunctionalState(v$.value.message.$dirty, v$.value.message.$error, false),
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
    }
  });
};

onMounted(async () => {
  reasons.value = await getReportReasons();
});
</script>
