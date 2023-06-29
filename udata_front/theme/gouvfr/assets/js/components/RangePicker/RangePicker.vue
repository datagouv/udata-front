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
import config from "../../config";
import Datepicker from "vue3-datepicker";
import { add, format } from "date-fns";
import fr from "date-fns/locale/fr";
import en from "date-fns/locale/en-GB";
import es from "date-fns/locale/es";
import { defineComponent, ref, watch } from "vue";
import { formatDate } from "../../helpers";

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
    /** @type {import("vue").Ref<Date | null>} */
    const start = ref(null);

    /** @type {import("vue").Ref<Date | null>} */
    const end = ref(null);

    /** @type {Date} */
    const tomorrow = add(new Date(), {days: 1});

    const startRef = ref(null);
    const endRef = ref(null);

    /** @type {import("vue").Ref<string | null>} */
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
      formatDate,
      formatTemplate,
      tomorrow,
    }
  },
});
</script>
