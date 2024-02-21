import { useI18n } from 'vue-i18n';
import { ref, computed } from "vue";
import { getCatalog } from "../../api/schemas";
import { config } from "../../config";
import { useToast } from "../useToast";
import type { Resource } from "../../types/resources";

type ReportMap = Map<string, { name: string; count: number; }>;

type SchemaPath = {'schema_name': string } | {"schema_url": string};

export default function useSchema(resource: Resource) {
  const { t } = useI18n();
  const { toast } = useToast();
  const loading = ref(true);

  const schemas = ref<Array<import("../../api/schemas").RegisteredSchema>>([]);
  getCatalog()
    .then(catalog => schemas.value = catalog)
    .catch(() => {
      toast.error(
        t("An error occurred while fetching schemas"),
      );
    }).finally(() => loading.value = false);

  const schemaName = computed(() => {
    if(resource.schema && resource.schema.name) {
      return resource.schema.name;
    }
    if(resource.schema && resource.schema.url) {
      return resource.schema.url;
    }
    return "";
  });

  const schema = computed(() => schemas.value.find(schema => schemaName.value === schema.name));

  const authorizeValidation = computed(() => !!schema.value && schema.value.schema_type === 'tableschema');

  const documentationUrl = computed(() => `${config.schema_documentation_url}${schemaName.value}/`);

  const validationUrl = computed(() => {
    if(!authorizeValidation || !(resource.schema && resource.schema.name)) {
      return undefined;
    }
    let schemaPath: SchemaPath = {'schema_name': `schema-datagouvfr.${resource.schema.name}`};
    if(resource.schema && resource.schema.version) {
      const schemaVersion = resource.schema.version;
      const versionUrl = schema.value?.versions.find(version => version.version_name === schemaVersion)?.schema_url;
      if(versionUrl) {
        schemaPath = {"schema_url": versionUrl};
      }
    }
    const query = new URLSearchParams({
      'input': 'url',
      'url': resource.url,
      'header-case': 'on',
      ...schemaPath,
    }).toString();
    return `${config.schema_validata_url}/table-schema?${query}`;
  });

  const schemaReport = computed(() => {
    const report: ReportMap = new Map();
    if(!resource.extras || !resource.extras["validation-report:errors"]) {
      return report;
    }

    for (const error of (resource.extras["validation-report:errors"] as Array<import("../../api/schemas").ValidataError>)) {
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
