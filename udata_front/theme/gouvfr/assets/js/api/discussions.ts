import { addIcons } from "oh-vue-icons";
import { RiArticleLine, RiDatabase2Line, RiLineChartLine, RiTerminalLine } from "oh-vue-icons/icons";
import { api } from "@datagouv/components/ts";
import type { DiscussionSubject, DiscussionSubjectTypes, Thread } from "../types";
import { getLocalizedUrl } from "../i18n";
import { throwOnNever } from "../helpers";
import { getDataset } from "./datasets";
import { getReuse } from "./reuses";
import { getPost } from "./posts";
import { getDataservice } from "./dataservices";
import { PaginatedArray } from "./types";

addIcons(RiArticleLine, RiDatabase2Line, RiLineChartLine, RiTerminalLine);

export type SubjectSummary = {
  title: string;
  icon: string;
  page: string;
};

export async function getOrganizationDiscussions(oid: string, page: number, pageSize: number, sortDirection: string) {
  const resp = await api.get<PaginatedArray<Thread>>(getLocalizedUrl("discussions/"), {
    params: {
      org: oid,
      sort: sortDirection,
      page_size: pageSize,
      page,
    }
  });
  return resp.data;
}

export async function getSubject(subject: DiscussionSubject): Promise<DiscussionSubjectTypes | null> {
  switch (subject.class) {
    case 'Dataservice':
      return getDataservice(subject.id);
    case 'Dataset':
      return getDataset(subject.id);
    case 'Post':
      return getPost(subject.id);
    case 'Reuse':
      return getReuse(subject.id);
    default:
      return null;
  };
}

export function formatSubject(subject: DiscussionSubjectTypes | null, subjectClass: DiscussionSubject["class"]): SubjectSummary | null {
  if(subject === null) {
    return null;
  }
  return {
    title: getSubjectTitle(subject),
    icon: getSubjectTypeIcon(subjectClass),
    page: getSubjectPage(subject),
  };
}

export function getSubjectTitle(subject: DiscussionSubjectTypes) {
  if(subject === null) {
    return "";
  }
  if('title' in subject) {
    return subject.title;
  }
  if('headline' in subject) {
    return subject.headline;
  }
  return throwOnNever(subject, `Unknown type ${subject}`);
};

export function getSubjectPage(subject: DiscussionSubjectTypes) {
  if(subject === null) {
    return "";
  }
  if('page' in subject) {
    return subject.page;
  }
  if('self_web_url' in subject) {
    return subject.self_web_url;
  }
  return throwOnNever(subject, `Unknown type ${subject}`);
};

export function getSubjectTypeIcon(subjectClass: DiscussionSubject["class"]) {
  switch (subjectClass) {
    case 'Dataservice':
      return "ri-terminal-line";
    case 'Dataset':
      return "ri-database-2-line";
    case 'Post':
      return "ri-article-line";
    case 'Reuse':
      return "ri-line-chart-line";
    default:
      return "";
  };
};
