<template>
  <div class="relative">
    <div class="read-more" ref="readMoreRef" :class="{expand: expanded}" :style="{height: containerHeight + 'px'}">
      <div ref="containerRef">
        <slot></slot>
      </div>
    </div>
    <div class="read-more__bottom" @click.prevent="toggle" v-if="readMoreRequired">
      <button role="button" class="fr-btn fr-btn--tertiary-no-outline" @click.prevent.stop="toggle">
        <template v-if="expanded"> {{ $t("Read less") }}</template>
        <template v-else>{{ $t("Read more") }}</template>
      </button>
    </div>
  </div>
</template>

<script>
import { templateRef, useElementSize } from "@vueuse/core";
import { defineComponent, ref, watch } from "vue";
import { easing, tween, styler } from "popmotion";

const DEFAULT_HEIGHT = 284;

export default defineComponent({
  name: "read-more",
  props: {
    maxHeight: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const expanded = ref(false);
    const readMoreRequired = ref(false);

    /** @type {import("vue").Ref<HTMLElement | null>} */
    const containerRef = templateRef("containerRef");

    /** @type {import("vue").Ref<HTMLElement | null>} */
    const readMoreRef = templateRef("readMoreRef");

    const { height } = useElementSize(containerRef);

    /**
     *
     * @param {Element} elt
     */
    const getHeight = (elt) => {
      const style = getComputedStyle(elt);
      return parseFloat(style.getPropertyValue('height')) +
        parseFloat(style.getPropertyValue('margin-top')) +
        parseFloat(style.getPropertyValue('margin-bottom'));
    }

    const getDefaultHeight = () => {
      const elementMaxHeight = document.querySelector(`[data-read-more-max-height="${props.maxHeight}"]`);
      if(!elementMaxHeight) {
        return DEFAULT_HEIGHT;
      }
      return Array.from(elementMaxHeight.children)
        .map(getHeight)
        .reduce((total, height) => total + height, 0);
    };

    const containerHeight = ref(DEFAULT_HEIGHT);

    /**
     *
     * @param {number} height
     */
    const updateReadMoreHeight = (height) => {
      containerHeight.value = getDefaultHeight();
      readMoreRequired.value = height > containerHeight.value;
      if(!readMoreRequired.value) {
        containerHeight.value = height;
      }
    }

    const toggle = () => {
      if(!readMoreRef.value) {
        return;
      }
      const divStyler = styler(readMoreRef.value);
      if (expanded.value) {
        tween({
          from: { height: readMoreRef.value.scrollHeight },
          to: { height: getDefaultHeight() },
          duration: 300,
          ease: easing.anticipate,
        }).start({
          update: divStyler.set,
          complete: () => readMoreRef.value?.scrollIntoView({ behavior: "smooth" }),
        });
      } else {
        tween({
          from: { height: getDefaultHeight() },
          to: { height: readMoreRef.value.scrollHeight },
          duration: 300,
          ease: easing.anticipate,
        }).start({
          update: divStyler.set,
          complete: () => divStyler.set({ height: "auto" }),
        });
      }
      expanded.value = !expanded.value;
    };

    watch(height, updateReadMoreHeight);

    return {
      containerHeight,
      expanded,
      readMoreRequired,
      toggle,
    }
  }
});
</script>
