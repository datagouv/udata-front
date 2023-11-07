import { computed, toRef, toValue } from "vue";
import { useI18n } from "vue-i18n";
import { minLengthWarning, required, requiredIf, requiredWithCustomMessage } from "../../i18n";
import { quality_description_length } from "../../config";
import useFunctionalState from "./useFunctionalState";

export const VALIDATION_SCOPE = "files";

/**
 *
 * @param {import("vue").MaybeRefOrGetter<import("../../types").NewDatasetFile>} datasetFile
 */
export default function useFileValidation(datasetFile) {
  const { t } = useI18n();

  const file = toRef(datasetFile);

  const isRemote = computed(() => file.value.filetype === 'remote');

  const requiredRules = {
    url: { required: requiredIf(isRemote.value) },
    title: { required },
    type: { required },
    format: { required },
    schema: {},
    mime: {},
  };

  const descriptionAdvised = requiredWithCustomMessage(t("It's advised to add a description."));

  const warningRules = {
    url: { required: requiredIf(isRemote.value) },
    title: { required },
    type: { required },
    format: { required },
    description: { required: descriptionAdvised, minLengthValue: minLengthWarning(quality_description_length) },
  };

  const { getErrorText, getWarningText, getFunctionalState, hasError, hasWarning, reset, validateRequiredRules, v$, vWarning$ } = useFunctionalState(file, requiredRules, warningRules, VALIDATION_SCOPE);

  /**
   * @type {import("vue").ComputedRef<Record<string, import("../../types").PublishingFormAccordionState>>}
   */
  const state = computed(() => {
    return {
      url: v$.value.url.$dirty ? "info" : "disabled",
      title: getFunctionalState(v$.value.title.$dirty, v$.value.title.$error, false),
      type: getFunctionalState(v$.value.type.$dirty, v$.value.type.$error, false),
      format: getFunctionalState(v$.value.format.$dirty, v$.value.format.$error, false),
      description: getFunctionalState(vWarning$.value.description.$dirty, false, vWarning$.value.description.$error),
      schema: v$.value.schema.$dirty ? "info" : "disabled",
      mime: v$.value.mime.$dirty ? "info" : "disabled",
    };
  });

  /**
   *
   * @param {string} field
   */
  const fieldHasError = (field) => hasError(state, field);

  /**
   *
   * @param {string} field
   */
  const fieldHasWarning = (field) => hasWarning(state, field);

  const stateErrors = computed(() => v$.value.$errors.map(error => toValue(error.$message)));
  const stateWarnings = computed(() => vWarning$.value.$errors.map(error => toValue(error.$message)));

  return {
    fieldHasError,
    fieldHasWarning,
    getErrorText,
    getWarningText,
    isRemote,
    requiredRules,
    warningRules,
    reset,
    state,
    stateErrors,
    stateWarnings,
    validateRequiredRules,
    v$,
    vWarning$,
  };
}
