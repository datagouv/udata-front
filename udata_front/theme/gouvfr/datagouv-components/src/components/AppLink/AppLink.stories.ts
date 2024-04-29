import type { Meta, StoryObj } from '@storybook/vue3';
import { AppLink } from ".";
import { vueRouter } from 'storybook-vue3-router';

const meta = {
  title: 'Components/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The AppLink blablabla."
      }
    }
  },
} satisfies Meta<typeof AppLink>;

export default meta;

const args = {};

export const SimpleExternalLink: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AppLink },
    setup() {
      return { args };
    },
    template: `<AppLink to="https://www.data.gouv.fr">
                Link test
              </AppLink>`,
  }),
  args,
};

export const SimpleExternalLinkInNewWindow: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AppLink },
    setup() {
      return { args };
    },
    template: `<AppLink to="https://www.data.gouv.fr" target="_blank">
                Link test
              </AppLink>`,
  }),
  args,
};

export const SimpleInternalLinks: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AppLink },
    setup() {
      return { args };
    },
    template: `<div style="display: flex; gap: 1em">
                <AppLink to="/">
                  Home
                </AppLink>
                <AppLink to="/about">
                  About
                </AppLink>
                <AppLink to="/about" target="_blank">
                  About
                </AppLink>
                <AppLink to="https://www.data.gouv.fr">
                  External Site
                </AppLink>
              </div>
              <router-view />`,
  }),
  decorators: [vueRouter()],
  args,
};
