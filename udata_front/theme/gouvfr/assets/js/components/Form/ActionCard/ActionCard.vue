<template>
  <div class="border border-default-grey rounded-xxs fr-p-3w">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-auto">
        <img :src="icon" alt="" />
      </div>
      <div class="fr-col fr-grid-row flex-direction-column justify-between">
        <div>
          <component :is="heading" class="fr--h5 fr-m-0">{{ title }}</component>
          <p class="fr-my-1w">{{ content }}</p>
        </div>
        <div class="fr-grid-row">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
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
    title: {
      type: String,
      required: true,
    }
  }
});
</script>
