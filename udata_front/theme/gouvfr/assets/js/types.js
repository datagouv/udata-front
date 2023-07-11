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

 export default {};
