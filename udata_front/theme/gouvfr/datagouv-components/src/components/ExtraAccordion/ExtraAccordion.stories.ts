import type { Meta, StoryObj } from '@storybook/vue3';
import ExtraAccordion from '.';
import { expect, userEvent, waitFor, within } from '@storybook/test';

const meta = {
  title: "Components/Extra Accordion",
  component: ExtraAccordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "The Extra Accordion displays `extra` dictionary as columns in an accordion."
      },
      toc: {
        disable :true
      }
    }
  },
} satisfies Meta<typeof ExtraAccordion>;

export default meta;

const args = {
  extra: {
    "analysis:checksum": "0e367f91ba1f8b82db36c919185948dcc4cc7c1f",
    "analysis:content-length": 639100,
    "analysis:last-modified-at": "2024-03-25T08:35:45+00:00",
    "analysis:last-modified-detection": "last-modified-header",
    "analysis:mime-type": "text/plain",
    "analysis:parsing:finished_at": "2024-03-25T09:16:13.598201+00:00",
    "analysis:parsing:started_at": "2024-03-25T09:16:08.602954+00:00",
    "check:available": true,
    "check:date": "2024-03-25T08:37:11.016079+00:00",
    "check:headers:content-type": "text/csv",
    "check:status": 200,
    "check:timeout": false,
    },
    buttonText: "See extras",
    titleText: "Extras",
};

export const SimpleExtraAccordion: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ExtraAccordion },
    setup() {
      return { args };
    },
    template: '<ExtraAccordion :extra="args.extra" :buttonText="args.buttonText" :titleText="args.titleText" titleLevel="h5" />',
  }),
  args,
};

export const TestExtraAccordion: StoryObj<typeof meta> = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitFor(() => expect(canvas.getByTestId("button")).toBeDefined());
    await waitFor(() => expect(canvas.getByTestId("extra-list")).not.toBeVisible());

    await step('Open accordion', async () => {
      await userEvent.click(canvas.getByTestId("button"));
    });

    await waitFor(() => expect(canvas.getByTestId("extra-list")).toBeVisible());

    await new Promise((resolve) => setTimeout(resolve, 500));

    await step('Close accordion', async () => {
      await userEvent.click(canvas.getByTestId("button"));
    });

    await waitFor(() => expect(canvas.getByTestId("extra-list")).not.toBeVisible());
  },
  render: (args) => ({
    components: { ExtraAccordion },
    setup() {
      return { args };
    },
    template: '<ExtraAccordion :extra="args.extra" :buttonText="args.buttonText" :titleText="args.titleText" titleLevel="h5" />',
  }),
  args,
};
