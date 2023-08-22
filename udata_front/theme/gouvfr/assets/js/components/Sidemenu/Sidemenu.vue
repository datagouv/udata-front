<template>
  <div :class="{'order-md-2': onRight}" class="fr-mb-2w fr-mb-md-0">
    <nav class="fr-sidemenu" :class="{'fr-sidemenu--right': onRight, 'fr-sidemenu--no-border': !showBorder, 'fr-sidemenu--sticky': fixed}" :aria-labelledby="titleId">
      <div class="fr-sidemenu__inner">
        <button
          class="fr-sidemenu__btn"
          hidden
          :aria-controls="wrapperId"
          aria-expanded="false"
        >
          {{ buttonText }}
        </button>
        <div class="fr-collapse" :id="wrapperId">
          <div class="fr-sidemenu__title fr-text--sm" :id="titleId">
            <slot name="title"></slot>
          </div>
          <slot></slot>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import useUid from "../../composables/useUid";

export default defineComponent({
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
    showBorder: {
      type: Boolean,
      default: true,
    },
    onRight: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const {id: titleId } = useUid("sidemenu-title");
    const {id: wrapperId } = useUid("sidemenu-wrapper");
    return {
      titleId,
      wrapperId,
    };
  }
});
</script>
