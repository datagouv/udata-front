<!--
---
name:  Multi-select
category: Search
---

# Multi-select

A pretty simple component that looks like a `<select>` but with autocomplete features.

Options can be :
- A list from an API that will be fetched once
- A suggest-style API that will be fetched on each character typed
- A combination of both : a static list on load that is replaced the user types something

* Initial values can be provided from props (can be used to pre-fill the select with values from the URL)

## Usage

Simply provide the necessary props for your case.

Urls:
* suggestUrl(optional): The URL that will be called when the user performs a search within the select.
  If not provided, suggest mode will be disabled and typing in the select will only filter the existing options.
* listUrl(optional): The URL that will be called to populate the select options on mount.
  If not provided, the select will start empty and will fill with options when the user starts typing some text.
* entityUrl(optional): The URL that will be called to fetch labels for options provided before the component mounts.
* values: Initial values if the select needs to be pre-filled. Can be a String (single value) or an Array of values.
  Labels will be fetched from entityUrl, or from the options list if listUrl is provided, or the value will be used as label.
* onChange: Function that will be called on each value select/deselect action.
* placeholder: Select placeholder, always shown
* searchPlaceholder: Search input placeholder
* emptyPlaceholder: Options placeholder when there is no search results

```
-->

<template>
  <div class="form-group" ref="container">
    <label :for="id">{{placeholder}}</label>
    <select
      class="form-control"
      :id="id"
      multiple
      ref="select"
      v-model="selected"
    >
      <option
        v-for="option in displayedOptions"
        :key="option.value"
        :value="option.value"
      >
        {{option.label}}
      </option>
    </select>
  </div>
</template>

<script>
import {defineComponent, ref, Ref, computed, onMounted, onUpdated} from "vue";
import Select from "@conciergerie-dev/select-a11y/dist/module";
import {useI18n} from 'vue-i18n';
import axios from "axios";
import {api, generateCancelToken} from "../../plugins/api";
import useUid from "../../composables/useUid";
import { useToast } from "../../composables/useToast";

/**
 * @typedef {Object} Option
 * @property {string} label - Label (display) of the option
 * @property {any} value - Value (id) of the option
 */

export default defineComponent({
  props: {
    suggestUrl: String,
    listUrl: String,
    entityUrl: String,
    values: [Array, String],
    onChange: {
      type: Function,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    searchPlaceholder: {
      type: String,
      required: true,
    },
    emptyPlaceholder: {
      type: String,
    },
    minimumCharacterBeforeSuggest: {
      type: Number,
      default: 1,
    }
  },
  setup(props) {
    const { t } = useI18n();
    const toast = useToast();
    const { id } = useUid('multiselect');

    /** 
    * Select template Ref
    * @type {Ref<HTMLSelectElement|null>}
    */
    const select = ref(null);

    /**
     * Container Template Ref
     * @type {Ref<HTMLElement|null>}
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
     * @type {Ref<Option[]>}
     */
    const options = ref([]);

    /**
     * Displayed Options limited to {@link maxOptionsCount}
     */
    const displayedOptions = computed(() => options.value.slice(0, maxOptionsCount));

    /**
     * Current selected value(s)
     * @type {Ref<Option[]>}
     */
    const selected = ref([]);

    /**
     * Current request if any to be cancelled if a new one comes
     * @type Ref<CancelTokenSource | null>
     */
    const currentRequest = ref(null);

    /**
     * Get initial set of options from API or an empty array
     * @returns {Promise<Option[]>}
     */
    const getInitialOptions = async () => {
      if (!props.listUrl) return [];

      /**
       * @type {import("axios").AxiosResponse<{data: Array}|Array>}
       */
      const resp = await api.get(props.listUrl);
      let data = resp.data;
      if(!Array.isArray(data)) {
        data = data.data;
      }
      return mapToOption(data);
    };

    /**
     * Map an array of all different objects received from API to an array of {@link Option}
     * @param {Array} data
     * @returns {Option[]}
     **/
    const mapToOption = (data) => {
      return data.map((obj) => ({
        label: obj.name || obj.title || obj.text || obj?.properties?.name,
        value: obj.id || obj.text,
      }));
    };

    /**
     * Get options from suggest API
     * It uses list API if no query is provided
     * Fallback to an empty array without query and props.listUrl
     * @param {string} q 
     * @returns {Promise<Option[]>}
     */
    const suggest = (q = '') => {
      if(q && props.suggestUrl) {
        if (currentRequest.value) {
          currentRequest.value.cancel();
        }

        currentRequest.value = generateCancelToken();
        return api
          .get(props.suggestUrl, {
            params: { q },
            cancelToken: currentRequest.value.token,
          })
          .then((resp) => resp.data)
          .then(mapToOption)
          .catch((error) => {
            if (!axios.isCancel(error)) {
              toast.error(t("Error getting {type}.", {type: props.placeholder}));
            }
            return [];
          });
      }

      return getInitialOptions();
    };

    /**
     * Set options from DOM processing
     * @param {Option[]} values
     * @returns {Option[]}
     */
    const setOptions = (values) => {
      options.value = values;
      return values;
    };

    /**
     * Normalize provided values to array
     * @param {string | Array | undefined} values 
     * @returns {Ref<Array>}
     */
    const normalizeValues = (values) => {
      /**
       * Array of selected values
       * @type {Ref<Array>}
       */
      let selected = ref([]);
      if (typeof values === "string") {
        selected.value = [values];
      } else if (Array.isArray(values)) {
        selected.value = values;
      } else {
        selected.value = [];
      }
      return selected;
    }

    /**
     * Fill selected array with initial props.values.
     * It tries to augment the values with data from props.entityUrl or options.
     */
    const fillSelectedFromValues = () => {
      const selectedPromises = [];
      let selectedValues = normalizeValues(props.values);
      for(let value of selectedValues.value) {
        if (props.entityUrl) {
          selectedPromises.push(
            api
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
              .then(() => value)
            );
          continue;
        }
        let option = options.value.find((opt) => opt.value === value);
        if (!option) {
          option = {label: value, value};
          options.value.push(option);
        }
        selectedPromises.push(Promise.resolve(option.value));
      }
      return Promise.all(selectedPromises)
        .then(values => selected.value.push(...values));
    }

    let suggesting = null;

    /**
     * Trigger suggest based on input event
     * @param {Event} e - Input event
     */
    const triggerSuggest = (e) => {
      if(e.target instanceof HTMLInputElement 
      && e.isTrusted 
      && e.target.value.length >= props.minimumCharacterBeforeSuggest) {
        if(suggesting !== e.target.value) {
          suggesting = null;
        }
        if(!suggesting) {
          e.stopImmediatePropagation();
          suggesting = e.target.value;
          suggest(e.target.value).then(setOptions).then(() => {
            if (e.target) {
              e.target.dispatchEvent(e);
            }
          }).finally(() => suggesting = null);
        }
      }
    };

    /**
     * Register event listener to trigger suggest on input event
     */
    const registerTriggerSuggest = () => {
      const input = container.value.querySelector('input');
      if(input) {
        input.addEventListener('input', triggerSuggest, {
          capture: true,
        });
      }
    };

    /**
     * Register event listener to trigger on change on select change event
     */
    const registerTriggerOnChange = () => {
      props.onChange(select.value.value);
    };

    const updateStylesAndEvents = () => {
      updatePopupStyle();
      updateSelectStyle();
      registerSelectEvents();
    }

    const updatePopupStyle = () => {
      let rect = container.value.getBoundingClientRect();
      let popupWidth = Math.min(minWidth, rect.width);
      if(window.innerWidth < popupWidth) {
        return;
      }
      let availableSpace = window.innerWidth - rect.x;
      let popupMustMove = availableSpace < minWidth;
      offset.value = popupMustMove ? minWidth - rect.width : 0;
      const styles = container.value.style;
      styles.setProperty('--offset-a11y-container', `-${offset.value}px`);
      styles.setProperty('--min-width-a11y-container', `${minWidth}px`);
    }

    const updateSelectStyle = () => {
      const selectA11y = container.value.querySelector('.select-a11y');
      if(!selectA11y.classList.contains("fr-select")) {
        selectA11y.classList.add("fr-select");
      }
    };
    
    const registerSelectEvents = () => {
      const button = container.value.querySelector('button');
      if(props.suggestUrl) {
        button.removeEventListener('click', registerTriggerSuggest);
        button.addEventListener('click', registerTriggerSuggest);
      }
      select.value.removeEventListener('change', registerTriggerOnChange);
      select.value.addEventListener('change', registerTriggerOnChange);
    };

    const makeSelect = () => {
      new Select(select.value, {
        text: {
          help: t('Use tab (or arrow down) to move between suggestions'),
          placeholder: props.searchPlaceholder,
          noResult: props.emptyPlaceholder || t("No results found."),
          results: t('{x} available suggestion'),
          deleteItem: t('Delete {t}'),
          delete: t('Delete'),
        },
        showSelected: true,
        enableTextFilter: !props.suggestUrl,
      });
      updateStylesAndEvents();
    };
    
    const fillOptionsAndValues = suggest()
    .then(setOptions)
    .then(fillSelectedFromValues);

    onMounted(() => fillOptionsAndValues.then(makeSelect));
    onUpdated(updateStylesAndEvents);
    return {
      id,
      displayedOptions,
      selected,
      select,
      container,
      offset,
    }
  }
});
</script>

<style scoped>
.form-group :deep(.a11y-container) {
  left: var(--offset-a11y-container);
  min-width: var(--min-width-a11y-container);
}
</style>
