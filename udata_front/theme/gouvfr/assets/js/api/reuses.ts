import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";
import type { GetPaginatedData, Reuse } from "../types";

export async function getOrganizationReuses(oid: string, page: number, pageSize: number, sort: string) {
  const resp = await api.get<GetPaginatedData<Reuse>>(getLocalizedUrl(`organizations/${oid}/reuses/`), {
    params: { sort, page_size: pageSize, page }
  });
  return resp.data;
}
