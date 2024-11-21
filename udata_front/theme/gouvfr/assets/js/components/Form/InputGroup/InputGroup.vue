<template>
  <div class="fr-input-group" :class="inputGroupClass">
    <label class="fr-label" :for="id">
      {{ label }}
      <Required :required="required" />
      <span class="fr-hint-text" v-if="hintText">{{ hintText }}</span>
    </label>
    <textarea
      v-if="type === 'textarea'"
      class="fr-input"
      :class="{ 'fr-input--error': hasError, 'fr-input--warning': !hasError && hasWarning, 'fr-input--valid': isValid }"
      :aria-describedby="ariaDescribedBy"
      :id="id"
      :disabled="disabled"
      :type="type"
      :value="(modelValue as string | undefined)"
      :placeholder="placeholder"
      @change="change"
      :required="required"
    ></textarea>
    <div v-else-if="type === 'date'" class="fr-mt-1w">
      <Datepicker
        class="fr-input"
        :class="{ 'fr-input--error': hasError, 'fr-input--valid': isValid }"
        :aria-describedby="ariaDescribedBy"
        :id="id"
        :disabled="disabled"
        :modelValue="(modelValue as Date | undefined)"
        @change="change"
        :locale="dateLocale"
        inputFormat="P"
      />
    </div>
    <RangePicker
      v-else-if="type === 'range'"
      :modelValue="modelValue"
      @change="change"
    />
    <MarkdownEditor
      v-else-if="type === 'markdown'"
      class="fr-mt-1w"
      :class="{ 'fr-input--error': hasError, 'fr-input--warning': !hasError && hasWarning, 'fr-input--valid': isValid }"
      :aria-describedby="ariaDescribedBy"
      :id="id"
      :disabled="disabled"
      :value="(modelValue as string | undefined)"
      :placeholder="placeholder"
      @change="change"
      :required="required"
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

<script lang="ts">
import type { InputTypeHTMLAttribute } from "vue";

export type InputValue = string | undefined | null;

export type AllowedInputType = "date" | "markdown" | "range" | "textarea" | InputTypeHTMLAttribute;

export type InputGroupProps = {
  ariaDescribedby?: string,
  disabled?: boolean,
  errorText?: string,
  hasError?: boolean,
  hasWarning?: boolean,
  hintText?: string,
  isValid?: boolean,
  label: string,
  modelValue?: string | Date,
  placeholder?: string,
  required?: boolean,
  type?: AllowedInputType,
  validText?: string,
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import useUid from '../../../composables/useUid';
import Datepicker from "vue3-datepicker";
import RangePicker from '../../RangePicker/RangePicker.vue';
import Required from '../../Ui/Required/Required.vue';
import { getDatepickerLocale } from "../../../i18n";
import { lang } from "../../../config";
import { hasWarning } from '../../../composables/form/useFunctionalState';
import MarkdownEditor from '../../MarkdownEditor/MarkdownEditor.vue';

const emit = defineEmits<{
  (event: 'change', value: InputValue): void
  (event: 'update:modelValue', value: InputValue): void
}>();

const props = withDefaults(defineProps<InputGroupProps>(), {
  ariaDescribedby: "",
  disabled: false,
  errorText: "",
  hasError: false,
  hasWarning: false,
  hintText: "",
  isValid: false,
  modelValue: undefined,
  placeholder: "",
  required: false,
  type: "text",
  validText: "",
});

const { id } = useUid("input");
defineExpose({ id });

const errorTextId = computed(() => id + "-desc-error");
const validTextId = computed(() => id + "-desc-valid");
const ariaDescribedBy = computed(() => {
  let describedBy = props.ariaDescribedby ? props.ariaDescribedby + " " : "";
  if (props.isValid) {
    describedBy += validTextId.value;
  }
  else if (props.hasError) {
    describedBy += errorTextId.value;
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

const dateLocale = getDatepickerLocale(lang);

function change(event: Event | string | null) {
  let value: InputValue;
  if(event instanceof Event) {
    const target = event.target as HTMLSelectElement | HTMLInputElement | null;
    value = target?.value;
  } else {
    value = event;
  }

  emit('update:modelValue', value);
  emit('change', value);
}
</script>
