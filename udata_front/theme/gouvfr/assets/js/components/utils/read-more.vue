<!--
---
name: Read More
category: 5 - Interactions
---

# Read More

A very simple component that display its content up to a maximum height and then add a "read more" link.

-->

<template>
  <div class="relative">
    <div ref="container" class="read-more" :class="{expand: expanded}" :style="{height: containerHeight + 'px'}">
      <slot></slot>
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
import { defineComponent, onMounted, ref } from "vue";
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
    const container = ref(null);

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

    const updateReadMoreHeight = () => {
      let contentHeight = Array.from(container.value?.children || [])
      .map(getHeight)
      .reduce((total, height) => total + height, 0)
      containerHeight.value = getDefaultHeight();
      readMoreRequired.value = contentHeight > containerHeight.value;
      if(!readMoreRequired.value) {
        containerHeight.value = contentHeight;
      }
    }

    const toggle = () => {
      if(!container.value) {
        return;
      }
      const divStyler = styler(container.value);
      if (expanded.value) {
        tween({
          from: { height: container.value.scrollHeight },
          to: { height: getDefaultHeight() },
          duration: 300,
          ease: easing.anticipate,
        }).start({
          update: divStyler.set,
          complete: () => container.value?.scrollIntoView({ behavior: "smooth" }),
        });
      } else {
        tween({
          from: { height: getDefaultHeight() },
          to: { height: container.value.scrollHeight },
          duration: 300,
          ease: easing.anticipate,
        }).start({
          update: divStyler.set,
          complete: () => divStyler.set({ height: "auto" }),
        });
      }
      expanded.value = !expanded.value;
    };

    onMounted(() => {
      updateReadMoreHeight();
      setTimeout(() => updateReadMoreHeight(), 500);
      document.querySelectorAll(".read-more details").forEach(
        (detail) => { detail.addEventListener("toggle", updateReadMoreHeight); }
      )
    });

    return {
      containerHeight,
      expanded,
      readMoreRequired,
      container,
      toggle,
    }
  }
});
</script>
