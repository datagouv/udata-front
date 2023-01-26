import { expectTypeOf, test } from 'vitest';
import { Component } from 'vue';

import { registerComponent, Component as UdataFrontComponent, registerTranslation, getRegisteredComponents, getRegisteredComponentsForHook, getRegisteredTranslations, Translation } from "../src/hook";

test('registerComponent types', () => {
    expectTypeOf(registerComponent).toBeFunction();
    expectTypeOf(registerComponent).parameter(0).toBeString();
    expectTypeOf(registerComponent).parameter(1).toMatchTypeOf<Component>();
    expectTypeOf(registerComponent).parameter(2).toMatchTypeOf<string | undefined>();
    expectTypeOf(registerComponent).parameter(3).toMatchTypeOf<string | undefined>();
    expectTypeOf(registerComponent).returns.toMatchTypeOf<UdataFrontComponent>();
});

test('registerTranslation types', () => {
    expectTypeOf(registerTranslation).toBeFunction();
    expectTypeOf(registerTranslation).parameter(0).toBeObject();
    expectTypeOf(registerTranslation).parameter(1).toMatchTypeOf<string | undefined>();
    expectTypeOf(registerTranslation).returns.toMatchTypeOf<Translation>();
});

test('getRegisteredComponents types', () => {
    expectTypeOf(getRegisteredComponents).toBeFunction();
    expectTypeOf(getRegisteredComponents).returns.toMatchTypeOf<{[x: string]: Array<Component>}>();
});

test('getRegisteredComponentsForHook types', () => {
    expectTypeOf(getRegisteredComponentsForHook).toBeFunction();
    expectTypeOf(getRegisteredComponentsForHook).parameter(0).toBeString();
    expectTypeOf(getRegisteredComponentsForHook).returns.toMatchTypeOf<Array<Component>>();
});

test('getRegisteredTranslations types', () => {
    expectTypeOf(getRegisteredTranslations).toBeFunction();
    expectTypeOf(getRegisteredTranslations).returns.toMatchTypeOf<Array<Translation>>();
});
