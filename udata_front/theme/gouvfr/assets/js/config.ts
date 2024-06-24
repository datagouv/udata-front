/*
 * Parse the page html headers to extract some information
 * **This has been taken "as-is" from the old udata project**
 * Lots of variables here are probably useless for the front-end
 */

import type { User } from "@etalab/data.gouv.fr-components";
import type { Primitive } from "@sentry/types";

/**
 * Simple helper to fetch attribute on given css selector
 */
function _attr(selector: string, name: string) {
  const el = document.querySelector(selector);
  return el?.getAttribute(name) ?? undefined;
}

/**
 * Simple helper to <meta/> tag content given its name
 */
function _meta(name: string) {
  return _attr(`meta[name=${name}]`, "content");
}

/**
 * A simple helper to parse JSON from a <meta/> tag
 * @return meta content as json or false on error
 */
function _jsonMeta(name: string) {
  const data = _meta(name);
  return data ? JSON.parse(decodeURIComponent(data)) : false;
}

const userEl = document.querySelector<HTMLElement>("meta[name=current-user]");

/**
 * The current user extracted from the header
 */
export const user: User | null = userEl ? {
  id: userEl.getAttribute("content") || "",
  slug: userEl.dataset.slug,
  page: "/users/" + userEl.dataset.slug,
  first_name: userEl.dataset.first_name || "",
  last_name: userEl.dataset.last_name || "",
  avatar: userEl.dataset.avatar,
  avatar_thumbnail: userEl.dataset.avatar_thumbnail,
  roles: userEl.dataset.roles?.split(",") || [],
} : null;

export const userIsAdmin: boolean = user?.roles?.includes("admin") ?? false;

/**
 * Map debug features on Webpack DEBUG flag
 */
export const debug = import.meta.env.DEV;

export const defaultLang = "en";

/**
 * The current language is guessed from the html lang attribute
 */
export const lang = _attr("html", "lang") || defaultLang;

/**
 * Reuse server side site title
 */
export const title = _meta("site-title");

/**
 * Store the CSRF token for legacy forms and AJAX requests
 */
export const csrf_token = _meta("csrf-token");

/**
 * Is the check url feature enabled ?
 */
export const check_urls = _jsonMeta("check-urls");

/**
 * Is the check url feature disabled for some resource types ?
 */
export const unchecked_types = _jsonMeta("unchecked-types");

/**
 * The API root/base URLs
 */
export const api_root = _meta("api-root");
export const api_2_root = _meta("api-2-root");

/**
 * The API Swagger specifications URL
 */
export const api_specs = _meta("api-specs");

/**
 * The theme static root URL
 */
export const theme_static = _meta("theme-static-root");

/**
 * The base static root URL
 */
export const static_root = _meta("static-root");

/**
 * The administration root URL
 */
export const admin_root = _meta("admin-root");

/**
 * The authentification URL for logins
 */
export const auth_url = _meta("auth-url");

/**
 * The schema documentation URL
 */
export const schema_documentation_url = _meta("schema-documentation-url");

/**
 * The schema validata URL
 */
export const schema_validata_url = _meta("schema-validata-url");

/**
 * The schema publishing url
 */
export const schema_publishing_url = _meta("schema-publishing-url");

/**
 * The demo server URL
 */
export const demo_server_url = _meta("demo-server-url");

/**
 * The demo server name
 */
export const demo_server_name = _meta("demo-server-name");

/**
 * The publishing form feedback URL
 */
export const publishing_form_feedback_url = _meta("publishing-form-feedback-url");

/**
 * The API documentation external link
 */

export const api_doc_external_link = _meta("api-doc-external-link");

/**
 * The harvesting guide url
 */

export const guides_harvesting_url = _meta("guides-harvesting-url");

/**
 * The harvesting guide url
 */

export const support_url = _meta("support-url");

/**
 * The catalog service URL
 */
export const catalog_url = _meta("catalog-url");

/**
 * The description length required to pass the quality score check
 */
