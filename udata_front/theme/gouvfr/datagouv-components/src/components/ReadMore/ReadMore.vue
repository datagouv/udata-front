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
  
<script setup lang="ts">
  import { templateRef, useElementSize } from "@vueuse/core";
  import { ref, watch } from "vue";
  import { easing, tween, styler } from "popmotion";
  type Props = {
    maxHeight?: string;
  };
  const props = withDefaults(defineProps<Props>(), {
    maxHeight: "",
  });
  const DEFAULT_HEIGHT = 284;
  const expanded = ref(false);
  const readMoreRequired = ref(false);
  const containerRef = templateRef<HTMLElement | null>("containerRef");
  const readMoreRef = templateRef<HTMLElement | null>("readMoreRef");
  const { height } = useElementSize(containerRef);
  const containerHeight = ref(DEFAULT_HEIGHT);
  const getHeight = (elt: Element) => {
    const style = getComputedStyle(elt);
    return parseFloat(style.getPropertyValue('height')) +
      parseFloat(style.getPropertyValue('margin-top')) +
      parseFloat(style.getPropertyValue('margin-bottom'));
  };
  const getDefaultHeight = () => {
    const elementMaxHeight = document.querySelector(`[data-read-more-max-height="${props.maxHeight}"]`);
    if(!elementMaxHeight) {
      return DEFAULT_HEIGHT;
    }
    return Array.from(elementMaxHeight.children)
      .map(getHeight)
      .reduce((total, height) => total + height, 0);
  };
  const updateReadMoreHeight = (height: number) => {
    containerHeight.value = getDefaultHeight();
    readMoreRequired.value = height > containerHeight.value;
    if(!readMoreRequired.value) {
      containerHeight.value = height;
    }
  };
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
</script>
