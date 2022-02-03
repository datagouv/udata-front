import {api, apiv2} from "../plugins/api";

/**
 * @param {String} datasetId
 * @param {String} type
 * @param {Number} page
 * @param {Number} pageSize
 * @return Promise
 */
export const fetchDatasetResources = (datasetId, type, page, pageSize) => {
  return apiv2
    .get("/datasets/" + datasetId + "/resources/", {
      params: {
        page,
        type: type,
        page_size: pageSize,
      },
    })
    .then((resp) => resp.data);
}

/**
 * @param {String} datasetId
 * @param {Number} page
 * @param {Number} pageSize
 * @return Promise
 */
export const fetchDatasetCommunityResources = (datasetId, page, pageSize) => {
  return api
    .get("datasets/community_resources/", {
      params: {
        page,
        dataset: datasetId,
        page_size: pageSize,
      },
    })
    .then((resp) => resp.data)
}
