<template>
  <div class="multiselect w-100 fr-select-group" :class="selectGroupClass" ref="container" :data-selected="!!selected">
    <div>
      <label :for="id" :title="explanation">
        {{placeholder}}
        <Required :required="required"/>
        <span v-if="explanation" class="fr-icon-information-line" aria-hidden="true"></span>
        <span class="fr-hint-text" v-if="hintText">{{ hintText }}</span>
      </label>
      <select
        class="multiselect__input"
        :class="{'fr-select--blue': isBlue}"
        :id="id"
        ref="select"
        v-model="selected"
        :required="required"
      >
        <option
          v-for="option in displayedOptions"
          :key="option.value"
          :value="option.value"
          :data-image="option.image"
          :disabled="option.disabled"
          :hidden="option.hidden"
        >
          {{option.label}}
        </option>
      </select>
    </div>
    <p :id="validTextId" class="fr-valid-text" v-if="isValid">
      {{ validText }}
    </p>
    <p :id="errorTextId" class="fr-error-text" v-else-if="hasError">
      {{ errorText }}
    </p>
  </div>
</template>

<script>
import {defineComponent, ref, computed, onMounted, onUpdated, reactive, unref, watch} from "vue";
import Select from "@conciergerie.dev/select-a11y";
import {useI18n} from 'vue-i18n';
import axios from "axios";
import {api, generateCancelToken} from "../../plugins/api";
import Required from "../Ui/Required/Required.vue";
import useUid from "../../composables/useUid";
import { useToast } from "../../composables/useToast";

