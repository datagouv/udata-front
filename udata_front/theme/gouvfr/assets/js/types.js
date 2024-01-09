 /**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} [slug]
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} page
 * @property {string} [avatar]
 * @property {string} [avatar_thumbnail]
 * @property {Array<string>} [roles]
 */

 /**
 * @typedef Subject
 * @property {string} id
 * @property {string} class
 */

/**
 * @typedef NewDiscussion
 * @property {string} title
 * @property {string} comment
 * @property {Subject} subject
 */

/**
 * @callback CreateDiscussion
 * @param {NewDiscussion} discussion
 * @returns {Promise}
 */

/**
 * @callback CreateComment
 * @param {string} comment
 * @returns {Promise}
 */

/**
 * @typedef {Object} Organization
 * @property {string} name
 * @property {Array<{kind: string}>} badges
 * @property {string} [page]
 * @property {string} [logo]
 * @property {string} [logo_thumbnail]
 */

/**
 * @typedef {Object} Quality
 * @property {boolean} all_resources_available
 * @property {boolean} dataset_description_quality
 * @property {boolean} has_open_format
 * @property {boolean} has_resources
 * @property {boolean} license
 * @property {boolean} resources_documentation
 * @property {number} score
 * @property {boolean} spatial
 * @property {boolean} temporal_coverage
 * @property {boolean} update_frequency
 * @property {boolean} update_fulfilled_in_time
 */

/**
 * @typedef {{organization: Organization, owner?: never}} OwnedByOrganization
 * @typedef {{organization?: never, owner: User}} OwnedByOwner
 *
 * A resource, dataset, reuse or any other object owned by an organization or a user.
 * @typedef {OwnedByOrganization | OwnedByOwner} Owned
 */

/**
 * @typedef {Object} MultiSelectOption
 * @property {string} label - Label (display) of the option
 * @property {string} value - Value (id) of the option
 * @property {string} [image] - Image (optional) to show
 * @property {boolean} [hidden] - Hide this option
 * @property {boolean} [selected] - Select this option
 */

/**
 * @typedef {"primary" | "secondary"} WellType
 */

/**
 * @typedef {"light" | "regular" | "semi-bold" | "bold" | "heavy"} Weight
 */

/**
 * @typedef {"start" | "center" | "end"} AxisAlignment
 */

/**
 * @typedef {"sm" | "md"} AlertSize
 * @typedef {FormFunctionalState | DSFRInfoState} AlertType
 */

/**
 * * @typedef {"h1" | "h2" | "h3" | "h4" | "h5" | "h6"} TitleLevel
 */

/**
 * @typedef {"default" } DSFRFormDefaultState
 * @typedef {"error" | "success"} DSFRFormFunctionalState
 * @typedef {DSFRFormDefaultState | DSFRFormFunctionalState } DSFRFormState
 * @typedef {DSFRFormFunctionalState | "warning"} FormFunctionalState
 * @typedef {FormFunctionalState | "disabled"} AccordionFunctionalState
 * @typedef {"info"} DSFRInfoState
 * @typedef {AccordionFunctionalState | DSFRInfoState} PublishingFormAccordionState
 * @typedef {DSFRFormDefaultState | AccordionFunctionalState | DSFRInfoState} AccordionState
 */

/**
 * @typedef {typeof import("./helpers").RESOURCE_TYPE[number]} ResourceType
 */

/**
 * @typedef {"remote"} RemoteResourceFileType
 * @typedef {"file"} FileResourceFileType
 * @typedef { RemoteResourceFileType | FileResourceFileType} ResourceFileType
 */

/**
 * @typedef {typeof import("./helpers").CLOSED_FORMATS[number]} ClosedFormats
 */

/**
 * @typedef {Owned & {
 *  title: string,
 *  acronym: string,
 *  archived: boolean,
 *  description: string,
 *  tags: Array<string> | null,
 *  license: string,
 *  frequency: string,
 *  temporal_coverage: string,
 *  frequency_date: Date | null,
 *  page: string,
 *  private: boolean,
 *  quality?: Quality,
 *  spatial: {
 *    zones?: Array<string>,
 *    granularity?: string,
 *  } | null
 * }} NewDataset
 */

/**
 * @typedef {NewDataset & {
 *  id: string;
 *  last_update: string;
 * }} Dataset
 */

/**
 * @typedef {Owned & {
 *  id: string
 *  title: string,
 *  description: string,
 *  tags: Array<string> | null,
 *  page: string,
 *  private: boolean,
 *  deleted: boolean,
 *  datasets: Array<Dataset>,
 *  image: string,
 *  image_thumbnail: string,
 *  slug: string,
 *  topic: string,
 *  type: string,
 *  last_update: string,
 * }} Reuse
 */

/**
 * @typedef {{description: string?, filetype: RemoteResourceFileType, format: string, mime: string, schema?: string, title: string, type: ResourceType, url: string}} DatasetRemoteFile
 * @typedef {{file: File, sha256?: string, description: string?, format: string, filesize: number, filetype: FileResourceFileType, mime: string, schema?: string, title: string, type: ResourceType}} DatasetLocalFile
 * @typedef {"none" | "loading" | "failed" | "loaded"} FileLoadingState
 * @typedef {(DatasetLocalFile | DatasetRemoteFile) & {state: FileLoadingState}} NewDatasetFile
 * @typedef {(DatasetLocalFile | DatasetRemoteFile) & {rid: string}} DatasetFile
 *
 * @typedef {{file: Blob, uuid: string, filename: string}} DatasetFullFileUpload
 * @typedef {DatasetFullFileUpload & {partindex: number, partbyteoffset: number, totalparts: number, chunksize: number}} DatasetChunkUpload
 * @typedef {{uuid: string, filename: string, totalparts: number}} DatasetCombineChunkUpload
 * @typedef {{"error": string | null, "message": string, "success": boolean}} DatasetChunkResponse
 * @typedef {DatasetFullFileUpload | DatasetChunkUpload} DatasetFileUpload
 */

 export default {};
