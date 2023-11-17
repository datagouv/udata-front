import {api, apiv2} from "../plugins/api";

/**
 * @typedef {object} ResourceRest
 * @property {string} id
 * @property {string} title
 * @property {string} type
 * @property {{type: string, value: string} | null} checksum
 * @property {string} created_at
 * @property {string | null} description
 * @property {Record<string, any>} extras
 * @property {{views: number}} metrics
 * @property {object | null} harvest
 * @property {number} filesize
 * @property {string} filetype
 * @property {string} format
 * @property {string} mime
 * @property {object} internal
 * @property {string} last_modified
 * @property {string} latest
 * @property {string} preview_url
 * @property {import("./schemas").Schema} schema
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
