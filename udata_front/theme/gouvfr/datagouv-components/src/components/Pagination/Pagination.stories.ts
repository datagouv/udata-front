import { withActions } from '@storybook/addon-actions/decorator';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Pagination from '.';
import { getVisiblePages, PAGES_AROUND } from "./paginate";
import { useI18n } from 'vue-i18n';

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ['autodocs'],
  decorators: [withActions],
  args: {
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: "The Pagination component shows a complete pagination following DSFR design and specification for the number of pages to show."
      }
    }
  },
} satisfies Meta<typeof Pagination>;

export default meta;

const args = {
  totalResults: 200,
  pageSize: 20,
  page: 1
};

const PAGE_COUNT_WITHOUT_ELLIPSIS = 5;
const PAGE_COUNT_WITH_ELLIPSIS_ON_ONE_SIDE = 6;
const PAGE_COUNT_WITH_ELLIPSIS_ON_BOTH_SIDES = 11;

export const FirstPage: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step, globals }) => {
    const canvas = within(canvasElement);

    await step('returns an empty array when page count is <= 2', function () {
      expect(getVisiblePages(0, 0)).toHaveLength(0);
      expect(getVisiblePages(0, 1)).toHaveLength(0);
      expect(getVisiblePages(0, 2)).toHaveLength(0);
    });

    await step('returns [2, 3, 4] on first page', function () {
      expect(getVisiblePages(PAGE_COUNT_WITHOUT_ELLIPSIS - PAGES_AROUND - 1, PAGE_COUNT_WITHOUT_ELLIPSIS)).toEqual([2, 3, 4]);
    });

    await step('returns [2, 3, 4] on last page', function () {
      expect(getVisiblePages(PAGE_COUNT_WITHOUT_ELLIPSIS, PAGE_COUNT_WITHOUT_ELLIPSIS)).toEqual([2, 3, 4]);
    });

    await step('adds null if page 2 is not in array', function () {
      const pagination = getVisiblePages(PAGE_COUNT_WITH_ELLIPSIS_ON_ONE_SIDE, PAGE_COUNT_WITH_ELLIPSIS_ON_ONE_SIDE);
      expect(pagination).toContain(null);
      expect(pagination).not.toContain(2);
    });

    await step('adds null if the second last page is not in array', function () {
      const pagination = getVisiblePages(1, PAGE_COUNT_WITH_ELLIPSIS_ON_ONE_SIDE);
      expect(pagination).toContain(null);
      expect(pagination).not.toContain(PAGE_COUNT_WITH_ELLIPSIS_ON_ONE_SIDE - 1);
    });

    await step('adds null on both sides if page 2 and the second last page are not in array', function () {
      const pagination = getVisiblePages(6, PAGE_COUNT_WITH_ELLIPSIS_ON_BOTH_SIDES);
      expect(pagination).toContain(null);
      expect(pagination).not.toContain(2);
      expect(pagination).not.toContain(PAGE_COUNT_WITH_ELLIPSIS_ON_BOTH_SIDES - 1);
      expect(pagination).toHaveLength(PAGES_AROUND * 2 + 3);
    });

    await step('never contains pages greater than the last one', function () {
      const pagination = getVisiblePages(PAGE_COUNT_WITH_ELLIPSIS_ON_ONE_SIDE, PAGE_COUNT_WITH_ELLIPSIS_ON_ONE_SIDE);
      expect(pagination.every(page => !page || page < PAGE_COUNT_WITH_ELLIPSIS_ON_ONE_SIDE)).toBeTruthy();
    });

    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).toContain("2");
      expect(canvasElement.textContent).toContain("3");
      expect(canvasElement.textContent).toContain("4");
      expect(canvasElement.textContent).not.toContain("5");
      expect(canvasElement.textContent).not.toContain("6");
      expect(canvasElement.textContent).not.toContain("7");
      expect(canvasElement.textContent).not.toContain("8");
      expect(canvasElement.textContent).not.toContain("9");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });

    await step('click on a page is working', async function () {
      const page2 = canvas.getByTestId<HTMLAnchorElement>("2");
      await userEvent.click(page2);
      expect(page2.href).not.toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onChange).toHaveBeenCalledWith(2);
    });

    args.onChange.mockClear();

    await step('click on next page is working ', async function () {
      const nextPageButton = canvas.getByTestId<HTMLAnchorElement>("next-page");
      await userEvent.click(nextPageButton);
      expect(nextPageButton.href).not.toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onChange).toHaveBeenCalledWith(args.page + 1);
    });

    args.onChange.mockClear();

    await step('click on last page is working ', async function () {
      const lastPageButton = canvas.getByTestId<HTMLAnchorElement>("last-page");
      await userEvent.click(lastPageButton);
      expect(lastPageButton.href).not.toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onChange).toHaveBeenCalledWith(10);
    });

    args.onChange.mockClear();

    await step('click on current page triggers no event', async function () {
      const currentPageButton = canvas.getByTestId<HTMLAnchorElement>("1");
      currentPageButton.click();
      expect(currentPageButton.href).toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).not.toHaveBeenCalled();
    });

    await step('click on first page triggers no event on page 1', async function () {
      const firstPageButton = canvas.getByTestId<HTMLAnchorElement>("first-page");
      firstPageButton.click();
      expect(firstPageButton.href).toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).not.toHaveBeenCalled();
    });

    await step('click on previous page triggers no event on page 1', async function () {
      const previousPageButton = canvas.getByTestId<HTMLAnchorElement>("previous-page");
      previousPageButton.click();
      expect(previousPageButton.href).toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).not.toHaveBeenCalled();
    });

  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args,
};

