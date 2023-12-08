import { beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";

import { registerComponent, registerTranslation, getRegisteredComponents, getRegisteredComponentsForHook, getRegisteredTranslations, reset } from "../src/index";

const hook = "someHook";
const module = "someModule";
const name = "someName";

beforeEach(function () {
  vi.stubGlobal('udata_front', null);

  return function () {
    vi.unstubAllGlobals();
    reset();
  }
});

describe("registerComponent", function () {
  const component = defineComponent({});
  it('returns a udata front component with required options', function () {
    const registeredComponent = registerComponent(hook, component);
    expect(registeredComponent).toHaveProperty("hook", hook);
    expect(registeredComponent).toHaveProperty("component", component);
    expect(registeredComponent).toHaveProperty("module", undefined);
    expect(registeredComponent).toHaveProperty("name", undefined);
  });

  it('returns a udata front component with optional module', function () {
    const registeredComponent = registerComponent(hook, component, module);
    expect(registeredComponent).toHaveProperty("hook", hook);
    expect(registeredComponent).toHaveProperty("component", component);
    expect(registeredComponent).toHaveProperty("module", module);
    expect(registeredComponent).toHaveProperty("name", undefined);
  });

  it('returns a udata front component with optional name', function () {
    const registeredComponent = registerComponent(hook, component, module, name);
    expect(registeredComponent).toHaveProperty("hook", hook);
    expect(registeredComponent).toHaveProperty("component", component);
    expect(registeredComponent).toHaveProperty("module", module);
    expect(registeredComponent).toHaveProperty("name", name);
  });
});

describe("registerTranslation", function () {
  const messages = {};
  it("returns registered translations", function () {
    const registeredTranslation = registerTranslation(messages);
    expect(registeredTranslation).toHaveProperty("messages", messages);
    expect(registeredTranslation).toHaveProperty("module", undefined);
  });

  it("returns registered translations with module name", function () {
    const registeredTranslation = registerTranslation(messages, module);
    expect(registeredTranslation).toHaveProperty("messages", messages);
    expect(registeredTranslation).toHaveProperty("module", module);
  });
});

describe("getRegisteredComponents", function () {
  it("returns an empty object", function () {
    const components = getRegisteredComponents();
    expect(components).toEqual({});
  });

  it("returns an objet with a key for a hook", function () {
    const component = defineComponent({});
    const registeredComponent = registerComponent(hook, component);

    const components = getRegisteredComponents();
    expect(components).toEqual({[hook]: [registeredComponent]});
  });

  it("returns an objet with a key for each hook", function () {
    const component = defineComponent({});
    const registeredComponent = registerComponent(hook, component);

    const anotherHook = "someOtherHook";
    const anotherComponent = defineComponent({});
    const anotherRegisteredComponent = registerComponent(anotherHook, anotherComponent);

    const components = getRegisteredComponents();
    expect(components).toEqual({[hook]: [registeredComponent], [anotherHook]: [anotherRegisteredComponent]});
  });

  it("returns an objet with a single key per hook", function () {
    const component = defineComponent({});
    const registeredComponent = registerComponent(hook, component);

    const anotherComponent = defineComponent({});
    const anotherRegisteredComponent = registerComponent(hook, anotherComponent);

    const components = getRegisteredComponents();
    expect(components).toEqual({[hook]: [registeredComponent, anotherRegisteredComponent]});
  });
});

describe("getRegisteredComponentsForHook", function () {
  it("returns an empty array", function () {
    const components = getRegisteredComponentsForHook(hook);
    expect(components).toEqual([]);
  });

  it("returns an array with a key for a component", function () {
    const component = defineComponent({});
    const registeredComponent = registerComponent(hook, component);

    const components = getRegisteredComponentsForHook(hook);
    expect(components).toEqual([registeredComponent]);
  });

  it("doesn't return a component for another hook", function () {
    const anotherHook = "someOtherHook";
    const anotherComponent = defineComponent({});
    registerComponent(anotherHook, anotherComponent);

    const components = getRegisteredComponentsForHook(hook);
    expect(components).toEqual([]);
  });

  it("returns an objet with a single key per hook", function () {
    const component = defineComponent({});
    const registeredComponent = registerComponent(hook, component);

    const anotherComponent = defineComponent({});
    const anotherRegisteredComponent = registerComponent(hook, anotherComponent);

    const components = getRegisteredComponentsForHook(hook);
    expect(components).toEqual([registeredComponent, anotherRegisteredComponent]);
  });
});

describe("getRegisteredTranslations", function () {
  const messages = {};
  it("returns an empty array", function () {
    const translations = getRegisteredTranslations();
    expect(translations).toEqual([]);
  });

  it("returns an array with a translation", function () {
    const registeredTranslation = registerTranslation(messages);

    const translations = getRegisteredTranslations();
    expect(translations).toEqual([registeredTranslation]);
  });

  it("returns an array with multiple translations", function () {
    const anotherMessages = {"fr": {}};
    const registeredTranslation = registerTranslation(messages);
    const anotherRegisteredTranslation = registerTranslation(anotherMessages);

    const translations = getRegisteredTranslations();
    expect(translations).toEqual([registeredTranslation, anotherRegisteredTranslation]);
  });
});
