<template>
  <button class="fr-btn fr-btn--secondary fr-btn--sm" :disabled="loading" @click.prevent="showSchemaModal">
    <span class="fr-mr-1v" v-html="triangle" />
    <template v-if="name">{{ name }}</template>
    <template v-else>{{ $t('See schema') }}</template>
  </button>
</template>

<script>
import {inject} from 'vue';
import useSchema from "../../../composables/useSchema";
import triangle from "svg/triangle.svg";

export default {
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { authorizeValidation, documentationUrl, loading, name, validationUrl} = useSchema(props.resource)
    const showModal = inject('$showModal');
    const showSchemaModal = () => showModal('schema', {
      resourceSchema: props.resource.schema,
      documentationUrl: documentationUrl.value,
      validationUrl: validationUrl.value,
      authorizeValidation: authorizeValidation.value
    });
    return {
      loading,
      name,
      authorizeValidation,
      documentationUrl,
      validationUrl,
      showSchemaModal,
      triangle,
    }
  },
}
</script>
