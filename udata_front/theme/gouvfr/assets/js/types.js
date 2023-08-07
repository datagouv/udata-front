/**
 * @typedef {object} User
 * @property {String} first_name
 * @property {String} last_name
 */

/**
 * @typedef {Object} MultiSelectOption
 * @property {string} label - Label (display) of the option
 * @property {string} value - Value (id) of the option
 * @property {string} [image] - Image (optional) to show
 */

/**
 * @typedef {"button" | "input"} UploadType
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
   * @typedef {{rid?: string, file: File, sha256?: string, description: string?, format: string, filesize: number, filetype: ResourceFileType, mime: string, schema?: string, title: string, type: ResourceType}} DatasetFile
   */

 export default {};
