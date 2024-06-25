import { reactive, readonly, ref } from "vue";

const admin_root = ref<string>(import.meta.env.VITE_ADMIN_ROOT);

const api_root = ref<string>(import.meta.env.VITE_API_URL);

const api_2_root = ref<string>(import.meta.env.VITE_API_2_URL);

const show_copy_resource_permalink = ref<boolean>(import.meta.env.VITE_SHOW_COPY_RESOURCE_PERMALINK === "true");

const schema_documentation_url = ref<string>(import.meta.env.VITE_SCHEMA_DOCUMENTATION_URL);

const schema_validata_url = ref<string>(import.meta.env.VITE_SCHEMA_VALIDATA_URL);

const site_root = ref<string>(import.meta.env.VITE_SITE_ROOT_URL);

const static_root = ref<string>(import.meta.env.VITE_STATIC_ROOT_URL);

const title = ref<string>(import.meta.env.VITE_TITLE);

const only_locales = ref<string>(import.meta.env.VITE_ONLY_LOCALES);

const default_lang = ref<string>(import.meta.env.VITE_DEFAULT_LANG);

const guides_quality_url = ref<string>(import.meta.env.VITE_GUIDES_QUALITY_URL);

const tabular_api_url = ref<string>(import.meta.env.VITE_TABULAR_API_URL);

const tabular_page_size = ref<number>(parseInt(import.meta.env.VITE_TABULAR_PAGE_SIZE));

const tabular_allow_remote = ref<boolean>(import.meta.env.VITE_TABULAR_ALLOW_REMOTE);

const localConfig = reactive({
  admin_root,
  api_root,
  api_2_root,
  default_lang,
  guides_quality_url,
  only_locales,
  schema_documentation_url,
  schema_validata_url,
  site_root,
  static_root,
  show_copy_resource_permalink,
  tabular_allow_remote,
  tabular_api_url,
  tabular_page_size,
  title,
});

const config = readonly(localConfig);

const setupComponents = (config: Partial<typeof localConfig>) => {
  const mergedConfig = {...localConfig, ...config};
  admin_root.value = mergedConfig.admin_root;
  api_root.value = mergedConfig.api_root;
  api_2_root.value = mergedConfig.api_2_root;
  default_lang.value = mergedConfig.default_lang;
  guides_quality_url.value = mergedConfig.guides_quality_url;
  only_locales.value = mergedConfig.only_locales;
  schema_documentation_url.value = mergedConfig.schema_documentation_url;
  schema_validata_url.value = mergedConfig.schema_validata_url;
  show_copy_resource_permalink.value = mergedConfig.show_copy_resource_permalink;
  site_root.value = mergedConfig.site_root;
  static_root.value = mergedConfig.static_root;
  tabular_allow_remote.value = mergedConfig.tabular_allow_remote;
  tabular_page_size.value = mergedConfig.tabular_page_size;
  tabular_api_url.value = mergedConfig.tabular_api_url;
  title.value = mergedConfig.title;
};

export { config, setupComponents };