export default defineComponent({
  components: { Required },
  emits: ["change"],
  props: {
    addAllOption: {
      type: Boolean,
      default: true,
    },
    allOption: {
      type: String,
      default: '',
    },
    emptyPlaceholder: {
      type: String,
    },
    entityUrl: {
      type: String,
    },
    errorText: {
      type: String,
      default: "",
    },
    explanation: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    hasWarning: {
      type: Boolean,
      default: false,
    },
    hintText: {
      type: String,
      default: "",
    },
    isBlue: {
      type: Boolean,
      default: false,
    },
    /** @type {import("vue").PropType<Promise<Array<import("../../types").MultiSelectOption>>>} */
    initialOptions: Promise,
    isValid: {
      type: Boolean,
      default: false,
    },
    listUrl: {
      type: String
    },
    minimumCharacterBeforeSuggest: {
      type: Number,
      default: 1,
    },
    placeholder: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    searchPlaceholder: {
      type: String,
      required: true,
    },
    suggestUrl: {
      type: String
    },
    values: {
      type: [Array, String],
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const toast = useToast();
    const { id } = useUid('multiselect');
    const errorTextId = computed(() => id + "-desc-error");
    const validTextId = computed(() => id + "-desc-valid");

    const selectGroupClass = computed(() => {
      return {
        'fr-select-group--error': props.hasError,
        'fr-select-group--warning': !props.hasError && props.hasWarning,
        'fr-select-group--valid': props.isValid
      };
    });

    /**
    * Select template Ref
    * @type {import("vue").Ref<HTMLSelectElement|null>}
    */
    const select = ref(null);

    /**
     * Container Template Ref
     * @type {import("vue").Ref<HTMLElement|null>}
     */
    const container = ref(null);

    /**
     * Popup offset if required
     */
    const offset = ref(0);

    /**
     * Mimimum popup width
     */
    const minWidth = 350;

    /**
     * Maximum options count
     */
    const maxOptionsCount = 200;

    /**
     * Current options
     * @type {import("vue").Ref<Array<import("../../types").MultiSelectOption>>}
     */
    const options = ref([]);

    /**
     * Displayed Options limited to {@link maxOptionsCount}
     */
    const displayedOptions = computed(() => options.value.slice(0, maxOptionsCount));

    /**
     * Current selected value(s)
     * @type {import("vue").Ref<string | null>}
     */
    const selected = ref(null);

    const defaultValue = '';

    /**
     * Current request if any to be cancelled if a new one comes
     * @type {import("vue").Ref<import("axios").CancelTokenSource | null>}
     */
    const currentRequest = ref(null);

    /**
     * SelectA11y instance
     * @type {import("vue").Ref<import("@conciergerie.dev/select-a11y").Select | null>}
     */
    const selectA11y = ref(null);

    const noResultAfterSearch = computed(() => props.emptyPlaceholder || t("No results found."));

    const texts = reactive({
      help: t('Use tab (or arrow down) to move between suggestions'),
      placeholder: props.searchPlaceholder,
      noResult: noResultAfterSearch.value,
      results: t('{x} available suggestion'),
      deleteItem: t('Delete {t}'),
      delete: t('Delete'),
    });

    /**
     * Get initial set of options from API or an empty array
     * @returns {Promise<Array<import("../../types").MultiSelectOption>>}
     */
    const getInitialOptions = async () => {
      if(props.initialOptions) return props.initialOptions;
      if (!props.listUrl) return [];

      /**
       * @type {import("axios").AxiosResponse<{data: Array}|Array>}
       */
      return api.get(props.listUrl)
      .then(resp => {
        let data = resp.data;
        if(!Array.isArray(data)) {
          data = data.data;
        }
        return mapToOption(data);
      }).catch((error) => {
        if (!axios.isCancel(error)) {
          toast.error(t("Error getting {type}.", {type: props.placeholder}));
        }
        return [];
      });
    };

    /**
     * Map an array of all different objects received from API to an array of {@link Option}
     * @param {Array} data
     * @returns {Array<import("../../types").MultiSelectOption>}
     **/
    const mapToOption = (data) => data.map((obj) => ({
      label: obj.name ?? obj.title ?? obj.text ?? obj?.properties?.name ?? obj.label ?? obj,
      value: obj.id ?? obj.text ?? obj.value ?? obj,
      image: obj.logo_thumbnail ?? obj.logo ?? obj.image_url ?? obj.image,
      disabled: obj.disabled,
      hidden: obj.hidden,
    }));

    /**
     * Get options from suggest API
     * It uses list API if no query is provided
     * Fallback to an empty array without props.listUrl
     * @param {string} q
     * @returns {Promise<Array<import("../../types").MultiSelectOption>>}
     */
    const suggest = (q) => {
      if(q.length < props.minimumCharacterBeforeSuggest || !props.suggestUrl) {
        return getInitialOptions();
      }
      if (currentRequest.value) {
        currentRequest.value.cancel();
      }

      currentRequest.value = generateCancelToken();
      return api
        .get(props.suggestUrl, {
          params: { q, size: maxOptionsCount },
          cancelToken: currentRequest.value.token,
        })
        .then((resp) => {
          /** @type Array */
          const suggestions = resp.data;
          return suggestions;
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            toast.error(t("Error getting {type}.", {type: props.placeholder}));
          }
          return [];
        });
    };

    const suggestAndMapToOption = (q = '') => suggest(q).then(addAllOptionAndMapToOption);

    /**
     * Get options from suggest API
     * It uses list API if no query is provided
     * Fallback to an empty array without query and props.listUrl
     * @param {Array<import("../../types").MultiSelectOption>} suggestions
     * @returns {Array<import("../../types").MultiSelectOption>}
     */
    const addAllOptionAndMapToOption = (suggestions) => {
      if(props.allOption) {
        suggestions.unshift({
          label: props.allOption,
          value: '',
          disabled: !props.addAllOption,
          hidden: !props.addAllOption
        });
      }
      return mapToOption(suggestions);
    }

    /**
     * Set options from DOM processing
     * @param {Array<import("../../types").MultiSelectOption> | void} values
     * @returns {Array<import("../../types").MultiSelectOption> | void}
     */
    const setOptions = (values) => {
      if(values) {
        options.value = values;
      }
      return values;
    };

    /**
     * Normalize provided values to array
     * @param {string | Array | undefined} values
     * @returns {import("vue").Ref<string>}
     */
    const normalizeValues = (values) => {
      /**
       * Selected value
       * @type {import("vue").Ref<string>}
       */
      const selected = ref('');
      if (typeof values === "string") {
        selected.value = values;
      } else if (Array.isArray(values)) {
        selected.value = values[0];
      }
      return selected;
    }

    /**
     * Fill selected array with initial props.values.
     * It tries to augment the values with data from props.entityUrl or options.
     */
    const fillSelectedFromValues = () => {
      let selectedPromise = null;
      let value = unref(normalizeValues(props.values));
      if (value && props.entityUrl) {
          selectedPromise = api
            .get(props.entityUrl + value)
            .then((resp) => resp.data)
            .then((data) => mapToOption([data]))
            .then((entities) => entities[0]?.label ?? value)
            .then((label) => {
              const newOption = options.value.every(option => option.value !== value);
              if(newOption) {
                options.value.push({label, value});
              }
            })
            .then(() => value);
        } else {
          let option = options.value.find((opt) => opt.value === value);
          if (!option) {
            option = {label: value, value};
            options.value.push(option);
          }
          selectedPromise = Promise.resolve(option.value);
        }
      return selectedPromise
        .then(value => selected.value = value)
        .then(value => value ? value : selected.value = defaultValue)
        .catch((error) => {
          if (!axios.isCancel(error)) {
            toast.error(t("Error getting {type}.", {type: props.placeholder}));
          }
          return [];
        });
    }

    /**
     * Register event listener to trigger on change on select change event
     */
    const registerTriggerOnChange = () => {
      if(select.value) {
        emit("change", select.value.value);
        console.log("change", select.value.value);
      }
    };

    const updateStylesAndEvents = () => {
      updatePopupStyle();
      updateSelectStyle();
      registerSelectEvents();
    }

    const updatePopupStyle = () => {
      if(!container.value) {
        return;
      }
      let rect = container.value.getBoundingClientRect();
      let popupWidth = minWidth;
      if(window.innerWidth < popupWidth) {
        popupWidth = Math.min(minWidth, rect.width);
      }
      let availableSpace = window.innerWidth - rect.x;
      let popupMustMove = availableSpace < popupWidth;
      offset.value = popupMustMove ? popupWidth - rect.width : 0;
      const styles = container.value.style;
      styles.setProperty('--offset-select-a11y__overlay', `-${offset.value}px`);
      styles.setProperty('--min-width-select-a11y__overlay', `${popupWidth}px`);
    }

    const updateSelectStyle = () => {
      if(!container.value) {
        return;
      }
      const selectA11y = container.value.querySelector('.select-a11y');
      if(selectA11y) {
        selectA11y.classList.add("fr-select");
      }
      const label = container.value.querySelector('label');
      if(label) {
        label.classList.add("fr-label");
      }
      const button = container.value.querySelector('.select-a11y-button__text');
      if (button && !button.innerHTML) {
        button.innerHTML = "&nbsp;";
      }
    };

    const registerSelectEvents = () => {
      if(!container.value) {
        return;
      }
      if(select.value) {
        select.value.removeEventListener('change', registerTriggerOnChange);
        select.value.addEventListener('change', registerTriggerOnChange);
      }
    };

    const makeSelect = () => {
      const options = {
        text: texts,
        clearable: true,
      };
      if(props.suggestUrl) {
        options.fillSuggestions = suggestAndMapToOption;
      }
      try {
        selectA11y.value = new Select(select.value, options);
        updateStylesAndEvents();
      } catch (e) {
        console.log(e);
      }
    };

    watch(() => props.values, () => {
      let value = unref(normalizeValues(props.values));
      selectA11y.value?.selectOptionSilently(value);
    });

    const fillOptionsAndValues = suggestAndMapToOption()
    .then(setOptions)
    .then(fillSelectedFromValues);

    onMounted(() => fillOptionsAndValues.then(makeSelect));
    onUpdated(updateStylesAndEvents);
    return {
      container,
      displayedOptions,
      errorTextId,
      id,
      offset,
      select,
      selected,
      selectGroupClass,
      validTextId,
    }
  }
});
</script>

<style scoped>
.multiselect :deep(.select-a11y__overlay) {
  left: var(--offset-select-a11y__overlay);
  min-width: var(--min-width-select-a11y__overlay);
}
</style>
