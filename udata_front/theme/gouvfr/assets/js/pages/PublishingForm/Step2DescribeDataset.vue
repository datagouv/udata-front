<template>
<div class="fr-container">
    <Stepper :steps="steps" :currentStep="1"/>
    <div class="fr-grid-row">
      <Sidemenu
        class="fr-col-12 fr-col-md-5"
        :buttonText="$t('Help')"
        :onRight="true"
        >
          <template #title>
            <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
            {{ $t('Help') }}
          </template>
          <ul class="fr-sidemenu__list">
            <li class="fr-sidemenu__item fr-sidemenu__item--active">
              <a
                class="fr-sidemenu__link"
                href="#"
                target="_self"
                aria-current="page"
                >Accès direct</a
              >
            </li>
            <li class="fr-sidemenu__item">
              <a class="fr-sidemenu__link" href="#" target="_self"
                >Accès direct</a
              >
            </li>
            <li class="fr-sidemenu__item">
              <a class="fr-sidemenu__link" href="#" target="_self"
                >Accès direct</a
              >
            </li>
            <li class="fr-sidemenu__item">
              <a class="fr-sidemenu__link" href="#" target="_self"
                >Accès direct</a
              >
            </li>
            <li class="fr-sidemenu__item">
              <a class="fr-sidemenu__link" href="#" target="_self"
                >Accès direct</a
              >
            </li>
            <li class="fr-sidemenu__item">
              <a class="fr-sidemenu__link" href="#" target="_self"
                >Accès direct</a
              >
            </li>
            <li class="fr-sidemenu__item">
              <a class="fr-sidemenu__link" href="#" target="_self"
                >Accès direct</a
              >
            </li>
            <li class="fr-sidemenu__item">
              <a class="fr-sidemenu__link" href="#" target="_self"
                >Accès direct</a
              >
            </li>
            <li class="fr-sidemenu__item">
              <a class="fr-sidemenu__link" href="#" target="_self"
                >Accès direct</a
              >
            </li>
          </ul>
      </Sidemenu>
      <div class="fr-col-12 fr-col-md-7">
        <Container>
          <h1 class="subtitle subtitle--uppercase">
            {{ $t("Dataset description") }}
          </h1>
        </Container>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Container from '../../components/Ui/Container/Container.vue';
import Sidemenu from '../../components/Sidemenu/Sidemenu.vue';
import Stepper from '../../components/Form/Stepper/Stepper.vue';
import Well from '../../components/Ui/Well/Well.vue';

export default defineComponent({
  components: { Container, Stepper, Well, Sidemenu },
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
