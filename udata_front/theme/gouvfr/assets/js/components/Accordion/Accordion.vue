<template>
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button
        class="fr-accordion__btn"
        aria-expanded="false"
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
    title: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const { id } = useUid("accordion");

    return {
      id,
    }
  },
});
</script>
