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

<script>
import { defineComponent } from "vue";
import getCatalog from "../../api/schemas";
import MultiSelect from "../MultiSelect/MultiSelect.vue";

export default defineComponent({
  components: {
    MultiSelect,
  },
  emits: ["change"],
  props: {
    allOption: {
      type: String,
      default: "",
    },
    isBlue: {
      type: Boolean,
      default: false,
    },
    showExplanation: {
      type: Boolean,
      default: true,
    },
    values: {
      type: [String, Array],
    },
  },
  setup(props, {emit}) {
    /** @type {Promise<Array<import("../../types").MultiSelectOption>>} */
    const initialOptions = getCatalog().then(catalog => catalog.map(schema => ({
      label: schema.name,
      value: schema.name,
    })));
    const change = (value) => emit("change", value);
    return {
      change,
      initialOptions,
    };
  }
});
</script>
