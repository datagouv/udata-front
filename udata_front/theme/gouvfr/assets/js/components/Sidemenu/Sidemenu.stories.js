import Sidemenu from './Sidemenu.vue';

export default {
  title: 'Components/Sidemenu',
  component: Sidemenu,
};

const args = {
  buttonText: "View help",
  onRight: false,
};

export const SidemenuOnLeft = {
  render: (args) => ({
    components: { Sidemenu },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row">
                  <Sidemenu class="fr-col-12 fr-col-md-5" v-bind="args">
                    <template v-slot:title>
                      <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
                      Help
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
                          >Accès direct</a>
                      </li>
                    </ul>
                  </Sidemenu>
                  <div class="fr-col-12 fr-col-md-7">
                    <p>Some content</p>
                  </div>
                </div>`,
  }),
  args,
};

export const SidemenuOnRight = {
  render: (args) => ({
    components: { Sidemenu },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row">
                  <Sidemenu class="fr-col-12 fr-col-md-5" v-bind="args">
                    <template v-slot:title>
                      <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
                      Help
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
                          >Accès direct</a>
                      </li>
                    </ul>
                  </Sidemenu>
                  <div class="fr-col-12 fr-col-md-7">
                    <p>Some content</p>
                  </div>
                </div>`,
  }),
  args: {
      ...args,
      onRight: true,
    }
};

export const SidemenuWithoutBorderOnLeft = {
  render: (args) => ({
    components: { Sidemenu },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row bg-grey-50 fr-p-2w">
                  <Sidemenu class="fr-col-12 fr-col-md-5" v-bind="args">
                    <template v-slot:title>
                      <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
                      Help
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
                          >Accès direct</a>
                      </li>
                    </ul>
                  </Sidemenu>
                  <div class="fr-col-12 fr-col-md-7 bg-white fr-p-2w">
                    <p class="fr-m-0">Some content</p>
                  </div>
                </div>`,
  }),
  args: {
    ...args,
    showBorder: false,
  },
};

export const SidemenuWithoutBorderOnRight = {
  render: (args) => ({
    components: { Sidemenu },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row bg-grey-50 fr-p-2w">
                  <Sidemenu class="fr-col-12 fr-col-md-5" v-bind="args">
                    <template v-slot:title>
                      <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
                      Help
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
                          >Accès direct</a>
                      </li>
                    </ul>
                  </Sidemenu>
                  <div class="fr-col-12 fr-col-md-7 bg-white fr-p-2w">
                    <p class="fr-m-0">Some content</p>
                  </div>
                </div>`,
  }),
  args: {
      ...args,
      onRight: true,
      showBorder: false,
    }
};

export const SidemenuOnLeftFixed = {
  render: (args) => ({
    components: { Sidemenu },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row">
                  <Sidemenu class="fr-col-12 fr-col-md-5" v-bind="args">
                    <template v-slot:title>
                      <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
                      Help
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
                          >Accès direct</a>
                      </li>
                    </ul>
                  </Sidemenu>
                  <div class="fr-col-12 fr-col-md-7">
                    <p>Some content</p>
                  </div>
                </div>`,
  }),
  args: {
    ...args,
    fixed: true,
  },
};

export const SidemenuOnRightFixed = {
  render: (args) => ({
    components: { Sidemenu },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row">
                  <Sidemenu class="fr-col-12 fr-col-md-5" v-bind="args">
                    <template v-slot:title>
                      <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
                      Help
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
                          >Accès direct</a>
                      </li>
                    </ul>
                  </Sidemenu>
                  <div class="fr-col-12 fr-col-md-7">
                    <p>Some content</p>
                  </div>
                </div>`,
  }),
  args: {
      ...args,
      onRight: true,
      fixed: true,
    }
};

export const SidemenuWithoutBorderOnLeftFixed = {
  render: (args) => ({
    components: { Sidemenu },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row bg-grey-50 fr-p-2w">
                  <Sidemenu class="fr-col-12 fr-col-md-5" v-bind="args">
                    <template v-slot:title>
                      <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
                      Help
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
                          >Accès direct</a>
                      </li>
                    </ul>
                  </Sidemenu>
                  <div class="fr-col-12 fr-col-md-7 bg-white fr-p-2w">
                    <p class="fr-m-0">Some content</p>
                  </div>
                </div>`,
  }),
  args: {
    ...args,
    showBorder: false,
    fixed: true,
  },
};

export const SidemenuWithoutBorderOnRightFixed = {
  render: (args) => ({
    components: { Sidemenu },
    setup() {
      return { args };
    },
    template: ` <div class="fr-grid-row bg-grey-50 fr-p-2w">
                  <Sidemenu class="fr-col-12 fr-col-md-5" v-bind="args">
                    <template v-slot:title>
                      <span class="fr-icon--sm fr-icon-question-line" aria-hidden="true"></span>
                      Help
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
                          >Accès direct</a>
                      </li>
                    </ul>
                  </Sidemenu>
                  <div class="fr-col-12 fr-col-md-7 bg-white fr-p-2w">
                    <p class="fr-m-0">Some content</p>
                  </div>
                </div>`,
  }),
  args: {
      ...args,
      onRight: true,
      showBorder: false,
      fixed: true,
    }
};
