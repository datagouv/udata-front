import { addIcons } from "oh-vue-icons";
import { RiArticleLine, RiDatabase2Line, RiLineChartLine } from "oh-vue-icons/icons";
import { api } from "@etalab/data.gouv.fr-components";
import type { DiscussionSubject, DiscussionSubjectTypes, Thread } from "../types";
import { getLocalizedUrl } from "../i18n";
import { throwOnNever } from "../helpers";
import { getDataset } from "./datasets";
import { getReuse } from "./reuses";
import { getPost } from "./posts";
import { getDataservice } from "./dataservices";

addIcons(RiArticleLine, RiDatabase2Line, RiLineChartLine);

export async function getOrganizationDiscussions(oid: string) {
  const resp = await api.get<Array<Thread>>(getLocalizedUrl(`organizations/${oid}/discussions/`));
  return resp.data;
}


export async function getSubject(subject: DiscussionSubject) {
  switch (subject.class) {
    case 'Dataset':
      return getDataset(subject.id);
    case 'Post':
      return getPost(subject.id);
    case 'Reuse':
      return getReuse(subject.id);
    default:
      return throwOnNever(subject.class, `Unknown type ${subject.class}`);
  };
}

export function getSubjectTitle(subject: DiscussionSubjectTypes) {
  if('title' in subject) {
    return subject.title;
  }
  if('headline' in subject) {
    return subject.headline;
  }
  return throwOnNever(subject, `Unknown type ${subject}`);
};

export function getSubjectTypeIcon(subject: DiscussionSubject) {
  switch (subject.class) {
    case 'Dataset':
      return "ri-database-2-line";
    case 'Post':
      return "ri-article-line";
    case 'Reuse':
      return "ri-line-chart-line";
    default:
      return throwOnNever(subject.class, `Unknown type ${subject.class}`);
  };
};
