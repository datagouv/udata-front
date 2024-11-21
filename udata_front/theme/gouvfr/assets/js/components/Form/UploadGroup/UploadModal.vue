<template>
  <Teleport to="body">
    <dialog v-bind="$attrs" :aria-labelledby="fileModalTitleId" :id="id" role="dialog" class="fr-modal" ref="modalRef" aria-modal="true">
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
                  :accept="accept"
                  :multiple="multiple"
                  @change="setFiles"
                  :required="true"
                  :hintText="multiple ? $t('Max size: 420 Mb. Multiple files allowed.') : $t('Max size: 420 Mb.')"
                  :hasError="fieldHasError('modalFiles')"
                  :errorText="getErrorText('modalFiles')"
                />
                <FileCard
                  v-for="(resource, index) in nonRemoteFiles"
                  class="fr-mb-3v"
                  :key="index"
                  :file="resource"
                  :showEditAndWarning="false"
                  @delete="removeFile(index)"
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
                  :hasError="fieldHasError('modalFiles')"
                  :errorText="getErrorText('modalFiles')"
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
import FileCard from '../FileCard/FileCard.vue';
import InputGroup from '../InputGroup/InputGroup.vue';
import UploadGroup from './UploadGroup.vue';
import useFunctionalState from '../../../composables/form/useFunctionalState';
import { useFilesUpload } from '../../../composables/form/useFilesUpload';
import { requiredWithCustomMessage } from '../../../i18n';
import { VALIDATION_SCOPE } from '../../../composables/form/useFileValidation';

export default defineComponent({
  components: { Container, FileCard, InputGroup, UploadGroup },
  emits: ["send"],
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const fileModalTitleId = computed(() => props.id + "-title");

    const { allowedExtensions } = useFilesUpload();

    /**
     * Format allowed extensions as a string with comma between each and a `.` before the extension.
     * This is the format required by the input accept attribute.
     */
    const accept = computed(() => allowedExtensions.value.map(extension => `.${extension}`).join(","));

    /** @type {import("vue").Ref<HTMLDialogElement | null>} */
    const modalRef = templateRef('modalRef');

    /** @type {import("vue").Ref<Array<import("../../../types").NewDatasetFile>>} */
    const modalFiles = ref([]);

    const fileRequired = requiredWithCustomMessage(t("At least one file or link is required."));

    const requiredRules = {
      modalFiles: { fileRequired },
    };

    const { getErrorText, getFunctionalState, hasError, reset, validateRequiredRules, v$ } = useFunctionalState({ modalFiles }, requiredRules, requiredRules, VALIDATION_SCOPE);

    /**
     * @type {import("vue").ComputedRef<Record<string, import("../../../types").AccordionFunctionalState>>}
     */
    const state = computed(() => {
      return {
        modalFiles: getFunctionalState(v$.value.modalFiles.$dirty, v$.value.modalFiles.$error, false),
      };
    });

    /**
     *
     * @param {string} field
     */
    const fieldHasError = (field) => hasError(state, field);

    const nonRemoteFiles = computed(() => modalFiles.value.filter(file => file.filetype === "file"));

    /**
     *
     * @param {Array<File>} newFiles
     */
    const setFiles = (newFiles) => {
      modalFiles.value = nonRemoteFiles.value;
      for(const file of newFiles) {
        modalFiles.value.push({
          file,
          description: "",
          format: guessFormat(file),
          filesize: file.size,
          filetype: "file",
          mime: file.type,
          title: file.name,
          type: "main",
          state: "none"
        });
      }
    }

    /**
     * Try to guess file format using MIME type or name.
     * @param {File} file
     */
    const guessFormat = (file) => {
      const formatFromMime = file.type.includes("/") ? file.type.split("/").pop() || "" : file.type;
      let guessedFormat = allowedExtensions.value.includes(formatFromMime) ? formatFromMime : "";
      if(!guessedFormat) {
        const formatFromName = file.name.includes(".") ? file.name.split(".").pop() || "" : file.name;
        guessedFormat = allowedExtensions.value.includes(formatFromName) ? formatFromName : "";
      }
      return guessedFormat;
    }

    /**
     *
     * @param {string} url
     */
     const setFileLink = (url) => {
      modalFiles.value = [];
      modalFiles.value.push({
        description: "",
        filetype: "remote",
        title: "",
        format: "",
        mime: "",
        type: "main",
        url,
        state: "none",
      });
    }

    /**
     *
     * @param {number} position
     */
    const removeFile = (position) => modalFiles.value.splice(position, 1);

    const close = () => {
      modalFiles.value = [];
      globalThis.dsfr(modalRef.value).modal.conceal();
      reset();
    };

    const send = () => {
      validateRequiredRules().then(valid => {
        if(valid) {
          emit('send', modalFiles.value);
          close();
        }
      });
    };

    return {
      accept,
      allowedExtensions,
      close,
      fileModalTitleId,
      getErrorText,
      nonRemoteFiles,
      open,
      removeFile,
      send,
      setFileLink,
      setFiles,
      fieldHasError,
      validateRequiredRules,
    }
  },
});
</script>
