import type { Component as VueComponent } from "vue";
import type { DefineLocaleMessage, Locale } from "vue-i18n"

export type Component = {
  hook: string;
  component: VueComponent;
  module?: string;
  name?: string;
}

export type Messages = Record<Locale, DefineLocaleMessage>;

export type UdataFrontTranslation = {
  messages: Messages;
  module?: string;
}

export type Components = Record<string, Array<Component>>;
export type UdataFrontTranslations = Array<UdataFrontTranslation>;

export type UdataFrontNamespace = {
  components: Components;
  translations: UdataFrontTranslations;
}

const udata_front: UdataFrontNamespace = globalThis.udata_front ?? {
  components: {},
  translations: [],
}

export function reset() {
  udata_front.components = {};
  udata_front.translations = [];
}

export function registerComponent(hook: string, component: VueComponent, module?: string, name?: string): Component {
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

export function registerTranslation(messages: Messages, module?: string): UdataFrontTranslation {
  const translation = {
    messages,
    module,
  };
  udata_front.translations.push(translation);
  return translation;
}

export function getRegisteredComponents() {
  return udata_front.components;
}

export function getRegisteredComponentsForHook(name: string) {
  return udata_front.components[name] ?? [];
}

export function getRegisteredTranslations() {
  return udata_front.translations;
}

globalThis.udata_front = udata_front;
