<template>
  <MultiSelect
    :placeholder="$t('Schema')"
    :explanation="showExplanation ? $t('Data schemas describe data models: what are the fields, how are data shown, what are the available values, etc. See schema.data.gouv.fr') : ''"
    :searchPlaceholder="$t('Search a schema...')"
    :allOption="allOption ? allOption : $t('All schemas')"
    :initialOptions="initialOptions"
    :values="values"
    @change="change"
    :isBlue="isBlue"
  />
</template>
<script lang="ts">
export type SchemaSelectProps = {
    allOption?: string,
    isBlue?: boolean,
    showExplanation?: boolean,
    values: Array<string> | string,
};
</script>
<script setup lang="ts">
import { getCatalog } from "@datagouv/components/ts";
import MultiSelect from "../MultiSelect/MultiSelect.vue";

withDefaults(defineProps<SchemaSelectProps>(), {
  allOption: "",
  isBlue: false,
  showExplanation: true,
});

const emit = defineEmits<{
  change: [value: string]
}>();

/** @type {Promise<Array<import("../../types").MultiSelectOption>>} */
const initialOptions = getCatalog().then(catalog => catalog.map(schema => ({
    label: schema.name,
    value: schema.name,
  })));
const change = (value: string) => emit("change", value);
</script>
