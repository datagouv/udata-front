/**
 * @typedef {object} Hook
 * @property {string} name - Hook name, used to register components (see {@link Component})
 * @property {string} [module] - Udata module registering this hook
 */

/**
 * @typedef {object} Component
 * @property {string} hook - Hook name, used to match this component with an existing {@link Hook}
 * @property {import("vue").Component} component - Vue Component to show in udata-front
 * @property {string} [module] module - Udata module registering this component, logged before the component is used
 * * @property {string} [name] - Component name, logged before the component is used
 */

/** @typedef {Object<string, Array<Component>>} Components - see {@link Component} */
/** @typedef {Array<Hook>} Hooks - see {@link Hook} */

/**
 * @typedef {object} UdataFrontNamespace
 * @property {Hooks} hooks - Hooks defined for this udata-front instance (see {@link Hook})
 * @property {Components} components - Key-value pair matching components (see {@link Component}) with hooks (see {@link Hook})
*/

/** @type {UdataFrontNamespace} */
const udata_front = {
  hooks: [],
  components: {},
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
 * @callback RegisterHook
 * @param {string} name - Name of the {@link Hook}
 * @param {string} [module] - Udata module, logged when the hook is called
 * @returns {Hook}
 */

/** @type {RegisterHook} */
export function registerHook(name, module) {
  const hook = {
    name,
    module,
  };
  udata_front.hooks.push(hook);
  return hook;
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
  return udata_front.components[name];
}

/** @returns {Hooks} */
export function getRegisteredHooks() {
  return udata_front.hooks;
}

globalThis.udata_front = udata_front;
