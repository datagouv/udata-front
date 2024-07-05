import { api } from "@etalab/data.gouv.fr-components";

export type ReportReason = string;

export default function getReportReasons() {
  return api.get("/reports/reasons/")
    .then(res => res.data);
}
