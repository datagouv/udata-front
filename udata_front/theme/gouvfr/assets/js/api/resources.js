import { v4 as uuidv4 } from 'uuid';
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
 * @property {string?} format
 * @property {string} last_modified
 * @property {string} last_update
 * @property {string} preview_url
 * @property {Object} schema
 * @property {string} url
 *
 * @typedef {import("../types").Owned & ResourceRest} Resource
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
export function fetchDatasetResources (datasetId, type, page, pageSize, search) {
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
export function fetchDatasetCommunityResources (datasetId, page, pageSize) {
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

const chunkSize = 2000000;

/**
 *
 * @param {string} datasetId
 * @param {import("../types").DatasetFile} file
 */
export function createFile(datasetId, file) {
  if(file.filetype === "remote") {
    return createRemoteResource(datasetId, file);
  } else {
    return createFileResource(datasetId, file);
  }
}


/**
 *
 * @param {string} datasetId
 * @param {import("../types").DatasetRemoteFile} file
 */
export function createRemoteResource(datasetId, file) {
  return api.post(`datasets/${datasetId}/resources/`, {
    ...file,
  });
}


/**
 *
 * @param {string} datasetId
 * @param {import("../types").DatasetLocalFile} file
 */
export function createFileResource(datasetId, file) {
  /** @type {import("../types").DatasetFileUpload} */
  const apiForm = {
    uuid: uuidv4(),
    filename: file.file.name,
    file: file.file
  };

  if(file.filesize > 2000000) {
    return createChunksResource(datasetId, file);
  }

  return api.postForm(`datasets/${datasetId}/upload/`, {
    ...apiForm,
  });
}

/**
 *
 * @param {string} datasetId
 * @param {import("../types").DatasetLocalFile} file
 */
export function createChunksResource(datasetId, file) {
  /** @type {import("../types").DatasetFileUpload} */
  const apiForm = {
    uuid: uuidv4(),
    filename: file.file.name,
    file: file.file
  };

  const nbChunks = Math.ceil(file.filesize / chunkSize);
  let chunkStart = 0;

  for(let i = 0; i < nbChunks; i++) {
    createChunkResource(datasetId, file, i, chunkStart, nbChunks);
  }
}


/**
 *
 * @param {string} datasetId
 * @param {import("../types").DatasetLocalFile} file
 * @returns {Promise<>}
 */
export function createChunkResource(datasetId, file, index, offset, nbChunks) {
  /** @type {import("../types").DatasetChunkUpload} */
  const apiForm = {
    uuid: uuidv4(),
    filename: file.file.name,
    file: file.file,
    partindex: 0,
    partbyteoffset: 0,
    totalparts: 0,
    chunksize: chunkSize,
  };

  return api.postForm(`datasets/${datasetId}/upload/`, {
    ...apiForm,
  });
}
