<template>
  <div class="rangepicker fr-select" :class="{'rangepicker--selected': start}">
    <div v-show="selectorShown === selectorShownStart">
      <p class="rangepicker__hint fr-m-0">{{$t('Select lower bound:')}}</p>
      <Datepicker
        v-model="start"
        :upperLimit="end"
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
      <template v-if="!start">{{$t('from dd/mm/yyyy to dd/mm/yyyy')}}</template>
      <template v-else>
        {{formatDate(start, formatTemplate)}}<template v-if="end">–{{formatDate(end, formatTemplate)}}</template>
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
import { lang } from "../../config";
import { getDatepickerLocale } from "../../i18n";
import Datepicker from "vue3-datepicker";
import { format } from "date-fns/esm";
import { defineComponent, ref, watch } from "vue";
import { formatDate } from "@datagouv/components/ts";
import { templateRef } from "@vueuse/core";

export default defineComponent({
  components: {
    Datepicker,
  },
  emits: ["change", "update:modelValue"],
  props: {
    modelValue: {
      /** @type {import("vue").PropType<{start: Date | null, end: Date | null}>} */
      type: Object,
      default: () => {return {start: null, end: null}},
    },
  },
  setup(props, { emit }) {
    /** @type {import("vue").Ref<Date | null>} */
    const start = ref(props.modelValue.start);

    /** @type {import("vue").Ref<Date | null>} */
    const end = ref(props.modelValue.end);

    /** @type {Readonly<import("vue").Ref<InstanceType<typeof Datepicker> | null>>} */
    const startRef = templateRef("startRef");

    /** @type {Readonly<import("vue").Ref<InstanceType<typeof Datepicker> | null>>} */
    const endRef = templateRef("endRef");

    /** @type {import("vue").Ref<string | null>} */
    const selectorShown = ref(null);

    const selectorShownStart = "START";
    const selectorShownEnd = "END";

    /**
     * Format for dayjs
     * L is for localized DD/MM/YYYY
     */
    const formatTemplate = 'L';

    watch([start, end], () => {
      /** @type {{start: string, end: string} | {start: null, end: null}} */
      let value = {
        start: null,
        end: null,
      };

      if (start.value && end.value) {
        value = {
          start: format(start.value, "yyyy-MM-dd"),
          end: format(end.value, "yyyy-MM-dd"),
        }
      }

      emit('update:modelValue', value);
      emit('change', value);
    });

    const clear = () => {
      start.value = null;
      end.value = null;
    };

    /**
     *
     * @param {Readonly<import("vue").Ref<InstanceType<typeof Datepicker> | null>>} selectorRef
     */
    const showSelector = (selectorRef) => {
      if(selectorRef.value) {
        selectorRef.value.renderView(selectorRef.value.initialView);
      }
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
      showStartSelector,
      showEndSelector,
      hideSelector,
      selectorShown,
      selectorShownStart,
      selectorShownEnd,
      locale: getDatepickerLocale(lang),
      clear,
      formatDate,
      formatTemplate,
    }
  },
});
</script>
