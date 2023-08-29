<template>
  <div class="fr-input-group" :class="inputGroupClass">
    <label class="fr-label" :for="id">
      {{ label }}
      <Required :required="required" />
      <span class="fr-hint-text" v-if="hintText">{{ hintText }}</span>
    </label>
    <textarea
      v-if="isTextarea"
      class="fr-input"
      :class="{ 'fr-input--error': hasError, 'fr-input--warning': !hasError && hasWarning, 'fr-input--valid': isValid }"
      :aria-describedby="ariaDescribedBy"
      :id="id"
      :disabled="disabled"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @change="change"
      :required="required"
    ></textarea>
    <div v-else-if="isDate" class="fr-mt-1w">
      <Datepicker
        class="fr-input"
        :class="{ 'fr-input--error': hasError, 'fr-input--valid': isValid }"
        :aria-describedby="ariaDescribedBy"
        :id="id"
        :disabled="disabled"
        :modelValue="modelValue"
        @change="change"
        :locale="locale"
        inputFormat="P"
      />
    </div>
    <RangePicker
      v-else-if="isRange"
      :value="modelValue"
      @change="change"
    />
    <input
      v-else
      class="fr-input"
      :class="{ 'fr-input--error': hasError, 'fr-input--valid': isValid }"
      :aria-describedby="ariaDescribedBy"
      :id="id"
      :disabled="disabled"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @change="change"
      :required="required"
    />
    <p :id="validTextId" class="fr-valid-text" v-if="isValid">
      {{ validText }}
    </p>
    <p :id="errorTextId" class="fr-error-text" v-else-if="hasError">
      {{ errorText }}
    </p>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import useUid from '../../../composables/useUid';
import Datepicker from "vue3-datepicker";
import RangePicker from '../../RangePicker/RangePicker.vue';
import Required from '../../Ui/Required/Required.vue';
import { getDatepickerLocale } from "../../../i18n";
import { lang } from "../../../config";
import { hasWarning } from '../../../composables/useFunctionalState';

export default defineComponent({
  components: { Datepicker, RangePicker, Required },
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
    hasWarning: {
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
    placeholder: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    validText: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit, expose }) {
    const { id } = useUid("input");

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
        'fr-input-group--warning': !props.hasError && props.hasWarning,
        'fr-input-group--valid': props.isValid
      };
    });

    const isTextarea = computed(() => props.type === "textarea");
    const isDate = computed(() => props.type === "date");
    const isRange = computed(() => props.type === "range");
    const dateLocale = getDatepickerLocale(lang);

    /**
     *
     * @param {Event | string | null} event
     */
    const change = (event) => {
      /** @type {string | undefined | null} */
      let value;
      if(event instanceof Event) {
        const target = /** @type {HTMLSelectElement | HTMLInputElement | null} */ (event.target);
        value = target?.value;
      } else {
        value = event;
      }

      emit('update:modelValue', value);
    }

    expose({ id });

    return {
      ariaDescribedBy,
      change,
      errorTextId,
      id,
      inputGroupClass,
      isDate,
      isRange,
      isTextarea,
      locale: dateLocale,
      validTextId,
    };
  },
});
</script>
