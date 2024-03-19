<template>
  <div
    class="fr-upload-group"
    :class="containerClass"
  >
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
        <label class="fr-label" :for="id">
          {{ label }}
          <Required :required="required"/>
        </label>
        <input
          class="fr-upload"
          type="file"
          :id="id"
          :aria-describedby="ariaDescribedBy"
          ref="inputRef"
          @change="change"
          :accept="accept"
          :multiple="multiple"
          :required="required"
          :disabled="disabled"
        />
      </div>
      <button
        @click="open"
        :disabled="disabled"
        class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500"
        :title="$t('Browse')"
        :aria-controls="id"
      >
        {{ $t('Browse') }}
      </button>
    </Container>
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
    accept: {
      type: String,
    },
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
    multiple: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false
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
        describedBy += hintTextId.value;
      }
      if (props.isValid) {
        describedBy += " " + validTextId.value;
      }
      else if (props.hasError) {
        describedBy += " " + errorTextId.value;
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
     * Handle and emit file changes
     * @param {File[] | null} files
     */
    const onChange = (files) => {
      emit('change', files);
    }

    /**
     * Handle input file change event
     * @param {Event} event
     */
    const change = (event) => {
      const target = /** @type {HTMLInputElement | null} */ (event.target);
      const files = Array.from(target?.files ?? []);
      if(!props.disabled) {
        onChange(files);
      }
    }

    useDropZone(dropFilesHereRef, onChange);

    return {
      ariaDescribedBy,
      change,
      containerClass,
      errorTextId,
      hintTextId,
      id,
      onChange,
      open,
      validTextId,
    };
  },
});
</script>