export const quality_description_length = parseInt(_meta("quality-description-length") ?? "0");

/**
 * The data search form URL
 */
export const data_search_feedback_form_url = _meta("data-search-feedback-form-url");

/**
 * The guide on how to improve quality metadata URL
 */
export const guides_quality_url = _meta("guides-quality-url");

/**
 * The dataset list URL
 */
export const dataset_url = _meta("dataset-url");

/**
 * The organization list URL
 */
export const organization_url = _meta("organization-url");

/**
 * The reuse list URL
 */
export const reuse_url = _meta("reuse-url");

/**
 * Sentry configuration (as json) if available
 */
const sentryEl = document.querySelector("meta[name=sentry]");

type SentryConfiguration = {
  dsn: string | undefined;
  release: string | undefined;
  tags: Record<string, Primitive>
}

export const sentry: SentryConfiguration = {
  dsn: undefined,
  release: undefined,
  tags: {},
};

if (sentryEl instanceof HTMLElement) {
  sentry.dsn = sentryEl.getAttribute("content") || undefined;
  sentry.release = sentryEl.dataset.release || undefined;
  sentry.tags = JSON.parse(decodeURIComponent(sentryEl.dataset.tags || "{}"));
}

/**
 * Whether territories are enabled or not.
 */
export const is_territory_enabled = _jsonMeta("territory-enabled");

/**
 * Whether the 'delete me' feature is enabled or not.
 */
export const is_delete_me_enabled = _jsonMeta("delete-me-enabled");

/**
 * Detect HiDPI screens
 */
export const hidpi =
  window.devicePixelRatio > 1 ||
  (window.matchMedia &&
    window.matchMedia(
      "(-webkit-min-device-pixel-ratio: 1.25),(min-resolution: 120dpi)"
    ).matches);

/**
 * Tags constraints
 */
export const tags = _jsonMeta("tags-config");

/**
 * Default page size for resources in dataset view
 */
export const resources_default_page_size = _jsonMeta(
  "resources-default-page-size"
);

/**
 * Minimum number of resources to show a search bar in dataset view
 */
export const resources_min_count_to_show_search = _jsonMeta("resources-min-count-to-show-search");

/**
 * Markdown configuration.
 */
export const markdown = _jsonMeta("markdown-config");

/**
 * License groups options configuration.
 */
export const license_groups_options: Array<[string, Array<Record<string, string>>]> = _jsonMeta("license-groups-options");


/**
 * Whether the 'read only mode' feature is enabled or not.
 */
 export const read_only_enabled = _jsonMeta('read-only-enabled');

 /**
 * Whether the 'autocomplete' feature is enabled or not.
 */
export const search_autocomplete_enabled = _jsonMeta("search-autocomplete-enabled");

 /**
 * Debounce value for autocomplete.
 */
export const search_autocomplete_debounce = _jsonMeta("search-autocomplete-debounce");

export const explorable_resources: Array<string> = _jsonMeta("explorable-resources") || [];

export const search_siren_url = _meta("search-siren-url");

export const quality_metadata_backend_ignore: Array<string> = _jsonMeta("quality-metadata-backend-ignore") || [];

export default {
  user,
  userIsAdmin,
  debug,
  lang,
  title,
  catalog_url,
  csrf_token,
  demo_server_url,
  demo_server_name,
  api_doc_external_link,
  guides_harvesting_url,
  support_url,
  data_search_feedback_form_url,
  api_root,
  api_2_root,
  api_specs,
  theme_static,
  static_root,
  admin_root,
  auth_url,
  publishing_form_feedback_url,
  schema_documentation_url,
  schema_publishing_url,
  schema_validata_url,
  guides_quality_url,
  sentry,
  check_urls,
  unchecked_types,
  is_territory_enabled,
  is_delete_me_enabled,
  hidpi,
  tags,
  resources_default_page_size,
  resources_min_count_to_show_search,
  markdown,
  license_groups_options,
  read_only_enabled,
  quality_description_length,
  search_siren_url,
  quality_metadata_backend_ignore,
};
