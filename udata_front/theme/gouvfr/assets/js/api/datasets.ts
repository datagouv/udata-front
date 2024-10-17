import { api, apiv2 } from "@datagouv/components/ts";
import type { Dataset, NewDataset } from "@datagouv/components/ts";
import { toValue, type MaybeRefOrGetter } from "vue";
import { getLocalizedUrl } from "../i18n";
import type { SpatialGranularity } from "../types";
import type { PaginatedArray } from "./types";

function formatDatasetForUpload(datasetRef: MaybeRefOrGetter<NewDataset>) {
  type DatasetToUpload = Omit<NewDataset, "archived">;
  const dataset: DatasetToUpload = { ...toValue(datasetRef) };
  if("archived" in dataset) {
    delete dataset.archived;
  }
  return {
    ...dataset,
    private: true,
    spatial: dataset.spatial ? {
      zones: dataset.spatial.zones?.length ? dataset.spatial.zones : undefined,
      granularity: dataset.spatial.granularity ? dataset.spatial.granularity : undefined,
    } : undefined,
  } as DatasetToUpload;
}

export function createDataset(dataset: MaybeRefOrGetter<NewDataset>) {
  const datasetToUpload = formatDatasetForUpload(dataset);
  return api.post<Dataset>("datasets/", {
    ...datasetToUpload,
  }).then(resp => resp.data);
}

export function publishDataset(dataset: Dataset) {
  const datasetToUpload = toValue(dataset);
  datasetToUpload.private = false;
  return api.put<Dataset>("datasets/" + datasetToUpload.id, {
    ...datasetToUpload,
  }).then(resp => resp.data);
}

export function getFrequenciesUrl () {
  return getLocalizedUrl("datasets/frequencies/");
}

export async function getSpatialGranularities () {
  const resp = await api.get<Array<SpatialGranularity>>(getLocalizedUrl("spatial/granularities/"));
  return resp.data;
}

export async function getOrganizationDatasets(oid: string, q: string, page: number, pageSize: number, sortDirection: string) {
  const resp = await api.get<PaginatedArray<Dataset>>(getLocalizedUrl(`organizations/${oid}/datasets/`), {
    params: { q, sort: sortDirection, page_size: pageSize, page }
  });
  return resp.data;
}

export async function getUserDatasets(userId: string, q: string, page: number, pageSize: number, sortDirection: string) {
  const resp = await api.get<PaginatedArray<Dataset>>(getLocalizedUrl(`datasets/`), {
    params: { q, sort: sortDirection, page_size: pageSize, page, owner: userId }
  });
  return resp.data;
}

export function getOrganizationDatasetsCatalogUrl(oid: string, totalResults: number) {
  if(!totalResults) {
    return "";
  }
  return `/organizations/${oid}/datasets.csv`;
}

export async function getDataset(id: string) {
  const resp = await apiv2.get<Dataset>(`/datasets/${id}/`);
  return resp.data;
}
