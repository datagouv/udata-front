import Well from './Well.vue';
import editIcon from "svg/illustrations/edit.svg";

export default {
  title: 'Ui/Well',
  component: Well,
  argTypes: {
    type: {
      options: [
        "primary",
        "secondary"
      ],
      control: 'radio',
    },
    color: {
      options: [
        "success",
        "warning",
        "grey-100",
        "blue-cumulus"
      ],
      control: 'select',
    }
  },
};

const args = {
  type: "primary",
};

export const SimpleWell = {
  render: (args) => ({
    components: { Well },
    setup() {
      return { args };
    },
    template: ` <div class="fr-p-4w">
                  <Well v-bind="args">
                    Well with a colored Background and some padding.
                  </Well>
                </div>`,
  }),
  args,
};

const argsRegular = {
  color: "blue-cumulus",
  weight: "regular"
};

export const WellWithImg = {
  render: (args) => ({
    components: { Well },
    setup() {
      return { args: argsRegular, editIcon };
    },
    template: ` <Well v-bind="args">
                    <div class="fr-grid-row">
                      <div class="fr-col-auto fr-mr-3v">
                        <img :src="editIcon" alt="" />
                      </div>
                      <div class="fr-col">
                        <p class="fr-m-0 fr-text--bold">What is a dataset?</p>
                        <p class="fr-m-0 fr-text--xs">On udata-front, a dataset is a set of files.</p>
                      </div>
                    </div>
                  </Well>`,
  }),
  args,
}
