<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="0"/>
    <Container>
      <h1 class="subtitle subtitle--uppercase">
        {{ $t("Publishing type") }}
      </h1>
    </Container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Container from '../../components/Ui/Container/Container.vue';

export default defineComponent({
  components: { Container, Stepper },
  props: {
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
  },

});
</script>
