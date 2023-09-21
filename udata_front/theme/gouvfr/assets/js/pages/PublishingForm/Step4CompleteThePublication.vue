<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="3"/>
    <Container>
      <Well
        color="blue-cumulus"
        weight="regular"
        class="fr-mb-n3v"
      >
        <div class="fr-grid-row">
          <div class="fr-col-auto fr-mr-3v">
            <img :src="successIcon" alt="" />
          </div>
          <div class="fr-col">
            <p class="fr-m-0 fr-text--bold">{{ $t('Your dataset is created !') }}</p>
            <p class="fr-m-0 fr-text--xs">{{ $t('You can now publish it or save it as a draft.') }}</p>
          </div>
        </div>
      </Well>
      <CardLg v-bind="originalDataset" :showMetrics="false" />
      <div class="fr-grid-row justify-between">
        <a
            :href="publishing_form_feedback_url"
            class="fr-btn fr-btn--tertiary-no-outline fr-btn--secondary-grey-500 fr-btn--icon-left fr-icon-lightbulb-line"
        >
            {{ $t('Give us your feedback on the publishing form') }}
        </a>
        <div class="fr-grid-row fr-grid-row--right">
          <button class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-mr-3v" @click="submit">
            {{ $t("Save as draft") }}
          </button>
          <button class="fr-btn" @click="submit">
            {{ $t("Publish the dataset") }}
          </button>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import Container from '../../components/Ui/Container/Container.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Well from "../../components/Ui/Well/Well.vue";
import CardLg from '../../components/dataset/card-lg.vue';
import { publishing_form_feedback_url } from '../../config';
import successIcon from "svg/illustrations/success.svg";

export default defineComponent({
  components: { Container, Stepper, Well, CardLg },
  emits: ["next"],
  props: {
    originalDataset: {
      type: Object,
      required: true
    },
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const dataset = reactive({...props.originalDataset});
    const submit = () => {

    };

    return {
      dataset,
      publishing_form_feedback_url,
      submit,
      successIcon,
    };
  },
});
</script>
