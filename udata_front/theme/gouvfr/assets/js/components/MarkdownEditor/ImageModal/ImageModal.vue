<template>
  <Teleport to="body">
    <dialog v-bind="$attrs" :aria-labelledby="imageModalTitleId" :id="id" role="dialog" class="fr-modal" ref="modalRef">
      <div class="fr-container fr-container--fluid fr-container-md">
        <div class="fr-grid-row fr-grid-row--center">
            <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div class="fr-modal__body">
                    <div class="fr-modal__header">
                        <button
                          class="fr-btn--close fr-btn"
                          aria-controls="fr-modal-2"
                          @click="close"
                        >
                          {{ t('Close') }}
                        </button>
                    </div>
                    <div class="fr-modal__content">
                        <h1 :id="imageModalTitleId" class="fr-mb-2w fr-modal__title">
                            <span class="fr-icon-image-line fr-icon--lg"></span>
                            {{ t('Add an image') }}
                        </h1>
                        <p>{{ t("Paste a link of your image to add it to your description. It is recommended to also provide a textual alternative for an informative image and a title.") }}</p>
                        <RequiredExplanation />
                        <InputGroup
                          :label="t('Image link')"
                          :placeholder="t('Paste your link...')"
                          :required="true"
                          v-model="form.src"
                          type="url"
                          :hasError="fieldHasError('src')"
                          :errorText="getErrorText('src')"
                        />
                        <details>
                          <summary data-testid="summary">{{ t("Customize accessibility options") }}</summary>
                          <div class="fr-my-1w">
                            <InputGroup
                              :label="t('Image alternative text')"
                              v-model="form.alt"
                            />
                            <InputGroup
                              :label="t('Image title')"
                              v-model="form.title"
                            />
                          </div>
                        </details>

                    </div>
                    <div class="fr-modal__footer">
                        <div class="fr-btns-group fr-btns-group--right">
                            <button class="fr-btn" @click="send" data-testid="add-image-button">
                              {{ t('Add image') }}
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
export type ImageModalProps = {
  id: string,
};
export type ImageModalForm = {
  src: string,
  title: string,
  alt: string,
};
</script>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useI18n } from "vue-i18n";
import InputGroup from "../../Form/InputGroup/InputGroup.vue";
import useFunctionalState from '../../../composables/form/useFunctionalState';
import { required } from '../../../i18n';
import RequiredExplanation from '../../Ui/RequiredExplanation/RequiredExplanation.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ImageModalProps>();

const emit = defineEmits<{
  (event: 'sendModal', form: ImageModalForm): void,
}>();

const { t } = useI18n();
const imageModalTitleId = computed(() => props.id + "-title");
const modalRef = ref<HTMLDialogElement | null>();

const initialState = {
  src: "",
  title: "",
  alt: "",
};

const form = reactive<ImageModalForm>({...initialState});

const requiredRules = {
  src: { required },
};

const { getErrorText, getFunctionalState, hasError, reset, validateRequiredRules, v$ } = useFunctionalState(form, requiredRules, requiredRules);

const state = computed(() => {
  return {
    src: getFunctionalState(v$.value.src.$dirty, v$.value.src.$error, false),
  };
});

function fieldHasError(field: string) {
  return hasError(state, field);
}

function close() {
  globalThis.dsfr(modalRef.value).modal.conceal();
  form.src = initialState.src;
  form.title = initialState.title;
  form.alt = initialState.alt;
  reset();
};

function send() {
  validateRequiredRules().then(valid => {
    if(valid) {
      emit('sendModal', {...form});
      close();
    }
  });
};
</script>
