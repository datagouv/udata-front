import useVuelidate from "@vuelidate/core";
import { toValue } from "vue";

/**
 *
 * @template {Record<string, Object>} T
 * @template {Record<string, Object>} U
 * @param {import("vue").UnwrapNestedRefs<Object>} data
 * @param {T} requiredRules
 * @param {U} warningRules
*/
export default function useFunctionalState(data, requiredRules, warningRules) {
  const v$ = useVuelidate(requiredRules, data);
  const vWarning$ = useVuelidate(warningRules, data);

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

  return {
    getErrorText,
    getFunctionalState,
    getWarningText,
    hasError,
    hasWarning,
    v$,
    vWarning$,
  }
}


/**
 *
 * @param {boolean} dirty
 * @param {boolean} failRequired
 * @param {boolean} failWarning
 * @returns {import("../types").AccordionFunctionalState}
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
 * @param {import("vue").MaybeRefOrGetter<Record<string, import("../types").AccordionFunctionalState>>} object
 * @param {string} field
 * @returns {boolean}
 */
export const hasError = (object, field) => toValue(object)[field] === "error";

/**
 * @param {import("vue").MaybeRefOrGetter<Record<string, import("../types").AccordionFunctionalState>>} object
 * @param {string} field
 * @returns {boolean}
 */
export const hasWarning = (object, field) => toValue(object)[field] === "warning";
