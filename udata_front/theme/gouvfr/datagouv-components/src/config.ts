import { reactive, readonly, ref } from "vue";

const admin_root = ref(import.meta.env.VITE_ADMIN_ROOT);

const show_copy_resource_permalink = ref(import.meta.env.VITE_SHOW_COPY_RESOURCE_PERMALINK === "true");

const schema_documentation_url = ref(import.meta.env.VITE_SCHEMA_DOCUMENTATION_URL);

const schema_catalog_url = ref(import.meta.env.VITE_SCHEMA_CATALOG_URL);

const schema_validata_url = ref(import.meta.env.VITE_SCHEMA_VALIDATA_URL);

const title = ref(import.meta.env.VITE_TITLE);

const explorable_resources = ref<Array<string>>([]);

const only_locales = ref(import.meta.env.VITE_ONLY_LOCALES);

const default_lang = ref(import.meta.env.VITE_DEFAULT_LANG);

const localConfig = reactive({
    admin_root,
    default_lang,
    explorable_resources,
    only_locales,
    schema_catalog_url,
    schema_documentation_url,
    schema_validata_url,
    show_copy_resource_permalink,
    title,
});

const config = readonly(localConfig);

const setupComponents = (config: Partial<typeof localConfig>) => {
    const mergedConfig = {...localConfig, ...config};
    admin_root.value = mergedConfig.admin_root;
    default_lang.value = mergedConfig.default_lang;
    explorable_resources.value = mergedConfig.explorable_resources;
    only_locales.value = mergedConfig.only_locales;
    schema_catalog_url.value = mergedConfig.schema_catalog_url;
    schema_documentation_url.value = mergedConfig.schema_documentation_url;
    schema_validata_url.value = mergedConfig.schema_validata_url;
    show_copy_resource_permalink.value = mergedConfig.show_copy_resource_permalink;
    title.value = mergedConfig.title;
};

export { config, setupComponents };
