<!--
---
name: Read More
category: 5 - Interactions
---

# Read More

A very simple component that display its content up to a maximum height and then add a "read more" link.

-->

<template>
  <div ref="container" class="read-more" :class="{expand: expanded}" :style="{height: containerHeight + 'px'}">
    <slot></slot>
    <div class="read-more__bottom">
      <button role="button" class="fr-btn fr-btn--tertiary-no-outline" @click.prevent="toggle" v-if="readMoreRequired">
        <template v-if="expanded"> {{ $t("Read less") }}</template>
        <template v-else>{{ $t("Read more") }}</template>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { easing, tween, styler } from "popmotion";
import { number } from "@intlify/core-base";

function getHeight(elt) {
  const style = getComputedStyle(elt);
  return parseFloat(style.getPropertyValue('height')) +
    parseFloat(style.getPropertyValue('margin-top')) +
    parseFloat(style.getPropertyValue('margin-bottom'));
}

const DEFAULT_HEIGHT = 284;

export default defineComponent({
  name: "read-more",
  data() {
    return {
      containerHeight: this.defaultHeight,
      expanded: false,
      readMoreRequired: false,
    }
  },
  props: {
    maxHeight: {
      type: String,
      default: ""
    }
  },
  computed: {
    defaultHeight() {
      const elementMaxHeight = document.querySelector(`[data-read-more-max-height="${this.maxHeight}"]`);
      if(!elementMaxHeight) {
        return DEFAULT_HEIGHT
      }
      return Array.from(elementMaxHeight.children)
      .map(getHeight)
      .reduce((total, height) => total + height, 0);
    },
  },
  mounted() {
    this.updateReadMoreHeight();
    setTimeout(() => this.updateReadMoreHeight(), 500);
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
      const divStyler = styler(this.$refs.container);
      if (this.expanded) {
            tween({
              from: { height: this.defaultHeight },
              to: { height: this.$refs.container.scrollHeight },
              duration: 300,
              ease: easing.anticipate,
            }).start({
              update: divStyler.set,
              complete: () => divStyler.set({ height: "auto" }),
            });
          } else {
            tween({
              from: { height: this.$refs.container.scrollHeight },
              to: { height: this.defaultHeight },
              duration: 300,
              ease: easing.anticipate,
            }).start(divStyler.set);
          }
    },
    updateReadMoreHeight() {
      let contentHeight = Array.from(this.$refs.container.children)
      .map(getHeight)
      .reduce((total, height) => total + height, 0)
      this.containerHeight = this.defaultHeight;
      console.log(this.containerHeight);
      this.readMoreRequired = contentHeight > this.containerHeight;
      if(!this.readMoreRequired) {
        this.containerHeight = contentHeight;
      }
    }
  }
});
</script>
