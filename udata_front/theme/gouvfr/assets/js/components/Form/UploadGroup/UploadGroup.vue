<template>
  <div
    class="fr-upload-group"
    :class="containerClass"
  >
    <button
      v-if="type === 'button'"
      class="fr-btn fr-btn--icon-left fr-icon-upload-line"
      :aria-describedby="ariaDescribedBy"
      @click="$emit('click')"
      :disabled="disabled"
      v-bind="$attrs"
    >
      {{ label }}
    </button>
    <div v-else>
      <Container
        color="alt-grey"
        class="fr-grid-row fr-grid-row--middle flex-direction-column border border-default-grey border-dashed text-mention-grey fr-text--bold"
        :class="{'border-plain-error': hasError}"
        ref="dropFilesHereRef"
      >
        {{ $t('Drag and drop files') }}
        <p class="fr-hr-or w-50 text-transform-lowercase fr-text--regular fr-mt-3v">
          <span class="fr-hr-or-text">{{ $t('or') }}</span>
        </p>
        <div class="fr-hidden">
          <label class="fr-label" :for="id">{{ label }}</label>
          <input
            class="fr-upload"
            type="file"
            :id="id"
            :aria-describedby="ariaDescribedBy"
            ref="inputRef"
          />
        </div>
        <button
          @click="open"
          class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500"
          :title="$t('Browse')"
          :aria-controls="id"
        >
          {{ $t('Browse') }}
        </button>
      </Container>
    </div>
    <p :id="hintTextId" class="fr-hint-text fr-mb-1w" v-if="hintText">{{ hintText }}</p>
    <p :id="validTextId" class="fr-valid-text fr-my-0" v-if="isValid">
      {{ validText }}
    </p>
    <p :id="errorTextId" class="fr-error-text fr-my-0" v-else-if="hasError">
      {{ errorText }}
    </p>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { templateRef, useDropZone } from '@vueuse/core';
import useUid from '../../../composables/useUid';
import Container from '../../Ui/Container/Container.vue';
import Required from '../../Ui/Required/Required.vue';

/**
 * @typedef {Object} Option
 * @property {string} label - Label (display) of the option
 * @property {string} value - Value (id) of the option
 * @property {boolean} disabled - if the option is disabled
 * @property {boolean} hidden - if the option is hidden
 * @property {boolean} selected - if the option is selected
 */

export default defineComponent({
  components: { Container, Required },
  emits: ['click', 'change'],
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    hintText: {
      type: String,
      default: "",
    },
    groupClass: {
      type: String,
      default: "",
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "button"
    },
    validText: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const { id } = useUid("upload");

    /** @type {import("vue").Ref<HTMLInputElement | null>} */
    const inputRef = templateRef("inputRef");

    /** @type {import("vue").Ref<HTMLDivElement | null>} */
    const dropFilesHereRef = templateRef("dropFilesHereRef");

    const errorTextId = computed(() => id + "-desc-error");
    const validTextId = computed(() => id + "-desc-valid");
    const hintTextId = computed(() => id + "-desc-hint");
    const ariaDescribedBy = computed(() => {
      let describedBy = "";
      if(props.hintText) {
        describedBy += hintTextId;
      }
      if (props.isValid) {
        describedBy += " " + validTextId;
      }
      else if (props.hasError) {
        describedBy += " " + errorTextId;
      }
      return describedBy;
    });

    const containerClass = computed(() => {
      return {
        [props.groupClass]: true,
        'fr-input-group--disabled': props.disabled,
        'fr-input-group--error': props.hasError,
        'fr-input-group--valid': props.isValid
      };
    });

    const open = () => {
      inputRef.value?.click();
    };

    /**
     *
     * @param {File[] | null} files
     */
     const onDrop = (files) => {
      console.log("drop");
      if(files) {
        emit('change', files);
      }
    }

    useDropZone(dropFilesHereRef, onDrop);

    return {
      ariaDescribedBy,
      containerClass,
      errorTextId,
      hintTextId,
      id,
      open,
      validTextId,
    };
  },
});
</script>
