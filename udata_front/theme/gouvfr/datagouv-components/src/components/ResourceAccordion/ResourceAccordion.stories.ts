import { withActions } from '@storybook/addon-actions/decorator';
import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ResourceAccordion } from '.';

const meta = {
  title: "Components/Resource/Resource",
  component: ResourceAccordion,
  decorators: [withActions],
  tags: ['autodocs'],
  parameters: {
    actions: {
      handles: ['click a'],
    },
    docs: {
      description: {
        component: "The ResourceAccordion accordion shows a all resource information in a tabbed view."
      }
    }
  },
} satisfies Meta<typeof ResourceAccordion>;

export default meta;

const args = {
  datasetId: "someId",
  resource: {
    organization: {
      id: "someId",
      acronym: null,
      name: 'My Organization',
      uri: '',
      slug: '',
      page: '',
      logo: '',
      logo_thumbnail: '',
      badges: []
    },
    owner: null,
    checksum: {type: "sha1", value: "54d0f3a4847c546c1cc4865f5ca54a1f8fc3f9af"},
    created_at: "2023-11-15T10:40:22.288000+00:00",
    description: `# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'`,
    extras: {},
    filesize: 9167,
    filetype: "file",
    format: "csv",
    harvest: null,
    id: "e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    internal: {created_at_internal: "2023-11-15T10:40:22.288000+00:00", last_modified_internal: "2023-11-15T10:40:22.461000+00:00"},
    last_modified: "2023-11-15T10:40:22.461000+00:00",
    latest: "https://www.data.gouv.fr/fr/datasets/r/e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    metrics: {views: 0},
    mime: "text/csv",
    preview_url: "",
    schema: null,
    title: "tondeuse_batterie_fr.csv",
    type: "main",
    url: "https://static.data.gouv.fr/resources/indice-de-reparabilite-organisation-ribimex/20231115-104022/data.csv"
  }
};

const argsWithSchema = {
  datasetId: "someId",
  resource: {
    organization: {
      id: "someId",
      acronym: null,
      name: 'My Organization',
      uri: '',
      slug: '',
      page: '',
      logo: '',
      logo_thumbnail: '',
      badges: []
    },
    owner: null,
    checksum: {type: "sha1", value: "54d0f3a4847c546c1cc4865f5ca54a1f8fc3f9af"},
    created_at: "2023-11-15T10:40:22.288000+00:00",
    description: ``,
    extras: {"check:available": true, "check:date": "2023-11-15T10:40:27.222278+00:00", "check:headers:content-type": "text/csv", "check:status": 200, "check:timeout": false, "publish_source": "publier.etalab.studio"},
    filesize: 9167,
    filetype: "file",
    format: "csv",
    harvest: null,
    id: "e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    internal: {created_at_internal: "2023-11-15T10:40:22.288000+00:00", last_modified_internal: "2023-11-15T10:40:22.461000+00:00"},
    last_modified: "2023-11-15T10:40:22.461000+00:00",
    latest: "https://www.data.gouv.fr/fr/datasets/r/e2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    metrics: {views: 0},
    mime: "text/csv",
    preview_url: "https://explore.data.gouv.fr/?url=https%3A%2F%2Fwww.data.gouv.fr%2Ffr%2Fdatasets%2Fr%2Fe2bc9b7c-4598-4bdb-92c3-9109a16f288c",
    schema: {name: "etalab/schema-indice-reparabilite", version: "0.1.2"},
    title: "tondeuse_batterie_fr.csv",
    type: "main",
    url: "https://static.data.gouv.fr/resources/indice-de-reparabilite-organisation-ribimex/20231115-104022/data.csv"
  }
};

export const SimpleResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args,
};


export const ResourceWithSchema: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: argsWithSchema,
};

export const OpenedResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    expandedOnMount: true,
  },
};


export const EditableResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    canEdit: true,
  },
};


export const ResourceWithInteractions: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Expand Resource', async () => {
      await userEvent.click(canvas.getByTestId("expand-button"));
    });

    await step('Close Resource', async () => {
      await userEvent.click(canvas.getByTestId("expand-button"));
    });

    expect(canvas.getByTestId("expand-button")).toHaveAttribute("aria-expanded", "false");
  },
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    canEdit: true,
  },
};

export const CommunityResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    isCommunityResource: true,
  },
};


export const EditableCommunityResource: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { ResourceAccordion },
    setup() {
      return { args };
    },
    template: '<ResourceAccordion v-bind="args" />',
  }),
  args: {
    ...args,
    isCommunityResource: true,
    canEdit: true,
  },
};
