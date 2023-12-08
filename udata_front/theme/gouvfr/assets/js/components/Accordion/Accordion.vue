<template>
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button
        class="fr-accordion__btn"
        :aria-expanded="opened"
        :aria-controls="id"
      >
        <span v-if="hasState" class="fr-mr-2w" :class="classes" aria-hidden="true"></span>
        {{ title }}
      </button>
    </h3>
    <div
      class="fr-collapse"
      :id="id"
    >
     <slot></slot>
    </div>
  </section>
</template>

<script>
import { computed, defineComponent } from 'vue';
import useUid from '../../composables/useUid';

export default defineComponent({
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    state: {
      type: /** @type {import("vue").PropType<import("../../types").AccordionState>} */(String),
      default: "default"
    },
  },
  setup(props) {
    const { id } = useUid("accordion");
    const hasState = computed(() => props.state !== "default");
    const icon = computed(() => {
      switch(props.state) {
        case "disabled":
          return "fr-icon-subtract-line";
        case "error":
          return "fr-icon-close-line";
        case "info":
          return "fr-icon-info-line";
        case "success":
          return "fr-icon-check-line";
        case "warning":
          return "fr-icon-warning-line";
      }
    });
    const iconColor = computed(() => {
      switch(props.state) {
        case "disabled":
          return "text-disabled-grey";
        case "error":
          return "text-default-error";
        case "info":
          return "text-title-grey";
        case "success":
          return "text-default-success";
        case "warning":
          return "text-default-warning";
      }
    });

    const classes = computed(() => icon.value + " " + iconColor.value);

    return {
      classes,
      hasState,
      icon,
      id: props.id || id,
    }
  },
});
</script>
