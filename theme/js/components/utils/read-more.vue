<template>
  <div ref="container" class="read-more" :class="{expand: expanded}">
    <slot></slot>
    <a @click="toggle" v-if="readMoreRequired" class="read-more-link">
      <template v-if="expanded"> {{ $t("Read less") }}</template>
      <template v-else>{{ $t("Read more") }}&hellip;</template>
    </a>
  </div>
</template>

<script>

function getHeight(elt) {
  return parseFloat(getComputedStyle(elt).height)
}

export default {
  name: "read-more",
  data() {
    return {
      expanded: false,
      readMoreRequired: false,
    }
  },
  mounted() {
    let contentHeight = Array.from(this.$refs.container.children)
      .map(getHeight)
      .reduce((total, height) => total += height, 0)
    const style = getComputedStyle(this.$refs.container);
    this.readMoreRequired = contentHeight > parseFloat(style.maxHeight);
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    }
  }
}
</script>
