<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="2"/>
    <Container>
      <Well
        color="blue-cumulus"
        weight="regular"
        class="fr-mb-2v"
      >
        <div class="fr-grid-row">
          <div class="fr-col-auto fr-mr-3v">
            <img :src="successIcon" alt="" />
          </div>
          <div class="fr-col">
            <p class="fr-m-0 fr-text--bold">{{ $t('Your reuse is created !') }}</p>
            <p class="fr-m-0 fr-text--xs">{{ $t('You can now publish it or save it as a draft.') }}</p>
          </div>
        </div>
      </Well>
      <ul ref="listRef" class="fr-grid-row fr-grid-row--gutters fr-mb-2v">
        <li class="fr-col-12 fr-col-md-4">
          <Loader style="background-color: #FAFAFA" />
        </li>
        <li class="fr-col-12 fr-col-md-4">
          <ReuseCard :reuse="reuse" />
        </li>
        <li class="fr-col-12 fr-col-md-4">
          <Loader style="background-color: #FAFAFA"/>
        </li>
      </ul>
      <div class="fr-grid-row justify-between">
        <a
          :href="feedbackUrl"
          class="fr-btn fr-btn--tertiary-no-outline fr-btn--secondary-grey-500 fr-btn--icon-left fr-icon-lightbulb-line"
        >
          {{ $t('Give us your feedback on the publishing form') }}
        </a>
        <div class="fr-grid-row fr-grid-row--right">
          <a :href="redirectDraftUrl" class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-mr-3v">
            {{ $t("Save as draft") }}
          </a>
          <button @click="submit" class="fr-btn">
            {{ $t("Publish the reuse") }}
          </button>
        </div>
      </div>
    </Container>
  </div>
</template>
  
<script setup lang="ts">
import { reactive } from 'vue';
import Container from '../../components/Ui/Container/Container.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Well from "../../components/Ui/Well/Well.vue";
import successIcon from "../../../../templates/svg/illustrations/success.svg";
import ReuseCard from '../../components/Reuse/Reuse.vue';
import Loader from '../../components/Reuse/ReuseLoader.vue';
  
const props = defineProps<{
  feedbackUrl: string,
  redirectDraftUrl: string,
  originalReuse: Reuse,
  steps: Array<any>,
}>();


const reuse = reactive({...props.originalReuse, private: false});
const submit = () => {
  emit("redirectToPublicUrl");
};

</script>
  