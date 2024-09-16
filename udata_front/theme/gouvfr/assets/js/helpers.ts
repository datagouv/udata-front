import RemoveMarkdown from "remove-markdown";
import { readonly } from "vue";

export const truncate = (val: string, length = 300) => {
  if (typeof val !== "string") return;
  return val.length > length ? val.slice(0, length) + "…" : val; //TODO, maybe® : properly truncate words
};

export const excerpt = (val: string, length = 300) => {
  if (typeof val !== "string") return;
  return truncate(RemoveMarkdown(val), length);
};

export const CLOSED_FORMATS = readonly(['pdf', 'doc', 'docx', 'word', 'xls', 'excel', 'xlsx'] as const);

const includeInSubtype = <T, U extends T>(array: ReadonlyArray<U>, value: T): value is U => {
  return array.includes(value as U);
};

export const isClosedFormat = (format: string) => includeInSubtype(CLOSED_FORMATS, format);
export const UUIDRegExp = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export const resourceUrlRegExp = new RegExp(
  "\/resources\/(" +
  UUIDRegExp.source +
  ")?$", UUIDRegExp.flags);

export const previousResourceUrlRegExp = new RegExp(
  "\/resource-(" +
  UUIDRegExp.source +
  ")?$", UUIDRegExp.flags);

export const communityResourceUrlRegExp = new RegExp(
  "\/community-resources\/(" +
  UUIDRegExp.source +
  ")?$", UUIDRegExp.flags);


export const getResourceIdFromHash = (hash: string, isCommunityResource: boolean): string | null => {
  for (const regex of isCommunityResource ? [communityResourceUrlRegExp] : [resourceUrlRegExp, previousResourceUrlRegExp]) {
    let [_a, foundId, _b] = regex.exec(hash) || [];
    if(foundId) {
      return foundId;
    }
  }

  return null;
}
