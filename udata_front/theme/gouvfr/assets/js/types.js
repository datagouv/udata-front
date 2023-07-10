/**
 * @typedef {object} User
 * @property {String} first_name
 * @property {String} last_name
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
