import { Meta, StoryObj } from "@storybook/vue3";
import Loading from "./Loader.vue";
import Thread from "./Thread.vue";

const meta = {
  title: 'Components/Discussions/Internals/Thread',
  component: Thread,
} satisfies Meta<typeof Thread>;

export default meta;

const args = {
  thread: {
    id: "64d651570ed1adceedf9f2dd",
    discussion: [
      {
        "content": "Hello,\n\nI would like to obtain a copy of the death record for my grandfather.\nJohn Junior Doe",
        "posted_by": {
          "avatar": null,
          "avatar_thumbnail": null,
          "class": "User",
          "first_name": "John Junior",
          "id": "64a63de24eedfs7e3ca73a8e",
          "last_name": "Doe",
          page: ""
        },
        "posted_on": "2023-08-11T15:18:47.574000+00:00"
      },
    ],
    title: "Death record of my grandfather",
    url: "https://dev.data.gouv.fr/api/1/discussions/64d651570ed1adcee429f2dd/",
    closed: null,
    closed_by: null,
  }
};

const longThreadArgs = {
  thread: {
    id: "64d651570ed1adceedf9f2dd",
    discussion: [
      {
        "content": "Hello,\n\nI would like to obtain a copy of the death record for my grandfather.  I will be in Paris August 28th through 31st.\n\nWhere can I go purchase this record please?\n\nSource: Institut National de la Statistique et des Etudes Economiques (Insee); Paris, France; Fichier des personnes décédées; Roll #: deces-2008.txt\n\nName\tJohn Doe\nGender\thomme (Male)\nDeath Age\t12\nBirth Date\t12 janv. 1985\nDeath Place\tFrance\n\nThank you,\nJohn Junior Doe",
        "posted_by": {
          "avatar": null,
          "avatar_thumbnail": null,
          "class": "User",
          "first_name": "John Junior",
          "id": "64a63de24eedfs7e3ca73a8e",
          "last_name": "Doe",
          page: ""
        },
        "posted_on": "2023-08-11T15:18:47.574000+00:00"
      },
      {
        "content": "Bonjour,\n\nIdem\n\nCdt",
        "posted_by": {
          "avatar": null,
          "avatar_thumbnail": null,
          "class": "User",
          "first_name": "Jane",
          "id": "64dcdd309531f3fe2d50e7f6",
          "last_name": "Doe",
          page: ""
        },
        "posted_on": "2023-08-16T14:51:44.292000+00:00"
      },
      {
        "content": "Bonjour,\n\nJe ne comprends pas votre réponse.\n\nVous travaillez pour l'agence ?\n\nJe suis confus par votre réponse J'attends une réponse de l'agence pas d'un autre membre\n\nmerci",
        "posted_by": {
          "avatar": null,
          "avatar_thumbnail": null,
          "class": "User",
          "first_name": "John Junior",
          "id": "64a63de24eedfs7e3ca73a8e",
          "last_name": "Doe",
          page: ""
        },
        "posted_on": "2023-08-16T15:53:37.324000+00:00"
      },
      {
        "content": "Hello,\n\nYou have contacted us to find out how to obtain your grandfather's death certificate.\n\nTo obtain a full copy of your grandfather's death certificate, you can make a request at any time, free of charge and without any supporting documents, at service-public.fr > Documents - Citizenship - Elections > Civil status documents > Death certificate: request for a full copy.\n\nInsee Contact\n\nTo consult our FAQ, follow this link https://www.insee.fr/fr/information/1302169 \nTo subscribe to our newsletter, follow this link https://www.insee.fr/fr/information/1405553",
        "posted_by": {
          "avatar": null,
          "avatar_thumbnail": null,
          "class": "User",
          "first_name": "INSEE",
          "id": "5e99b5b64c0c98dd7a04a3f7",
          "last_name": "CONTACT",
          page: ""
        },
        "posted_on": "2023-08-22T07:28:12.053000+00:00"
      }
    ],
    title: "Death record of my grandfather",
    url: "https://dev.data.gouv.fr/api/1/discussions/64d651570ed1adcee429f2dd/",
    closed: null,
    closed_by: null,
  }
};

export const SimpleThread: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Thread },
    setup() {
      return { args };
    },
    template: ` <Thread v-bind="args"/>`,
  }),
  args,
};

export const LongThread: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Thread },
    setup() {
      return { args };
    },
    template: ` <Thread v-bind="args"/>`,
  }),
  args: longThreadArgs,
};

export const LoadingThread: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { Loading },
    setup() {
      return { args };
    },
    template: ` <Loading v-bind="args"/>`,
  }),
  args,
};
