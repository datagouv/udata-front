import type { Meta, StoryObj } from '@storybook/vue3';
import Tab from "./Tab.vue";
import TabGroup from "./TabGroup.vue";
import TabList from "./TabList.vue";
import TabPanel from "./TabPanel.vue";
import TabPanels from "./TabPanels.vue";
import { ref } from 'vue';

const meta = {
  title: 'Components/TabGroup',
  component: TabGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/controle-segmente/"
      }
    }
  },
} satisfies Meta<typeof TabGroup>;

export default meta;

export const DefaultTabs: StoryObj<any> = {
  render: (args: any) => ({
    components: { Tab, TabGroup, TabList, TabPanel, TabPanels },
    setup() {
      return { args };
    },
    template: `
      <TabGroup>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </TabGroup>
    `,
  }),
  args: {
  },
};

export const TabsSm: StoryObj<any> = {
  render: (args: any) => ({
    components: { Tab, TabGroup, TabList, TabPanel, TabPanels },
    setup() {
      return { args };
    },
    template: `
      <TabGroup size="sm">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </TabGroup>
    `,
  }),
  args: {
  },
};