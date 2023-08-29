<template>
  <Teleport to="body">
    <dialog v-bind="$attrs" :aria-labelledby="fileModalTitleId" :id="id" role="dialog" class="fr-modal" ref="modalRef">
      <div class="fr-container fr-container--fluid fr-container-md">
        <div class="fr-grid-row fr-grid-row--center">
          <div class="fr-col-12 fr-col-md-8">
            <div class="fr-modal__body">
              <div class="fr-modal__header">
                <button
                  class="fr-btn--close fr-btn"
                  :title="$t('Close the modal dialog')"
                  :aria-controls="id"
                  target="_self"
                  @click="close"
                >
                  {{ $t('Close') }}
                </button>
              </div>
              <div class="fr-modal__content">
                <h2 :id="fileModalTitleId" class="subtitle subtitle--uppercase fr-mb-1w">{{$t('Add a file')}}</h2>
                <UploadGroup
                  :label="$t('Upload files')"
                  type="drop"
                  :multiple="true"
                  v-model="files"
                  :required="true"
                  :hintText="$t('Max size: 420 Mb. Multiple files allowed.')"
                  :hasError="stateHasError('files')"
                  :errorText="getErrorText('files')"
                />
                <p class="fr-hr-or text-transform-lowercase fr-text--regular text-mention-grey fr-mt-3v">
                  <span class="fr-hr-or-text">{{ $t('or') }}</span>
                </p>
                <h2 class="subtitle subtitle--uppercase fr-mb-1w">{{$t('Add a link')}}</h2>
                <InputGroup
                  :label="$t('Exact link to the file')"
                  :hintText="$t('Type a valid url, starting with https://')"
                  placeholder="https://"
                  @change="setFileLink"
                  type="url"
                  :hasError="stateHasError('files')"
                  :errorText="getErrorText('files')"
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
                    {{ $t("Send") }}
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
<script>
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { templateRef } from '@vueuse/core';
import Container from '../../Ui/Container/Container.vue';
import InputGroup from '../InputGroup/InputGroup.vue';
import UploadGroup from './UploadGroup.vue';
import useFunctionalState from '../../../composables/useFunctionalState';
import { requiredWithCustomMessage } from '../../../i18n';

export default defineComponent({
  components: { Container, InputGroup, UploadGroup },
  emits: ["send"],
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const fileModalTitleId = computed(() => props.id + "-title");

    /** @type {import("vue").Ref<HTMLDialogElement | null>} */
    const modalRef = templateRef('modalRef');

    /** @type {import("vue").Ref<Array<import("../../../types").DatasetFile>>} */
    const files = ref([]);

    const fileRequired = requiredWithCustomMessage(t("At least one file or link is required."));

    const requiredRules = {
      files: { fileRequired },
    };

    const { getErrorText, getFunctionalState, hasError, reset, validateRequiredRules, v$ } = useFunctionalState({ files }, requiredRules, requiredRules);

    /**
     * @type {import("vue").ComputedRef<Record<string, import("../../../types").AccordionFunctionalState>>}
     */
    const state = computed(() => {
      return {
        files: getFunctionalState(v$.value.files.$dirty, v$.value.files.$error, false),
      };
    });

    /**
     *
     * @param {string} field
     */
    const stateHasError = (field) => hasError(state, field);

    /**
     *
     * @param {Array<File>} newFiles
     */
    const setFiles = (newFiles) => {
      files.value = [];
      for(const file of newFiles) {
        files.value.push({
          file,
          description: "",
          format: file.type.includes("/") ? file.type.split("/").pop() || "" : file.type,
          filesize: file.size,
          filetype: "file",
          mime: file.type,
          title: "",
          type: "main"
        });
      }
    }

    /**
     *
     * @param {string} url
     */
     const setFileLink = (url) => {
      files.value = [];
        files.value.push({
        description: "",
        filetype: "remote",
        title: "",
        type: "main",
        url,
      });
    }

    const close = () => {
      files.value = [];
      globalThis.dsfr(modalRef.value).modal.conceal();
      reset();
    };

    const send = () => {
      validateRequiredRules().then(valid => {
        if(valid) {
          emit('send', files.value);
          close();
        }
      });

    };

    return {
      close,
      fileModalTitleId,
      files,
      getErrorText,
      open,
      send,
      setFileLink,
      setFiles,
      stateHasError,
      validateRequiredRules,
    }
  },
});
</script>
