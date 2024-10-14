import { api, type Dataservice, type NewDataservice } from "@datagouv/components/ts";
import { toValue } from "vue";

export function createDataservice(dataservice: NewDataservice) {
  return api.post<Dataservice>("dataservices/", {
    ...toValue(dataservice),
  }).then(resp => resp.data);
}

export function updateDataservice(dataservice: Dataservice) {
  return api.patch<Dataservice>(`dataservices/${dataservice.id}/`, {
    ...toValue(dataservice),
  }).then(resp => resp.data);
}

export async function getDataservice(id: string) {
  const res = await api.get<Dataservice>(`dataservices/${id}/`);
  return res.data;
}
