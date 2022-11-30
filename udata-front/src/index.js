/**
 * @typedef {object} Component
 * @property {string} hook - Hook name
 * @property {import("vue").Component} component - Vue Component to show in udata-front
 * @property {string} [module] module - Udata module registering this component, logged before the component is used
 * * @property {string} [name] - Component name, logged before the component is used
 */

/**
 * @typedef {object} Translation
 * @property {object} messages - Messages to add to vue-i18n
 * @property {string} [module] - Udata module registering this translation
 */

/** @typedef {Object<string, Array<Component>>} Components - see {@link Component} */
/** @typedef {Array<Translation>} Translations - see {@link Translation} */

/**
 * @typedef {object} UdataFrontNamespace
 * @property {Components} components - Key-value pair matching components (see {@link Component}) with hooks
 * @property {Translations} translations - Translations to add to vue-i18n (see {@link Translation})
*/

/** @type {UdataFrontNamespace} */
const udata_front = globalThis.udata_front ?? {
  components: {},
  translations: [],
}

/**
 * @callback RegisterComponent
 * @param {string} hook
 * @param {import("vue").Component} component
 * @param {string} [module]
 * @param {string} [name]
 * @returns {Component}
 */

/** @type {RegisterComponent} */
export function registerComponent(hook, component, module, name) {
  if(!udata_front.components[hook]) {
    udata_front.components[hook] = [];
  }

  const udataFrontComponent = {
    component,
    hook,
    module,
    name,
  };

  udata_front.components[hook].push(udataFrontComponent);

  return udataFrontComponent;
}

/**
 * @callback RegisterTranslation
 * @param {object} messages - Name of the {@link Hook}
 * @param {string} [module] - Udata module, logged when the hook is called
 * @returns {Translation}
 */

/** @type {RegisterTranslation} */
export function registerTranslation(messages, module) {
  const translation = {
    messages,
    module,
  };
  udata_front.translations.push(translation);
  return translation;
}

/** @returns {Components} */
export function getRegisteredComponents() {
  return udata_front.components;
}

/**
 * @param {string} name - Hook name
 *  @returns {Array<Component>} all components for this hook
*/
export function getRegisteredComponentsForHook(name) {
  return udata_front.components[name] ?? [];
}

/** @returns {Translations} */
export function getRegisteredTranslations() {
  return udata_front.translations;
}

globalThis.udata_front = udata_front;
