import { getRegisteredComponentsForHook } from "@etalab/udata-front-plugins-helper";
import { reactive, watch } from "vue";
import { reloadLocale } from "../helpers/i18n";

export default function useComponentsForHook() {
  const components = reactive<import("@etalab/udata-front-plugins-helper").Components>({});
  const getComponentsForHook = (name: string) => {
    components[name] = getRegisteredComponentsForHook(name);
    return components[name];
  }
  watch(components, reloadLocale);
  return {
    getComponentsForHook,
  }
}
