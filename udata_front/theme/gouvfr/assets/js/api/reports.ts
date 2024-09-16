import { api, type User } from "@datagouv/components/ts";
import { AxiosResponse } from "axios";
import { getLocalizedUrl } from "../i18n";

export type ReportReason = string;

export type ReportReasons = Array<{label: string, value: string}>;

export async function getReportReasons() {
  const res = await api.get<ReportReasons>(getLocalizedUrl("reports/reasons/"));
  return res.data;
}

export type ObjectType = 'Dataset' | 'Reuse' | 'Organization';

export type NewReport = {
  subject: {
    class: ObjectType;
    id: string;
  },
  reason: ReportReason;
  message: string;
};

export type Report = NewReport & {
  id: string;
  reported_at: string;
  by: User | null;
};

export async function postReport(type: ObjectType, id: string, reason: ReportReason, message: string) {
  const res = await api.post<Report, AxiosResponse<Report>, NewReport>("/reports/", {
    subject: {
      id,
      class: type,
    },
    reason,
    message,
  });
  return res.data;
}
