import { v4 as uuidv4 } from 'uuid';
import {api, apiv2} from "../plugins/api";
import { getLocalizedUrl } from '../i18n';

/**
 * @typedef {Object} ResourceApiWrapper
 * @property {Array<import("@etalab/data.gouv.fr-components").Resource>} data
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

/**
 * @returns {string}
 */
export function getAllowedExtensionsUrl () {
  return getLocalizedUrl("datasets/extensions/");
}

/**
 * @return {Promise<Array<string>>}
 */
export function fetchAllowedExtensions () {
  return api
    .get(getAllowedExtensionsUrl())
    .then((resp) => resp.data);
}

const chunkSize = 2000000;

/**
 *
 * @param {string} datasetId
 */
export function getUploadUrl(datasetId) {
  return `datasets/${datasetId}/upload/`;
}

/**
 *
 * @param {string} datasetId
 * @param {import("../types").NewDatasetFile} file
 */
export function createFile(datasetId, file) {
  if(file.state === "loaded") {
    return Promise.resolve(file);
  }
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

  return api.postForm(getUploadUrl(datasetId), {
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
  const promises = [];

  for(let i = 0; i < nbChunks; i++) {
    let promise = createChunkResource(datasetId, file, i, chunkStart, nbChunks);
    promises.push(promise);
    chunkStart += chunkSize;
  }

  return Promise.all(promises).then(results => {
    return api.postForm(getUploadUrl(datasetId), {
      ...apiForm,
    });
  });
}

/**
 *
 * @param {import("../types").NewDatasetFile} file
 */
export const isLoading = (file) => file.state === "loading";


/**
 *
 * @param {import("../types").NewDatasetFile} file
 */
export const isLoaded = (file) => file.state === "loaded";

/**
 *
 * @param {import("../types").NewDatasetFile} file
 */
export const isFailed = (file) => file.state === "failed";

/**
* @param {string} datasetId
* @param {import("../types").DatasetLocalFile} file
* @param {number} index
* @param {number} offset
* @param {number} nbChunks
* @returns {Promise}
*/
export function createChunkResource(datasetId, file, index, offset, nbChunks) {
  const chunk = file.file.slice(offset, offset + chunkSize, file.file.type);
  /** @type {import("../types").DatasetChunkUpload} */
  const apiForm = {
    uuid: uuidv4(),
    filename: file.file.name,
    file: chunk,
    partindex: index,
    partbyteoffset: offset,
    totalparts: nbChunks,
    chunksize: chunk.size,
  };

  return api.postForm(getUploadUrl(datasetId), {
    ...apiForm,
  });
}
