import type { Meta, StoryObj } from '@storybook/vue3';
import { SegmentedControl } from ".";
import { ref } from 'vue';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/controle-segmente/"
      }
    }
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

export const OnlyLabelSm: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `<SegmentedControl v-bind="args" v-model="value"/>`,
  }),
  args: {
    legend: "Titre de la navigation",
    options: [
      { label: "Données" },
      { label: "Description" },
      { label: "Téléchargement" },
    ],
    size: "sm",
  },
};

export const LabelAndIconSm: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `<SegmentedControl v-bind="args" v-model="value"/>`,
  }),
  args: {
    legend: "Titre de la navigation",
    options: [
      { label: "Données", icon: "fr-icon-road-map-line" },
      { label: "Description" },
      { label: "Téléchargement", icon: "fr-icon-arrow-down-line" },
    ],
    size: "sm",
  },
};

export const OnlyLabelMd: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `<SegmentedControl v-bind="args" v-model="value"/>`,
  }),
  args: {
    legend: "Titre de la navigation",
    options: [
      { label: "Données" },
      { label: "Description" },
      { label: "Téléchargement" },
    ],
  },
};

export const LabelAndIconMd: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `<SegmentedControl v-bind="args" v-model="value"/>`,
  }),
  args: {
    legend: "Titre de la navigation",
    options: [
      { label: "Données", icon: "fr-icon-road-map-line" },
      { label: "Description" },
      { label: "Téléchargement", icon: "fr-icon-arrow-down-line" },
    ],
  },
};

export const InlineLegend: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `<SegmentedControl v-bind="args" v-model="value"/>`,
  }),
  args: {
    legend: "Titre de la navigation",
    options: [
      { label: "Données" },
      { label: "Description" },
      { label: "Téléchargement" },
    ],
    legendPosition: "inline",
  },
};


export const HiddenLegend: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(null);
      return { args, value };
    },
    template: `<SegmentedControl v-bind="args" v-model="value"/>`,
  }),
  args: {
    legend: "Titre de la navigation",
    options: [
      { label: "Données" },
      { label: "Description" },
      { label: "Téléchargement" },
    ],
    legendPosition: "hidden",
  },
};

