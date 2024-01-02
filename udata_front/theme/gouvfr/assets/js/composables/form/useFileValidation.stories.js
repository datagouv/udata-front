import useFileValidation from './useFileValidation';
import Vuelidate from '../../.storybook/Vuelidate.vue';
import * as FileCardStories from '../../components/Form/FileCard/FileCard.stories';

export default {
  title: 'Composable/useFileValidation',
  component: Vuelidate,
};

const fileArgs = FileCardStories.SimpleFileCard.args.file;
const remoteArgs = FileCardStories.FileCardWithoutFormatAndSize.args.file;

export const FileValidation = {
  render: (args) => ({
    components: { Vuelidate },
    setup() {
      const { requiredRules } = useFileValidation(fileArgs);
      return {
        args: {
          rules: requiredRules,
        }
      };
    },
    template: '<Vuelidate v-bind="args" />',
  }),
  args: {},
};

export const RemoteValidation = {
  render: (args) => ({
    components: { Vuelidate },
    setup() {
      const { requiredRules } = useFileValidation(remoteArgs);
      return {
        args: {
          rules: requiredRules,
        }
      };
    },
    template: '<Vuelidate v-bind="args" />',
  }),
  args: {},
};

export const FileWarning = {
  render: (args) => ({
    components: { Vuelidate },
    setup() {
      const { warningRules } = useFileValidation(fileArgs);
      return {
        args: {
          rules: warningRules,
        }
      };
    },
    template: '<Vuelidate v-bind="args" />',
  }),
  args: {},
};

export const RemoteWarning = {
  render: (args) => ({
    components: { Vuelidate },
    setup() {
      const { warningRules } = useFileValidation(remoteArgs);
      return {
        args: {
          rules: warningRules,
        }
      };
    },
    template: '<Vuelidate v-bind="args" />',
  }),
  args: {},
};
