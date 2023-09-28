import { toValue } from "vue";
import { api } from "../plugins/api";

/**
* @param {import("vue").MaybeRefOrGetter<import("../types").Dataset>} dataset
* @returns {Promise<import("../types").Dataset>}
*/
export default function createDataset(dataset) {
  const datasetToUpload = { ...toValue(dataset) };
  delete datasetToUpload.quality;
  return api.post("datasets/", {
    ...datasetToUpload,
  });
}
