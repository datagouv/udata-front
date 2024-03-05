import { type MaybeRefOrGetter, toValue } from "vue";
import { api } from "../plugins/api";
import { getLocalizedUrl } from "../i18n";
import type { Dataset, NewDataset, Owned } from "@etalab/data.gouv.fr-components";

export type DatasetToUpload = Owned & {
  title: string;
  acronym: string;
  archived?: string;
  description: string;
  tags: Array<string> | null;
  license: string;
  frequency: string;
  temporal_coverage: string;
  frequency_date: Date | null;
  private: boolean;
  spatial?: {
  zones?: Array<string>;
  granularity?: string;
  };
};

function formatDatasetForUpload(datasetRef: MaybeRefOrGetter<NewDataset>): DatasetToUpload {
  const dataset = { ...toValue(datasetRef) };
  return {
    ...dataset,
    private: true,
    archived: undefined,
    spatial: dataset.spatial ? {
      zones: dataset.spatial.zones?.length ? dataset.spatial.zones : undefined,
      granularity: dataset.spatial.granularity ? dataset.spatial.granularity : undefined,
    } : undefined,
  };
}

export function createDataset(dataset: MaybeRefOrGetter<NewDataset>): Promise<Dataset> {
  const datasetToUpload: DatasetToUpload = formatDatasetForUpload(dataset);
  return api.post("datasets/", {
    ...datasetToUpload,
  }).then(resp => resp.data);
}

export function publishDataset(dataset: MaybeRefOrGetter<Dataset>): Promise<Dataset> {
  const datasetToUpload = toValue(dataset);
  datasetToUpload.private = false;
  return api.put("datasets/" + datasetToUpload.id, {
    ...datasetToUpload,
  }).then(resp => resp.data);
}

export function getFrequenciesUrl(): string {
  return getLocalizedUrl("datasets/frequencies/");
}

export type GetOrganizationDatasetsData = {
  data: Array<Dataset>;
  next_page: string | null;
  page: number;
  page_size: number;
  total: number;
};

export function getOrganizationDatasets(oid: string, page: number, pageSize: number, sort: string) {
  return api.get<GetOrganizationDatasetsData>(getLocalizedUrl(`organizations/${oid}/datasets/`), {
    params: { sort, page_size: pageSize, page }
  }).then(resp => resp.data);
}
