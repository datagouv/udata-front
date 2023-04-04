import {api, apiv2} from "../plugins/api";

/**
 * @typedef {Object} ResourceRest
 * @property {string} id
 * @property {Object} created_at
 * @property {Object} description
 * @property {Object} extras
 * @property {Object} harvest
 * @property {number} filesize
 * @property {string} filetype
 * @property {string} format
 * @property {string} last_modified
 * @property {string} last_update
 * @property {string} preview_url
 * @property {Object} schema
 * @property {string} url
 *
 * @typedef {import("../composables/useOwnerName").Owned & ResourceRest} Resource
 */

/**
 * @typedef {Object} ResourceApiWrapper
 * @property {Array<Resource>} data
 * @property {string | null} next_page
 * @property {number} page
 * @property {number} page_size
 * @property {string | null} previous_page
 * @property {number} total
 */

/**
 * @param {string} datasetId
 * @param {string} type
 * @param {number} page
 * @param {number} pageSize
 * @param {string} search
 * @return {Promise<ResourceApiWrapper>}
 */
export const fetchDatasetResources = (datasetId, type, page, pageSize, search) => {
  return apiv2
    .get("/datasets/" + datasetId + "/resources/", {
      params: {
        page,
        type: type,
        page_size: pageSize,
        q: search,
      },
    })
    .then((resp) => resp.data);
}

/**
 * @param {string} datasetId
 * @param {number} page
 * @param {number} pageSize
 * @return {Promise<ResourceApiWrapper>}
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
