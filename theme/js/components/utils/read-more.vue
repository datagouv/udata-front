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
export default {
  name: "read-more",
  data() {
    return {
      expanded: false,
      readMoreRequired: false,
    }
  },
  mounted() {
    const style = getComputedStyle(this.$refs.container)
    this.readMoreRequired = parseFloat(style.height) > parseFloat(style.maxHeight)
  },
  methods: {
    toggle() {
       this.expanded = !this.expanded
    }
  }
}
</script>

<style scoped>

</style>
