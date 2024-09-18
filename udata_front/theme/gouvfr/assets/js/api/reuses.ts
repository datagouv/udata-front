import type { Reuse } from "@datagouv/components/ts";
import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";
import type { PaginatedArray } from "./types";

export async function getOrganizationReuses(oid: string, page: number, pageSize: number, sort: string) {
  const resp = await api.get<PaginatedArray<Reuse>>(getLocalizedUrl(`reuses/`), {
    params: { organization: oid, sort, page_size: pageSize, page }
  });
  return resp.data;
}
