<template>
  <div
    class="border border-default-grey rounded-xxs fr-p-3w fr-grid-row flex-direction-column"
    :class="{'h-100': stretchHeight}"
  >
    <div class="fr-col fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-auto">
        <img :src="icon" alt="" />
      </div>
      <div class="fr-col fr-grid-row flex-direction-column justify-between">
        <div>
          <component :is="heading" class="fr--h5 fr-m-0">{{ title }}</component>
          <p class="fr-my-1w">{{ content }}</p>
        </div>
        <div class="fr-grid-row" :class="alignment">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { getMainAxisAlignment } from '../../../dsfr';

export default defineComponent({
  props: {
    actionsAlignment: {
      type: String,
      default: "start",
    },
    content: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      default: "h2"
    },
    icon: {
      type: String,
      required: true,
    },
    stretchHeight: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const alignment = computed(() => `fr-grid-row--${getMainAxisAlignment(props.actionsAlignment)}`);
    return {
      alignment,
    }
  }
});
</script>
