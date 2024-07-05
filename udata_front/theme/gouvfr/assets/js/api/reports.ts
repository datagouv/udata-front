import { api, type User } from "@etalab/data.gouv.fr-components";
import { AxiosResponse } from "axios";

export type ReportReason = string;

export type ReportReasons = Record<string, string>;

export function getReportReasons() {
  return api.get<ReportReasons>("/reports/reasons/")
    .then(res => res.data);
}

export type NewReport = {
  object_type: string;
  object_id: string;
  reason: ReportReason;
  message: string;
};

export type Report = NewReport & {
  id: string;
  reported_at: string;
  by: User | null;
};

export function postReport(type: string, id: string, reason: ReportReason, message: string) {
  return api.post<Report, AxiosResponse<Report>, NewReport>("/reports/", {
    object_type: type,
    object_id: id,
    reason,
    message,
  }).then(res => res.data);
}
