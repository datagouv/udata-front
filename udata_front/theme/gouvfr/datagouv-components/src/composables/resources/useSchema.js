import { useI18n } from 'vue-i18n';
import { ref, computed } from "vue";
import getCatalog from "../../api/schemas";
import { schema_documentation_url, schema_validata_url } from "../../config";
import { useToast } from "../useToast";

/** @typedef {Map<string, {name: string, count: number}>} ReportMap */

/**
 * @param {import("../../types/resources").Resource} resource
 */
export default function useSchema(resource) {
  const { t } = useI18n();
  const { toast } = useToast();
  const loading = ref(true);

  /** @type {import("vue").Ref<Array<import("../../api/schemas").RegisteredSchema>>} */
  const schemas = ref([]);
  getCatalog()
    .then(catalog => schemas.value = catalog)
    .catch(() => {
      toast.error(
        t("An error occurred while fetching schemas")
      );
    }).finally(() => loading.value = false);

  const schemaName = computed(() => {
    if("name" in resource.schema) {
      return resource.schema.name;
    }
    if("url" in resource.schema) {
      return resource.schema.url;
    }
    return "";
  });

  const schema = computed(() => schemas.value.find(schema => schemaName.value === schema.name));

  const authorizeValidation = computed(() => !!schema.value && schema.value.schema_type === 'tableschema');

  const documentationUrl = computed(() => `${schema_documentation_url}${schemaName.value}/`);

  const validationUrl = computed(() => {
    if(!authorizeValidation || !("name" in resource.schema)) {
      return undefined;
    }
    /** @type {object} */
    let schemaPath = {'schema_name': `schema-datagouvfr.${resource.schema.name}`};
    if("version" in resource.schema) {
      const schemaVersion = resource.schema.version;
      const versionUrl = schema.value?.versions.find(version => version.version_name === schemaVersion)?.schema_url;
      if(versionUrl) {
        schemaPath = {"schema_url": versionUrl};
      }
    }
    const query = new URLSearchParams({
      'input': 'url',
      'url': resource.url,
      ...schemaPath,
    }).toString();
    return `${schema_validata_url}/table-schema?${query}`;
  });

  const schemaReport = computed(() => {
    /** @type {ReportMap} */
    const report = new Map();
    if(!resource.extras || !resource.extras["validation-report:errors"]) {
      return report;
    }

    for (const error of /** @type {Array<import("../../api/schemas").ValidataError>} */ (resource.extras["validation-report:errors"])) {
      let reportedError = report.get(error.code);
      if(!reportedError) {
        reportedError = {
          name: error.name,
          count: 0,
        }
      }
      reportedError.count++;
      report.set(error.code, reportedError);
    }
    return report;
  });

  return {
    authorizeValidation,
    documentationUrl,
    loading,
    validationUrl,
    schemaName,
    schemaReport,
  }
}
