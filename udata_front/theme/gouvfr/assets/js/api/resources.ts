import { v4 as uuidv4 } from 'uuid';
import { api, apiv2 } from "../plugins/api";
import { getLocalizedUrl } from '../i18n';
import type { DatasetChunkUpload, DatasetFile, DatasetFileUpload, DatasetLocalFile, DatasetRemoteFile, NewDatasetFile } from '../types';

export type ResourceApiWrapper = {
  data: Array<import("@etalab/data.gouv.fr-components").Resource>;
  next_page: string | null;
  page: number;
  page_size: number;
  previous_page: string | null;
  total: number;
};

export function fetchDatasetResources(datasetId: string, type: string, page: number, pageSize: number, search: string) {
  return apiv2
    .get<ResourceApiWrapper>("/datasets/" + datasetId + "/resources/", {
      params: {
        page,
        type: type,
        page_size: pageSize,
        q: search,
      },
    })
    .then((resp) => resp.data);
}

export function fetchDatasetCommunityResources (datasetId: string, page: number, pageSize: number) {
  return api
    .get<ResourceApiWrapper>("datasets/community_resources/", {
      params: {
        page,
        dataset: datasetId,
        page_size: pageSize,
      },
    })
    .then((resp) => resp.data)
}

export function getAllowedExtensionsUrl () {
  return getLocalizedUrl("datasets/extensions/");
}

export function fetchAllowedExtensions () {
  return api
    .get<Array<string>>(getAllowedExtensionsUrl())
    .then((resp) => resp.data);
}

const chunkSize = 2000000;

export function getUploadUrl(datasetId: string) {
  return `datasets/${datasetId}/upload/`;
}

export function createFile(datasetId: string, file: NewDatasetFile) {
  if(file.state === "loaded") {
    return Promise.resolve(file);
  }
  if(file.filetype === "remote") {
    return createRemoteResource(datasetId, file);
  } else {
    return createFileResource(datasetId, file);
  }
}

export function createRemoteResource(datasetId: string, file: DatasetRemoteFile) {
  return api.post<DatasetFile>(`datasets/${datasetId}/resources/`, {
    ...file,
  }).then((resp) => resp.data);
}

export function updateResource(datasetId: string, file: DatasetFile) {
  type Resource = Omit<DatasetFile, 'file'>;
  let toUpload: Resource = file;
  if('file' in toUpload) {
    delete toUpload.file;
  }
  return api.put(`datasets/${datasetId}/resources/${toUpload.id}`, {
    ...toUpload,
  }).then((resp) => resp.data);
}

export function createFileResource(datasetId: string, file: DatasetLocalFile) {
  const apiForm: DatasetFileUpload = {
    uuid: uuidv4(),
    filename: file.file.name,
    file: file.file
  };

  if(file.filesize > 2000000) {
    return createChunksResource(datasetId, file);
  }

  return api.postForm<DatasetFile>(getUploadUrl(datasetId), {
    ...apiForm,
  })
  .then((resp) => {
    const fileWithId: DatasetFile = { ...resp.data, ...file }
    return updateResource(datasetId, fileWithId);
  })
  .then((resp) => resp.data);
}

export function createChunksResource(datasetId: string, file: DatasetLocalFile) {
  const apiForm: DatasetFileUpload = {
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

  return Promise.all(promises).then(_results => {
    return api.postForm<DatasetFile>(getUploadUrl(datasetId), {
      ...apiForm,
    }).then((resp) => resp.data);
  });
}

export const isLoading = (file: NewDatasetFile) => file.state === "loading";

export const isLoaded = (file: NewDatasetFile) => file.state === "loaded";

export const isFailed = (file: NewDatasetFile) => file.state === "failed";

export function createChunkResource(datasetId: string, file: DatasetLocalFile, index: number, offset: number, nbChunks: number) {
  const chunk = file.file.slice(offset, offset + chunkSize, file.file.type);
  const apiForm: DatasetChunkUpload = {
    uuid: uuidv4(),
    filename: file.file.name,
    file: chunk,
    partindex: index,
    partbyteoffset: offset,
    totalparts: nbChunks,
    chunksize: chunk.size,
  };

  return api.postForm<{
    error: string | null;
    message: string;
    success:
    boolean}>(getUploadUrl(datasetId), {
    ...apiForm,
  })
  .then((resp) => resp.data);
}
