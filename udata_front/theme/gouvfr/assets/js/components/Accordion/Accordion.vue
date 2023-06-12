<template>
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button
        class="fr-accordion__btn"
        :aria-expanded="opened"
        :aria-controls="id"
      >
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
import { defineComponent } from 'vue';
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
    }
  },
  setup(props) {
    const { id } = useUid("accordion");

    return {
      id: props.id || id,
    }
  },
});
</script>
