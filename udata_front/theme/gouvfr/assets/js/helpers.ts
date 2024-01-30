// @ts-ignore
import RemoveMarkdown from "remove-markdown";
import { readonly } from "vue";
import { useI18n } from "vue-i18n";
import type { ResourceType } from "./types";

export const truncate = (val: string, length = 300) => {
  if (typeof val !== "string") return;
  return val.length > length ? val.slice(0, length) + "…" : val; //TODO, maybe® : properly truncate words
};

export const excerpt = (val: string, length = 300) => {
  if (typeof val !== "string") return;
  return truncate(RemoveMarkdown(val), length);
};

export const CLOSED_FORMATS = readonly(['pdf', 'doc', 'docx', 'word', 'xls', 'excel', 'xlsx'] as const);

export const RESOURCE_TYPE = readonly(["main", "documentation", "update", "api", "code", "other"] as const);

export const getResourceLabel = (type: ResourceType) => {
  const { t } = useI18n();
  switch(type) {
    case "main":
      return t("Main file");
    case "documentation":
      return t("Documentation");
    case "update":
      return t("Update");
    case "api":
      return t("API");
    case "code":
      return t("Source code");
    case "other":
      return t("Other");
  }
}


const includeInSubtype = <T, U extends T>(array: ReadonlyArray<U>, value: T): value is U => {
  return array.includes(value as U);
};

export const isClosedFormat = (format: string) => includeInSubtype(CLOSED_FORMATS, format);
export const UUIDRegExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export const resourceUrlRegExp = new RegExp(
  "resources\/(" +
  UUIDRegExp.source +
  ")?$", UUIDRegExp.flags);

export const previousResourceUrlRegExp = new RegExp(
  "resource-(" +
  UUIDRegExp.source +
  ")?$", UUIDRegExp.flags);
