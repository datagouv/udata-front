import { api, type Dataservice } from "@etalab/data.gouv.fr-components";

export async function getDataservice(id: string) {
  const res = await api.get<Dataservice>(`dataservices/${id}/`);
  return res.data;
}
