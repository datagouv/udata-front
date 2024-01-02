import { toValue } from "vue";
import { api } from "../plugins/api";
import { getLocalizedUrl } from "../i18n";

/**
 * @typedef {import("../types").Owned & {
 *  title: string,
 *  acronym: string,
 *  archived?: string,
 *  description: string,
 *  tags: Array<string> | null,
 *  license: string,
 *  frequency: string,
 *  temporal_coverage: string,
 *  frequency_date: Date | null,
 *  private: boolean,
 *  spatial?: {
 *    zones?: Array<string>,
 *    granularity?: string,
 *  }
 * }} DatasetToUpload
 */

/**
 * @param {import("vue").MaybeRefOrGetter<import("../types").NewDataset>} datasetRef
 * @returns {DatasetToUpload}
 */
function formatDatasetForUpload(datasetRef) {
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

/**
* @param {import("vue").MaybeRefOrGetter<import("../types").NewDataset>} dataset
* @returns {Promise<import("../types").Dataset>}
*/
export function createDataset(dataset) {
  /** @type {DatasetToUpload} */
  const datasetToUpload = formatDatasetForUpload(dataset);
  return api.post("datasets/", {
    ...datasetToUpload,
  }).then(resp => resp.data);
}

/**
* @param {import("vue").MaybeRefOrGetter<import("../types").Dataset>} dataset
* @returns {Promise<import("../types").Dataset>}
*/
export function publishDataset(dataset) {
  const datasetToUpload = toValue(dataset);
  datasetToUpload.private = false;
  return api.put("datasets/" + datasetToUpload.id, {
    ...datasetToUpload,
  }).then(resp => resp.data);
}

/**
 * @returns {string}
 */
export function getFrequenciesUrl () {
  return getLocalizedUrl("datasets/frequencies/");
}
