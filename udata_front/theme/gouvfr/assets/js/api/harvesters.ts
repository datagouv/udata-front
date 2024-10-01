import { api } from "@datagouv/components/ts";
import { getLocalizedUrl } from "../i18n";

export async function getOrganizationHarvesters(oid: string, page: number, pageSize: number) {
  const resp = await api.get(getLocalizedUrl('harvest/sources/'), {
    params: { owner: oid, deleted: true, page, page_size: pageSize }
  });
  return resp.data;
}
