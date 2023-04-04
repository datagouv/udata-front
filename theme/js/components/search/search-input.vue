<!--
---
name: Input
category: Search
---

# Search input

It's an input that calls the emit `change` on each change.
You can also pass it a `value` prop that will populate the field.
-->

<template>
  <section class="fr-search-bar fr-search-bar--lg w-100">
    <label class="fr-label" :for="id">
       {{ $t("Search") }}
   </label>
    <input
      :id="id"
      type="search"
      name="q"
      :value="queryString"
      @input="onInput"
      @keydown.delete="onDelete"
      ref="input"
      class="fr-input"
      :aria-label="placeholder || $t('Search...')"
      :placeholder="placeholder || $t('Search...')"
      data-cy="search-input"
    />
    <button class="fr-btn" type="submit">
      {{ $t('Search') }}
    </button>
  </section>
</template>

<script>
import { defineComponent, nextTick, onMounted, ref, watchEffect } from "vue";
import useUid from "../../composables/useUid";

export default defineComponent({
  emits: ['change'],
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  setup(props, {emit}) {
    const { id } = useUid('search-input');

    const queryString = ref(props.value);

    /** @type {import("vue").Ref<HTMLInputElement | null>} */
    const input = ref(null);

    const focus = () => {
      input.value?.focus({
        preventScroll: true,
      });
    }

    const onDelete = () => {
      if (queryString.value === ""){
        emit("change", queryString.value);
      }
    };

    const onInput = (/** @type {InputEvent} **/ e) => {
      const target = /** @type {HTMLInputElement} **/(e.target);
      emit("change", target.value);
    };

    onMounted(async () => {
      await nextTick();
      focus();
    });

    watchEffect(() => {
      queryString.value = props.value;
    });

    return {
      id,
      input,
      onDelete,
      onInput,
      queryString,
    };
  }
});
</script>
