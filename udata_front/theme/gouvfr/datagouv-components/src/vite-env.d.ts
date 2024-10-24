/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_ROOT: string;
  readonly VITE_SHOW_COPY_RESOURCE_PERMALINK: string;
  readonly VITE_SCHEMA_DOCUMENTATION_URL: string;
  readonly VITE_SCHEMA_VALIDATA_URL: string;
  readonly VITE_TITLE: string;
  readonly VITE_ONLY_LOCALES: string;
  readonly VITE_DEFAULT_LANG: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_2_URL: string;
  readonly VITE_SITE_ROOT_URL: string;
  readonly VITE_STATIC_ROOT_URL: string;
  readonly VITE_GUIDES_QUALITY_URL: string;
  readonly VITE_TABULAR_API_URL: string;
  readonly VITE_TABULAR_PAGE_SIZE: string;
  readonly VITE_TABULAR_ALLOW_REMOTE: boolean;
  readonly VITE_TABULAR_API_DATASERVICE_ID: string | null;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
