<template>
  <InputGroup
    :label="$t('File title')"
    :required="true"
    v-model="file.title"
    :hasError="stateHasError('title')"
    :errorText="getErrorText('title')"
  />

  <SelectGroup
    :label="$t('Type')"
    :required="true"
    v-model="file.type"
    :hasError="stateHasError('type')"
    :errorText="getErrorText('type')"
    :options="fileTypes"
  />

  <InputGroup
    :label="$t('Description')"
    :required="true"
    v-model="file.description"
    :hasError="stateHasError('description')"
    :errorText="getErrorText('description')"
    type="textarea"
  />

  <SchemaSelect
    :showAllOption="false"
    :values="file.schema"
    @change="(value) => file.schema = value"
  />
</template>
<script>
import { computed, defineComponent, reactive } from 'vue';
import useFunctionalState from '../../../composables/useFunctionalState';
import InputGroup from '../InputGroup/InputGroup.vue';
import SelectGroup from '../SelectGroup/SelectGroup.vue';
import SchemaSelect from "../../SchemaSelect/SchemaSelect.vue";
import { getResourceLabel, RESOURCE_TYPE } from '../../../helpers';
import { required } from '../../../i18n';

export default defineComponent({
  components: { InputGroup, SelectGroup, SchemaSelect },
  props: {
    datasetFile: {
      /** @type {import("vue").PropType<import("../../../types").DatasetFile>} */
      type: Object,
      required: true,
    }
  },
  setup(props) {
    /** @type {import("vue").UnwrapNestedRefs<import("../../../types").DatasetFile>} */
    const file = reactive({...props.datasetFile});

    const requiredRules = {
      title: { required },
      type: { required },
      description: { required },
    };

    const { getErrorText, getFunctionalState, hasError, v$ } = useFunctionalState(file, requiredRules, requiredRules);
    /**
     * @type {import("vue").ComputedRef<Record<string, import("../../../types").AccordionFunctionalState>>}
     */
     const state = computed(() => {
      return {
        title: getFunctionalState(v$.value.title.$dirty, v$.value.title.$error, false),
        type: getFunctionalState(v$.value.type.$dirty, v$.value.type.$error, false),
        description: getFunctionalState(v$.value.description.$dirty, v$.value.description.$error, false),
      };
    });

    /** @type {Array<{label: string, value: import("../../../types").ResourceType}>} */
    const fileTypes = RESOURCE_TYPE.map(type => ({label: getResourceLabel(type), value: type}));

    /**
     *
     * @param {string} field
     */
     const stateHasError = (field) => hasError(state, field);

    return  {
      file,
      fileTypes,
      getErrorText,
      stateHasError,
    }
  }
});
</script>
