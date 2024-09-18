<template>
  <div
    class="rounded-xxs fr-p-3w fr-grid-row flex-direction-column"
    :class="{'h-100': stretchHeight, [type]: type, 'border border-default-grey': !isPrimary }"
  >
    <div class="fr-col fr-grid-row fr-grid-row--gutters" :class="{'text-blue-400': isPrimary}">
      <div class="fr-col-auto">
        <img class="w-100" :src="icon" alt="" />
      </div>
      <div class="fr-col-12 fr-col-sm fr-grid-row flex-direction-column justify-between">
        <div class="fr-mb-1w">
          <component
            :is="heading"
            class="fr-m-0 fr-mb-1w"
            :class="{'fr-text--bold fr-text--md': isPrimary, 'fr--h5': !isPrimary}"
          >
            {{ title }}
          </component>
          <p class="fr-my-1w" v-if="content">{{ content }}</p>
          <slot v-else></slot>
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
      type: /** @type {import("vue").PropType<import("../../../types").AxisAlignment>} */ (String),
      default: "",
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
    },
    content: {
      type: String,
    },
    type: {
      type: String,
      default: "default"
    }
  },
  setup(props) {
    const alignment = computed(() => `fr-grid-row--${getMainAxisAlignment(props.actionsAlignment)}`);
    const type = computed(() => props.type === "primary" ? "bg-contrast-blue-cumulus" : "bg-white");
    const isPrimary = computed(() => props.type === "primary");
    const isDefault = computed(() => props.type === "default");
    return {
      alignment,
      isDefault,
      isPrimary,
      type,
    };
  },
});
</script>