export const SecondPage: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step, globals }) => {
    const canvas = within(canvasElement);

    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).toContain("2");
      expect(canvasElement.textContent).toContain("3");
      expect(canvasElement.textContent).toContain("4");
      expect(canvasElement.textContent).toContain("5");
      expect(canvasElement.textContent).not.toContain("6");
      expect(canvasElement.textContent).not.toContain("7");
      expect(canvasElement.textContent).not.toContain("8");
      expect(canvasElement.textContent).not.toContain("9");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });

    await step('click on first page works', async function () {
      const firstPageButton = canvas.getByTestId<HTMLAnchorElement>("first-page");
      await userEvent.click(firstPageButton);
      expect(firstPageButton.href).not.toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onChange).toHaveBeenCalledWith(1);
    });

    args.onChange.mockClear();

    await step('click on previous page works', async function () {
      const previousPageButton = canvas.getByTestId<HTMLAnchorElement>("previous-page");
      await userEvent.click(previousPageButton);
      expect(previousPageButton.href).not.toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onChange).toHaveBeenCalledWith(args.page - 1);
    });

  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args: {
    ...args,
    page: 2,
  },
};

export const ThirdPage: StoryObj<typeof meta> = {
  play: async ({ canvasElement, step, globals }) => {
    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).toContain("2");
      expect(canvasElement.textContent).toContain("3");
      expect(canvasElement.textContent).toContain("4");
      expect(canvasElement.textContent).toContain("5");
      expect(canvasElement.textContent).toContain("6");
      expect(canvasElement.textContent).not.toContain("7");
      expect(canvasElement.textContent).not.toContain("8");
      expect(canvasElement.textContent).not.toContain("9");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });
  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args: {
    ...args,
    page: 3,
  },
};

export const FourthPage: StoryObj<typeof meta> = {
  play: async ({ canvasElement, step, globals }) => {
    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).toContain("2");
      expect(canvasElement.textContent).toContain("3");
      expect(canvasElement.textContent).toContain("4");
      expect(canvasElement.textContent).toContain("5");
      expect(canvasElement.textContent).toContain("6");
      expect(canvasElement.textContent).toContain("7");
      expect(canvasElement.textContent).not.toContain("8");
      expect(canvasElement.textContent).not.toContain("9");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });
  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args: {
    ...args,
    page: 4,
  },
};

export const FifthPage: StoryObj<typeof meta> = {
  play: async ({ canvasElement, step, globals }) => {
    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).toContain("2");
      expect(canvasElement.textContent).toContain("3");
      expect(canvasElement.textContent).toContain("4");
      expect(canvasElement.textContent).toContain("5");
      expect(canvasElement.textContent).toContain("6");
      expect(canvasElement.textContent).toContain("7");
      expect(canvasElement.textContent).toContain("8");
      expect(canvasElement.textContent).not.toContain("9");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });
  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args: {
    ...args,
    page: 5,
  },
};

