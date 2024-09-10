import { withActions } from '@storybook/addon-actions/decorator';
import { userEvent, expect, within, fn } from '@storybook/test';
import type { Meta, StoryObj } from "@storybook/vue3";
import AdminMembershipRequest from './AdminMembershipRequest.vue';
import { DefaultIdenticonAvatar } from "../discussions/Avatar/Avatar.stories";
import { MembershipStatus } from '../../types';

const meta = {
  title: 'Admin/AdminMembershipRequest',
  component: AdminMembershipRequest,
  decorators: [withActions],
  args: {
    onAccept: fn(),
    onRefuse: fn(),
  },
} satisfies Meta<typeof AdminMembershipRequest>;

export default meta;

const args = {
  oid: "someId",
  request: {
    id: "someId",
    status: "pending" as MembershipStatus,
    created: (new Date()).toISOString(),
    comment : "I want to join your organization.",
    user: DefaultIdenticonAvatar.args.user,
  },
  loading: false,
  showActions: true,
};

/**
 * #### Membership Request
 * A membership request sent to your organization
 */
export const DefaultMembershipRequest: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminMembershipRequest },
    setup() {
      return { args };
    },
    template: '<AdminMembershipRequest v-bind="args"/>',
  }),
  args,
};

/**
 * #### Loading Membership Request
 * A membership request with an action in progress
 */
export const LoadingMembershipRequest: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminMembershipRequest },
    setup() {
      return { args };
    },
    template: '<AdminMembershipRequest v-bind="args"/>',
  }),
  args: {
    ...args,
    loading: true,
  },
};

/**
 * #### Membership Request without actions
 * A membership request without actions
 */
export const MembershipRequestWithoutActions: StoryObj<typeof meta> = {
  render: (args) => ({
    components: { AdminMembershipRequest },
    setup() {
      return { args };
    },
    template: '<AdminMembershipRequest v-bind="args"/>',
  }),
  args: {
    ...args,
    showActions: false,
  },
};

/**
 * #### Membership Request
 * A membership request with a click on accept
 */
export const AcceptedMembershipRequest: StoryObj<typeof meta> = {
  play:  async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("A user clicks on the accept button", async () => {
      const Accept = canvas.getByTestId("accept");
      await userEvent.click(Accept);
      await expect(args.onAccept).toHaveBeenCalled();
      await expect(args.onAccept).toHaveBeenCalledWith(args.request.id);
    });
  },
  render: (args) => ({
    components: { AdminMembershipRequest },
    setup() {
      return { args };
    },
    template: '<AdminMembershipRequest v-bind="args"/>',
  }),
  args,
};

/**
 * #### Refused Membership Request
 * A membership request with a click on refuse
 */
export const RefusedMembershipRequest: StoryObj<typeof meta> = {
  // TODO: add back after moving out of DSFR modal
  // play:  async ({ args, canvasElement, step }) => {
  //   const canvas = within(canvasElement);
  //   const body = canvasElement.ownerDocument.body;
  //   const screen = within(body);
  //   const comment = "This is a spam request.";

  //   await step("A user clicks on the refuse button", async () => {
  //     const Refuse = await canvas.findByTestId("refuse");
  //     await userEvent.click(Refuse);
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //   });
  //   await step("A user fills the comment field", async () => {
  //     const InputGroup = screen.getByTestId("comment-group");
  //     await userEvent.type(InputGroup.querySelector("input") as HTMLInputElement, comment);
  //   });
  //   await step("A user clicks on the refuse button in the modal", async () => {
  //     const Refuse = screen.getByTestId("refuse-modal-button");
  //     await userEvent.click(Refuse);
  //     await expect(args.onRefuse).toBeCalled();
  //     await expect(args.onRefuse).toBeCalledWith(args.request.id, comment);
  //   });
  // },
  render: (args) => ({
    components: { AdminMembershipRequest },
    setup() {
      return { args };
    },
    template: '<AdminMembershipRequest v-bind="args"/>',
  }),
  args,
};

/**
 * #### Refuse Membership Request cancelled
 * A membership request with a click on refuse and a dismissed modal
 */
export const RefuseMembershipRequestCancelled: StoryObj<typeof meta> = {
  // TODO: add back after moving out of DSFR modal
  // play:  async ({ args, canvasElement, step }) => {
  //   const canvas = within(canvasElement);
  //   const body = canvasElement.ownerDocument.body;
  //   const screen = within(body);
  //   const comment = "This is a spam request.";

  //   await step("A user clicks on the refuse button", async () => {
  //     const Refuse = await canvas.findByTestId("refuse");
  //     await userEvent.click(Refuse);
  //   });
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   await step("A user fills the comment field", async () => {
  //     const InputGroup = screen.getByTestId("comment-group");
  //     await userEvent.type(InputGroup.querySelector("input") as HTMLInputElement, comment);
  //   });
  //   await step("A user clicks on the cancel button in the modal", async () => {
  //     const Cancel = screen.getByTestId("cancel-modal-button");
  //     await userEvent.click(Cancel);
  //     await expect(args.onRefuse).not.toBeCalled();
  //   });
  // },
  render: (args) => ({
    components: { AdminMembershipRequest },
    setup() {
      return { args };
    },
    template: '<AdminMembershipRequest v-bind="args"/>',
  }),
  args,
};
