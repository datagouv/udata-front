/**
 * @typedef {Object} User
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} [avatar_thumbnail]
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
  * @typedef {"default" } DSFRFormDefaultState
  */

   /**
  * @typedef {"error" | "success"} DSFRFormFunctionalState
  */

  /**
  * @typedef {DSFRFormDefaultState | DSFRFormFunctionalState } DSFRFormState
  */

  /**
  * @typedef {DSFRFormFunctionalState | "warning"} FormFunctionalState
  */

  /**
  * @typedef {FormFunctionalState | "disabled"} AccordionFunctionalState
  */

  /**
  * @typedef {"info"} AccordionInfoState
  */

  /**
  * @typedef {AccordionFunctionalState | AccordionInfoState} PublishingFormAccordionState
  */

  /**
  * @typedef {DSFRFormDefaultState | AccordionFunctionalState | AccordionInfoState} AccordionState
  */

  /**
   * @typedef {typeof import("./helpers").RESOURCE_TYPE[number]} ResourceType
   */

  /**
   * @typedef {"remote" | "file"} ResourceFileType
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
   *  last_update: Date | null,
   *  page: string,
   *  private: boolean,
   *  quality?: Quality,
   *  spatial: {
   *    zones: string,
   *    granularity: string,
   *  }
   * }} Dataset
   */

  /**
   * @typedef {{rid?: string, description: string?, filetype: ResourceFileType, schema?: string, title: string, type: ResourceType, url: string}} DatasetRemoteFile
   * @typedef {{rid?: string, file: File, sha256?: string, description: string?, format: string, filesize: number, filetype: ResourceFileType, mime: string, schema?: string, title: string, type: ResourceType}} DatasetLocalFile
   * @typedef {DatasetLocalFile | DatasetRemoteFile} DatasetFile
   */

 export default {};
