import { getRegisteredComponentsForHook } from "@etalab/udata-front-plugins-helper";
import { reactive, watch } from "vue";
import { reloadLocale } from "../plugins/i18n";

export default function useComponentsForHooks() {
  const components = reactive({});
  /** @param {string} name - Hook name to look for */
  const getComponentsForHook = (name) => {
    components[name] = getRegisteredComponentsForHook(name);
    return components[name];
  }
  watch(components, reloadLocale);
  return {
    getComponentsForHook,
  }
}
