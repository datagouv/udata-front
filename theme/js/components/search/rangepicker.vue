<!--
---
name: Rangepicker
category: Search
---

# Rangepicker

Used to pick dates (the calendar kind, unfortunately) for temporal coverage selection.
Supports getting passed a value in the `value` prop (useful to pass value from URL), will call onChange fn on change.

Value format is composed of the two dates forming a range (starting date d1 and ending date d2) as such :

d1.yyyy-d1.mm-d1.dd-d2.yyyy-d2.mm-d2.dd

-->

<template>
  <div class="rangepicker fr-select" :class="{'rangepicker--selected': start}">
    <div v-show="selectorShown === selectorShownStart">
      <p class="rangepicker__hint fr-m-0">{{$t('Select lower bound:')}}</p>
      <Datepicker
        v-model="start"
        :upperLimit="end ?? tomorrow"
        :locale="locale"
        @update:modelValue="showEndSelector"
        ref="startRef"
      />
    </div>
    <div v-show="selectorShown === selectorShownEnd">
    <p class="rangepicker__hint fr-m-0">{{$t('Select upper bound:')}}</p>
      <Datepicker
        v-model="end"
        :lowerLimit="start"
        :upperLimit="tomorrow"
        :locale="locale"
        @update:modelValue="hideSelector"
        ref="endRef"
      />
    </div>
    <button
      class="rangepicker__button w-100 text-align-left"
      @click.prevent="showStartSelector"
      v-if="selectorShown === null"
    >
      <template v-if="!start">{{$t('Publication date')}}</template>
      <template v-else>
        {{filters.formatDate(start, formatTemplate)}}<template v-if="end">–{{filters.formatDate(end, formatTemplate)}}</template>
        <button
          class="fr-fi-close-line clear"
          @click.stop="clear"
          v-if="start"
        ></button>
      </template>
      </button>
  </div>
</template>

<script>
import config from "../../config";
import Datepicker from "vue3-datepicker";
import "vue3-datepicker/dist/vue3-datepicker.css";
import { add, format } from "date-fns";
import fr from "date-fns/locale/fr";
import en from "date-fns/locale/en-GB";
import es from "date-fns/locale/es";
import { defineComponent, ref, watch } from "vue";
import { filters } from "../../plugins/filters";

const locales = { fr, en, es };

export default defineComponent({
  components: {
    Datepicker,
  },
  props: {
    value: String,
    onChange: Function,
  },
  setup(props) {
    const start = ref(null);
    const end = ref(null);
    const tomorrow = add(new Date(), {days: 1});

    const startRef = ref(null);
    const endRef = ref(null);

    const selectorShown = ref(null);
    const selectorShownStart = "START";
    const selectorShownEnd = "END";

    /**
     * Format for dayjs 
     * L is for localized DD/MM/YYYY
     */
    const formatTemplate = 'L';

    if (props.value) {
      start.value = new Date(props.value.slice(0, 10));
      end.value = new Date(props.value.slice(10));
    }

    watch(() => props.value, value => {
      if (typeof value === "undefined") {
        start.value = null;
        end.value = null;
      }
    });

    watch([start, end], () => {
      if (!props.onChange) return;

      let value = null;

      if (start.value && end.value)
        value =
          format(start.value, "yyyy-MM-dd") +
          "-" +
          format(end.value, "yyyy-MM-dd");

      return props.onChange(value);
    });

    const clear = () => {
      start.value = null;
      end.value = null;
    };

    const showSelector = (selectorRef) => {
      selectorRef.value.renderView(selectorRef.value.initialView);
    }

    const showStartSelector = () => {
      selectorShown.value = selectorShownStart;
      showSelector(startRef);
    }

    const showEndSelector = () => {
      selectorShown.value = selectorShownEnd;
      showSelector(endRef);
    }

    const hideSelector = () => {
      selectorShown.value = null;
    }

    return {
      start,
      end,
      startRef,
      endRef,
      showStartSelector,
      showEndSelector,
      hideSelector,
      selectorShown,
      selectorShownStart,
      selectorShownEnd,
      locale: locales[config.lang],
      clear,
      filters,
      formatTemplate,
      tomorrow,
    }
  },
});
</script>
