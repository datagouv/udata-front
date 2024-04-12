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
    <p :id="errorTextId" class="fr-error-text" v-else-if="hasError">
      {{ errorText }}
    </p>
  </div>
</template>
<script lang="ts">
export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
};

export type SelectGroupProps = {
  disabled?: boolean,
  errorText?: string,
  hasError?: boolean,
  hintText?: string,
  isValid?: boolean,
  label: string,
  modelValue?: string,
  options: Array<Option>,
  required?: boolean,
  validText?: string,
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import useUid from '../../../composables/useUid';
import Required from '../../Ui/Required/Required.vue';

const emit = defineEmits<{
  (event: 'update:modelValue', id: string): void
}>();

const props = withDefaults(defineProps<SelectGroupProps>(), {
  disabled: false,
  errorText: "",
  hasError: false,
  hintText: "",
  isValid: false,
  modelValue: undefined,
  required: false,
  validText: "",
});

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

const change = (event: Event) => {
  const target = event.target as HTMLSelectElement | null;
  emit('update:modelValue', target?.value ?? "");
}
</script>
