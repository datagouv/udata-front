import Alert from './Alert.vue';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    size: {
      type: [
        "md",
        "sm",
      ],
      control: 'inline-radio',
    },
    type: {
      type: [
        "info",
        "error",
        "success",
        "warning",
      ],
      control: 'select',
    },
  }
};

const args = {
  /** @type {import("../../types").AlertType} */
  type: "info",
};

const smArgs = {
  /** @type {import("../../types").AlertType} */
  type: "info",
  /** @type {import("../../types").AlertSize} */
  size: "sm"
};

export const InfoAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><p>Some content</p></Alert>',
  }),
  args,
};

export const ErrorAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><p>Some content</p></Alert>',
  }),
  args: {
    ...args,
    type: "error",
  },
};

export const SuccessAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><p>Some content</p></Alert>',
  }),
  args: {
    ...args,
    type: "success",
  },
};

export const WarningAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><p>Some content</p></Alert>',
  }),
  args: {
    ...args,
    type: "warning",
  },
};

export const InfoSmAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><p>Some content</p></Alert>',
  }),
  args: smArgs,
};

export const ErrorSmAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><p>Some content</p></Alert>',
  }),
  args: {
    ...smArgs,
    type: "error",
  },
};

export const SuccessSmAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><p>Some content</p></Alert>',
  }),
  args: {
    ...smArgs,
    type: "success",
  },
};

export const WarningSmAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><p>Some content</p></Alert>',
  }),
  args: {
    ...smArgs,
    type: "warning",
  },
};

export const InfoTitleAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><template #title>Some title</template><p>Some content</p></Alert>',
  }),
  args,
};

export const ErrorTitleAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><template #title>Some title</template><p>Some content</p></Alert>',
  }),
  args: {
    ...args,
    type: "error",
  },
};

export const SuccessTitleAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><template #title>Some title</template><p>Some content</p></Alert>',
  }),
  args: {
    ...args,
    type: "success",
  },
};

export const WarningTitleAlert = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: '<Alert v-bind="args"><template #title>Some title</template><p>Some content</p></Alert>',
  }),
  args: {
    ...args,
    type: "warning",
  },
};
