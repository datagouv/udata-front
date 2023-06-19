<template>
  <div
    class="fr-select-group"
    :class="selectGroupClass"
  >
    <label class="fr-label" :for="id">
      {{ label }}
      <Required :required="required"/>
      <span class="fr-hint-text" v-if="hintText">{{ hintText }}</span>
    </label>
    <select
      class="fr-select"
      :class="{ 'fr-select--error': hasError, 'fr-select--valid': isValid }"
      :aria-describedby="ariaDescribedBy"
      :id="id"
      :required="required"
      :disabled="disabled"
      @change="change"
    >
      <option
        value=""
        :selected="!modelValue"
        disabled
        hidden
      >
        {{ $t("Select an option") }}
      </option>
      <option
        v-for="option in options"
        :value="option.value"
        :selected="option.selected"
        :disabled="option.disabled"
        :hidden="option.hidden"
      >
        {{ option.label }}
      </option>
    </select>
    <p :id="validTextId" class="fr-valid-text" v-if="isValid">
      {{ validText }}
    </p>
    <p :id="validTextId" class="fr-error-text" v-else-if="hasError">
      {{ errorText }}
    </p>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
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
  emits: ['update:modelValue'],
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
      type: String,
      default: undefined,
    },
    options: {
      /** @type {import("vue").PropType<Array<Option>>} */
      type: Array,
      required: true,
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
    const { id } = useUid("select");

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

    const selectGroupClass = computed(() => {
      return {
        'fr-select-group--disabled': props.disabled,
        'fr-select-group--error': props.hasError,
        'fr-select-group--valid': props.isValid
      };
    });

    /**
     *
     * @param {Event} event
     */
    const change = (event) => {
      const target = /** @type {HTMLSelectElement | null} */ (event.target);
      emit('update:modelValue', target?.value);
    }

    return {
      ariaDescribedBy,
      change,
      errorTextId,
      id,
      selectGroupClass,
      validTextId,
    };
  },
});
</script>
