<!--
---
name: Input
category: Search
---

# Search input

It's an input that calls the passed `onChange` function on each change.
You can also pass it a `value` prop that will populate the field.
If the submitUrl prop is passed, it will redirect on Submit.
-->

<template>
  <form :action="submitUrl" @submit="onSubmit" class="fr-col">
    <section class="fr-search-bar">
      <input
        type="search"
        name="q"
        :value="queryString"
        @input="_onChange"
        @keydown.delete="onDelete"
        ref="input"
        class="fr-input"
        :aria-label="placeholder || $t('Search...')"
        :placeholder="placeholder || $t('Search...')"
        data-cy="search-input"
      />
      <button class="fr-btn" :title="$t('Search')" type="submit">
        {{ $t('Search') }}
      </button>
    </section>
  </form>
</template>

<script>
import Icon from "svg/search.svg";
import CloseIcon from "svg/close.svg";
import { defineComponent } from "vue";

export default defineComponent({
  created() {
    this.icon = Icon;
    this.closeIcon = CloseIcon;
    this.queryString = this.value;
  },
  watch: {
    value: function (val) {
      this.queryString = val;
    },
  },
  async mounted() {
    //this.$nextTick doesn't work because of browsers®
    setTimeout(() => this.focus(), 100);
  },
  props: {
    onChange: Function,
    stop: Function,
    value: String,
    placeholder: String,
    submitUrl: String,
  },
  data() {
    return {
      queryString: "",
    };
  },
  methods: {
    _onChange(e) {
      if (this.onChange) this.onChange(e.target.value);
    },
    onDelete() {
      if (this.queryString === "") this.onChange(this.queryString);
    },
    focus() {
      this.$refs.input.focus({
        preventScroll: true,
      });
    },
    onSubmit(event) {
      if (!this.submitUrl) event.preventDefault();
    },
  },
});
</script>
