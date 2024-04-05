import useVuelidate from "@vuelidate/core";
import { toValue } from "vue";

/**
 *
 * @template {Record<string, object>} T
 * @template {T} U
 * @param {import("vue").MaybeRef<{ [key in keyof U]: any; }>} data
 * @param {T} requiredRules
 * @param {U} warningRules
 * @param {string | boolean} scope
*/
export default function useFunctionalState(data, requiredRules, warningRules, scope = false) {
  const v$ = useVuelidate(requiredRules, data, { $scope: scope });
  const vWarning$ = useVuelidate(warningRules, data, { $scope: "warning" });

  /**
   * Get the error messages if any for given field
   * @param {string} field
   */
  const getErrorText = (field) => {
    if(vWarning$.value[field].$dirty) {
      v$.value[field].$touch();
    }
    return v$.value[field].$errors
      .map((/** @type {import("@vuelidate/core").ErrorObject} */ error) => error.$message)
      .join("\n");
  }

  /**
   * Get the warning messages if any for given field
   * @param {string} field
   */
  const getWarningText = (field) => {
    return vWarning$.value[field].$errors
      .map((/** @type {import("@vuelidate/core").ErrorObject} */ error) => error.$message)
      .join("\n");
  }

  /**
   * Validate all required rules
   * @returns {Promise<boolean>}
   */
  const validateRequiredRules = () => {
    vWarning$.value.$validate();
    v$.value.$validate();
    return v$.value.$validate();
  }

  const reset = () => {
    vWarning$.value.$reset();
    v$.value.$reset();
  }

  return {
    getErrorText,
    getFunctionalState,
    getWarningText,
    hasError,
    hasWarning,
    reset,
    validateRequiredRules,
    v$,
    vWarning$,
  }
}

/**
 *
 * @param {boolean} dirty
 * @param {boolean} failRequired
 * @param {boolean} failWarning
 * @returns {import("../../types").AccordionFunctionalState}
*/
export const getFunctionalState = (dirty, failRequired, failWarning) => {
  if (!dirty) {
    return "disabled";
  }
  if (failRequired) {
    return "error";
  }
  if (failWarning) {
    return "warning";
  }
  return "success"
};

/**
 * @param {import("vue").MaybeRefOrGetter<Record<string, import("../../types").PublishingFormAccordionState>>} object
 * @param {string} field
 * @returns {boolean}
 */
export const hasError = (object, field) => toValue(object)[field] === "error";

/**
 * @param {import("vue").MaybeRefOrGetter<Record<string, import("../../types").PublishingFormAccordionState>>} object
 * @param {string} field
 * @returns {boolean}
 */
export const hasWarning = (object, field) => toValue(object)[field] === "warning";
