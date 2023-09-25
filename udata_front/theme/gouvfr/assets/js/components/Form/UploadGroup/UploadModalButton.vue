<template>
  <div
    class="fr-upload-group"
    :class="containerClass"
  >
    <button
      class="fr-btn fr-btn--icon-left fr-icon-upload-line"
      :aria-describedby="ariaDescribedBy"
      data-fr-opened="false"
      :aria-controls="modalId"
      :disabled="disabled"
      v-bind="$attrs"
    >
      {{ label }}
    </button>
    <UploadModal
      :id="modalId"
      :multiple="true"
      @send="onChange"
    />
    <p :id="validTextId" class="fr-valid-text fr-my-0" v-if="isValid">
      {{ validText }}
    </p>
    <p :id="errorTextId" class="fr-error-text fr-my-0" v-else-if="hasError">
      {{ errorText }}
    </p>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import useUid from '../../../composables/useUid';
import UploadModal from './UploadModal.vue';

/**
 * @typedef {Object} Option
 * @property {string} label - Label (display) of the option
 * @property {string} value - Value (id) of the option
 * @property {boolean} disabled - if the option is disabled
 * @property {boolean} hidden - if the option is hidden
 * @property {boolean} selected - if the option is selected
 */

export default defineComponent({
  components: { UploadModal },
  emits: ['change'],
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    groupClass: {
      type: String,
      default: "",
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false
    },
    validText: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const { id } = useUid("upload");

    const errorTextId = computed(() => id + "-desc-error");
    const modalId = computed(() => id + "-modal");
    const validTextId = computed(() => id + "-desc-valid");
    const ariaDescribedBy = computed(() => {
      let describedBy = "";
      if (props.isValid) {
        describedBy = validTextId.value;
      }
      else if (props.hasError) {
        describedBy = errorTextId.value;
      }
      return describedBy;
    });

    const containerClass = computed(() => {
      return {
        [props.groupClass]: true,
        'fr-input-group--disabled': props.disabled,
        'fr-input-group--error': props.hasError,
        'fr-input-group--valid': props.isValid
      };
    });

    /**
     * Handle and emit file changes
     * @param {File[] | null} files
     */
    const onChange = (files) => {
      emit('change', files);
    }

    return {
      ariaDescribedBy,
      containerClass,
      errorTextId,
      id,
      modalId,
      onChange,
      open,
      validTextId,
    };
  },
});
</script>
