<template>
  <div
    class="fr-upload-group"
    :class="inputGroupClass"
  >
    <button class="fr-btn fr-btn--icon-left fr-icon-upload-line" @click="openInput" :disabled="disabled">
      {{ label }}
    </button>
    <p :id="validTextId" class="fr-valid-text" v-if="isValid">
      {{ validText }}
    </p>
    <p :id="errorTextId" class="fr-error-text" v-else-if="hasError">
      {{ errorText }}
    </p>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import useUid from '../../../composables/useUid';
import Required from '../../Ui/Required/Required.vue';

/**
 * @typedef {Object} Option
 * @property {string} label - Label (display) of the option
 * @property {string} value - Value (id) of the option
 * @property {boolean} disabled - if the option is disabled
 * @property {boolean} hidden - if the option is hidden
 * @property {boolean} selected - if the option is selected
 */

export default defineComponent({
  components: { Required },
  emits: ['change'],
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
    hintText: {
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
    modelValue: {
      type: Array,
      default: () => [],
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

    /** @type {import("vue").Ref<HTMLInputElement | null>} */
    const input = ref(null);

    const errorTextId = computed(() => id + "-desc-error");
    const validTextId = computed(() => id + "-desc-valid");
    const ariaDescribedBy = computed(() => {
      let describedBy = "";
      if (props.isValid) {
        describedBy += " " + validTextId;
      }
      else if (props.hasError) {
        describedBy += " " + errorTextId;
      }
      return describedBy;
    });

    const inputGroupClass = computed(() => {
      return {
        'fr-input-group--disabled': props.disabled,
        'fr-input-group--error': props.hasError,
        'fr-input-group--valid': props.isValid
      };
    });

    /**
     *
     * @param {Event} event
     */
    const change = (event) => {
      const target = /** @type {HTMLInputElement | null} */ (event.target);
      if(props.multiple) {
        emit('change', target?.files);
      } else {
        emit('change', target?.files?.item(0));
      }
    }

    const openInput = () => input.value?.click();

    return {
      ariaDescribedBy,
      change,
      errorTextId,
      id,
      input,
      inputGroupClass,
      openInput,
      validTextId,
    };
  },
});
</script>