export const SixthPage: StoryObj<typeof meta> = {
  play: async ({ canvasElement, step, globals }) => {
    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).not.toContain("2");
      expect(canvasElement.textContent).toContain("3");
      expect(canvasElement.textContent).toContain("4");
      expect(canvasElement.textContent).toContain("5");
      expect(canvasElement.textContent).toContain("6");
      expect(canvasElement.textContent).toContain("7");
      expect(canvasElement.textContent).toContain("8");
      expect(canvasElement.textContent).toContain("9");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });
  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args: {
    ...args,
    page: 6,
  },
};

export const SeventhPage: StoryObj<typeof meta> = {
  play: async ({ canvasElement, step, globals }) => {
    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).not.toContain("2");
      expect(canvasElement.textContent).not.toContain("3");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).toContain("4");
      expect(canvasElement.textContent).toContain("5");
      expect(canvasElement.textContent).toContain("6");
      expect(canvasElement.textContent).toContain("7");
      expect(canvasElement.textContent).toContain("8");
      expect(canvasElement.textContent).toContain("9");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });
  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args: {
    ...args,
    page: 7,
  },
};

export const EighthPage: StoryObj<typeof meta> = {
  play: async ({ canvasElement, step, globals }) => {
    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).not.toContain("2");
      expect(canvasElement.textContent).not.toContain("3");
      expect(canvasElement.textContent).not.toContain("4");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).toContain("5");
      expect(canvasElement.textContent).toContain("6");
      expect(canvasElement.textContent).toContain("7");
      expect(canvasElement.textContent).toContain("8");
      expect(canvasElement.textContent).toContain("9");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });
  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args: {
    ...args,
    page: 8,
  },
};

export const NinthPage: StoryObj<typeof meta> = {
  play: async ({ canvasElement, step, globals }) => {
    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).not.toContain("2");
      expect(canvasElement.textContent).not.toContain("3");
      expect(canvasElement.textContent).not.toContain("4");
      expect(canvasElement.textContent).not.toContain("5");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).toContain("6");
      expect(canvasElement.textContent).toContain("7");
      expect(canvasElement.textContent).toContain("8");
      expect(canvasElement.textContent).toContain("9");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });
  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args: {
    ...args,
    page: 9,
  },
};

export const TenthPage: StoryObj<typeof meta> = {
  play: async ({ args, canvasElement, step, globals }) => {
    const canvas = within(canvasElement);

    await step('check pages shown', function () {
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("First page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Previous page")));
      expect(canvasElement.textContent).toContain("1");
      expect(canvasElement.textContent).not.toContain("2");
      expect(canvasElement.textContent).not.toContain("3");
      expect(canvasElement.textContent).not.toContain("4");
      expect(canvasElement.textContent).not.toContain("5");
      expect(canvasElement.textContent).not.toContain("6");
      expect(canvasElement.textContent).toContain("…");
      expect(canvasElement.textContent).toContain("7");
      expect(canvasElement.textContent).toContain("8");
      expect(canvasElement.textContent).toContain("9");
      expect(canvasElement.textContent).toContain("10");
      expect(canvasElement.textContent).not.toContain("11");
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Next page")));
      expect(canvasElement.textContent).toEqual(expect.stringContaining(globals.t("Last page")));
    });

    await step('click on next page triggers no event on page 10', async function () {
      const nextPageButton = canvas.getByTestId<HTMLAnchorElement>("next-page");
      nextPageButton.click();
      expect(nextPageButton.href).toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).not.toHaveBeenCalled();
    });

    await step('click on last page triggers no event on page 10', async function () {
      const lastPageButton = canvas.getByTestId<HTMLAnchorElement>("last-page");
      lastPageButton.click();
      expect(lastPageButton.href).toBe("");
    });

    await waitFor(() => {
      expect(args.onChange).not.toHaveBeenCalled();
    });
  },
  render: (args, context) => ({
    components: { Pagination },
    setup() {
      const { t } = useI18n();
      context.globals.t = t;
      return { args, t };
    },
    template: `<Pagination
                :total-results="args.totalResults"
                :page-size="args.pageSize"
                :page="args.page"
                @change="args.onChange"
              />`,
  }),
  args: {
    ...args,
    page: 10,
  },
};
