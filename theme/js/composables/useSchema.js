import {useI18n} from 'vue-i18n'
import {ref, computed} from "vue";
import getCatalog from "../api/schemas";
import config from "../config";
import {useToast} from "./useToast";

/**
 *
 * @param {import("../api/resources").ResourceModel} resource
 * @returns {{documentationUrl: import("vue").ComputedRef<string>, authorizeValidation: import("vue").ComputedRef<boolean>, validationUrl: import("vue").ComputedRef<?string>, loading: import("vue").Ref<boolean>}}
 */
export default function useSchema(resource) {
  const { t } = useI18n();
  const toast = useToast();
  /** @type {import("vue").Ref<boolean>} */
  const loading = ref(true);
  /** @type {import("vue").Ref<Array<import("../api/schemas").Schema>>} */
  const schemas = ref([]);
  getCatalog()
    .then(catalog => schemas.value = catalog)
    .catch(() => {
      toast.error(
        t("An error occurred while fetching schemas")
      );
    }).finally(() => loading.value = false);

  /** @type {import("vue").ComputedRef<import("../api/schemas").Schema | undefined>} */
  const schema = computed(() => schemas.value.find(schema => schema.name === resource.schema.name));

  const authorizeValidation = computed(() => !!schema.value && schema.value.schema_type === 'tableschema');

  const documentationUrl = computed(() => `${config.schema_documentation_url}${resource.schema.name}/`);

  const validationUrl = computed(() => {
    if(!authorizeValidation) {
      return null;
    }
    /** @type {object} */
    let schemaPath = {'schema_name': `schema-datagouvfr.${resource.schema.name}`};
    if(resource.schema.version) {
      const versionUrl = schema.value?.versions.find(version => version.version_name === resource.schema.version)?.schema_url;
      schemaPath = {"schema_url": versionUrl};
    }
    const query = new URLSearchParams({
      'input': 'url',
      'url': resource.url,
      ...schemaPath,
    }).toString();
    return `${config.schema_validata_url}/table-schema?${query}`;
  });

  return {
    authorizeValidation,
    documentationUrl,
    loading,
    validationUrl,
  }
}
