import type { Dataset, NewDataset } from "@etalab/data.gouv.fr-components";
import { toValue, type MaybeRefOrGetter } from "vue";
import { api } from "../plugins/api";
import { getLocalizedUrl } from "../i18n";
import type { SpatialGranularity } from "../types";

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

export function getSpatialGranularities () {
  return api.get<Array<SpatialGranularity>>(getLocalizedUrl("spatial/granularities/")).then(resp => resp.data);
}
