<template>
  <div class="fr-container">
    <Stepper :steps="steps" :currentStep="0"/>
    <Container>
      <h1 class="subtitle subtitle--uppercase">
        {{ $t("Publishing type") }}
      </h1>
      <Well weight="regular">
        <i18n-t
          keypath="If you want to do tests, use {demo_server}."
          scope="global"
        >
          <template #demo_server>
            <a :href="demo_server_url">{{ demo_server_name }}</a>
          </template>
        </i18n-t>
      </Well>
    </Container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Container from '../../components/Ui/Container/Container.vue';
import Well from '../../components/Ui/Well/Well.vue';
import { demo_server_name, demo_server_url } from "../../config";

export default defineComponent({
  components: { Container, Stepper, Well },
  props: {
    steps: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    return {
      demo_server_name,
      demo_server_url,
    }
  },

});
</script>
