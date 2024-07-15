import { api, type User } from "@etalab/data.gouv.fr-components";
import { AxiosResponse } from "axios";
import { getLocalizedUrl } from "../i18n";

export type ReportReason = string;

export type ReportReasons = Record<string, string>;

export async function getReportReasons() {
  const res = await api.get<ReportReasons>(getLocalizedUrl("reports/reasons/"));
  return res.data;
}

export type ObjectType = 'Dataset' | 'Reuse' | 'Organization';

export type NewReport = {
  object_type: ObjectType;
  object_id: string;
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
    object_type: type,
    object_id: id,
    reason,
    message,
  });
  return res.data;
}