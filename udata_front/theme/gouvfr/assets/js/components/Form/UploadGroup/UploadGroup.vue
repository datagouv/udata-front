<template>
  <div
    class="fr-upload-group"
    :class="inputGroupClass"
  >
    <button class="fr-btn fr-btn--icon-left fr-icon-upload-line" @click="openInput" v-if="isButton" :disabled="disabled">
      {{ label }}
    </button>
    <div v-show="!isButton">
      <label class="fr-label" :for="id">
        {{ label }}
        <Required :required="required" v-if="!isButton"/>
        <span class="fr-hint-text" v-if="hintText">{{ hintText }}</span>
      </label>
      <input
        class="fr-upload"
        type="file"
        :id="id"
        :disabled="disabled"
        :multiple="multiple"
        ref="input"
        @change="change"
      />
    </div>
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
    type: {
      type: /** @type {import("vue").PropType<import("../../../types").UploadType>} */(String),
      default: "input"
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

    const isButton = computed(() => props.type === "button");

    return {
      ariaDescribedBy,
      change,
      errorTextId,
      id,
      input,
      inputGroupClass,
      isButton,
      openInput,
      validTextId,
    };
  },
});
</script>
