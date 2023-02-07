import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import { Pagination } from "../src/index";

describe("Pagination component", function () {
  const mockFunction = vi.fn(i => i);
  const totalResults = 200;
  const pageSize = 20;
  const page = 1;

  test("mount component", async function () {
    expect(Pagination).toBeTruthy();

    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    expect(wrapper.isVisible()).toBeTruthy();
  });

  test("pagination on 1st page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    expect(wrapper.text()).toEqual(expect.stringContaining("First page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Previous page"));
    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).toContain("2");
    expect(wrapper.text()).toContain("3");
    expect(wrapper.text()).toContain("4");
    expect(wrapper.text()).not.toContain("5");
    expect(wrapper.text()).not.toContain("6");
    expect(wrapper.text()).not.toContain("7");
    expect(wrapper.text()).not.toContain("8");
    expect(wrapper.text()).not.toContain("9");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.html()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
    expect(wrapper.text()).toEqual(expect.stringContaining("Next page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Last page"));
  });

  test("pagination on 2nd page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 2,
      },
    });
    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).toContain("2");
    expect(wrapper.text()).toContain("3");
    expect(wrapper.text()).toContain("4");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).not.toContain("6");
    expect(wrapper.text()).not.toContain("7");
    expect(wrapper.text()).not.toContain("8");
    expect(wrapper.text()).not.toContain("9");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
  });

  test("pagination on 3rd page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 3,
      },
    });
    expect(wrapper.text()).toEqual(expect.stringContaining("First page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Previous page"));
    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).toContain("2");
    expect(wrapper.text()).toContain("3");
    expect(wrapper.text()).toContain("4");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("6");
    expect(wrapper.text()).not.toContain("7");
    expect(wrapper.text()).not.toContain("8");
    expect(wrapper.text()).not.toContain("9");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
    expect(wrapper.text()).toEqual(expect.stringContaining("Next page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Last page"));
  });

  test("pagination on 4th page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 4,
      },
    });
    expect(wrapper.text()).toEqual(expect.stringContaining("First page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Previous page"));
    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).toContain("2");
    expect(wrapper.text()).toContain("3");
    expect(wrapper.text()).toContain("4");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("6");
    expect(wrapper.text()).toContain("7");
    expect(wrapper.text()).not.toContain("8");
    expect(wrapper.text()).not.toContain("9");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
    expect(wrapper.text()).toEqual(expect.stringContaining("Next page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Last page"));
  });

  test("pagination on 5th page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 5,
      },
    });
    expect(wrapper.text()).toEqual(expect.stringContaining("First page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Previous page"));
    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).toContain("2");
    expect(wrapper.text()).toContain("3");
    expect(wrapper.text()).toContain("4");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("6");
    expect(wrapper.text()).toContain("7");
    expect(wrapper.text()).toContain("8");
    expect(wrapper.text()).not.toContain("9");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
    expect(wrapper.text()).toEqual(expect.stringContaining("Next page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Last page"));
  });

  test("pagination on 6th page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 6,
      },
    });
    expect(wrapper.text()).toEqual(expect.stringContaining("First page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Previous page"));
    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).not.toContain("2");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.text()).toContain("3");
    expect(wrapper.text()).toContain("4");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("6");
    expect(wrapper.text()).toContain("7");
    expect(wrapper.text()).toContain("8");
    expect(wrapper.text()).toContain("9");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
    expect(wrapper.text()).toEqual(expect.stringContaining("Next page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Last page"));
  });

  test("pagination on 7th page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 7,
      },
    });
    expect(wrapper.text()).toEqual(expect.stringContaining("First page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Previous page"));
    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).not.toContain("2");
    expect(wrapper.text()).not.toContain("3");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.text()).toContain("4");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("6");
    expect(wrapper.text()).toContain("7");
    expect(wrapper.text()).toContain("8");
    expect(wrapper.text()).toContain("9");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
    expect(wrapper.text()).toEqual(expect.stringContaining("Next page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Last page"));
  });

  test("pagination on 8th page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 8,
      },
    });
    expect(wrapper.text()).toEqual(expect.stringContaining("First page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Previous page"));
    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).not.toContain("2");
    expect(wrapper.text()).not.toContain("3");
    expect(wrapper.text()).not.toContain("4");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("6");
    expect(wrapper.text()).toContain("7");
    expect(wrapper.text()).toContain("8");
    expect(wrapper.text()).toContain("9");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
    expect(wrapper.text()).toEqual(expect.stringContaining("Next page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Last page"));
  });

  test("pagination on 9th page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 9,
      },
    });
    expect(wrapper.text()).toEqual(expect.stringContaining("First page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Previous page"));
    expect(wrapper.text()).toContain("1");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.text()).not.toContain("2");
    expect(wrapper.text()).not.toContain("3");
    expect(wrapper.text()).not.toContain("4");
    expect(wrapper.text()).not.toContain("5");
    expect(wrapper.text()).toContain("6");
    expect(wrapper.text()).toContain("7");
    expect(wrapper.text()).toContain("8");
    expect(wrapper.text()).toContain("9");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
    expect(wrapper.text()).toEqual(expect.stringContaining("Next page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Last page"));
  });

  test("pagination on 10th page", async function () {
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 10,
      },
    });
    expect(wrapper.text()).toEqual(expect.stringContaining("First page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Previous page"));
    expect(wrapper.text()).toContain("1");
    expect(wrapper.html()).toContain("…");
    expect(wrapper.text()).not.toContain("2");
    expect(wrapper.text()).not.toContain("3");
    expect(wrapper.text()).not.toContain("4");
    expect(wrapper.text()).not.toContain("5");
    expect(wrapper.text()).not.toContain("6");
    expect(wrapper.text()).toContain("7");
    expect(wrapper.text()).toContain("8");
    expect(wrapper.text()).toContain("9");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).not.toContain("11");
    expect(wrapper.text()).toEqual(expect.stringContaining("Next page"));
    expect(wrapper.text()).toEqual(expect.stringContaining("Last page"));
  });

  test("onClick update the page", function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    const newPage = wrapper.vm.onClick(2);
    expect(newPage).toBe(2);
    expect(mockFunction).toHaveBeenCalled();
  });

  test("nextPage update the page to the next one", function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    const newPage = wrapper.vm.nextPage();
    expect(newPage).toBe(page + 1);
    expect(mockFunction).toHaveBeenCalled();
  });

  test("previousPage update the page to the previous one", function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 2,
      },
    });
    const newPage = wrapper.vm.previousPage();
    expect(newPage).toBe(1);
    expect(mockFunction).toHaveBeenCalled();
  });

  test("click on first page is disabled on first page", function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    const firstPageButton = wrapper.find(".fr-pagination__link--first");

    firstPageButton.trigger("click");

    expect(firstPageButton.exists()).toBe(true);
    expect(firstPageButton.attributes("href")).toBeUndefined();
    expect(mockFunction).not.toHaveBeenCalled();
  });

  test("click on first page is working on other page", async function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 2,
      },
    });
    const firstPageButton = wrapper.find(".fr-pagination__link--first");

    await firstPageButton.trigger('click');

    expect(firstPageButton.exists()).toBe(true);
    expect(firstPageButton.attributes("href")).toBe("#");
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith(1);
  });


  test("click on previous page is disabled on first page", function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    const previousPageButton = wrapper.find(".fr-pagination__link--prev");

    previousPageButton.trigger("click");

    expect(previousPageButton.exists()).toBe(true);
    expect(previousPageButton.attributes("href")).toBeUndefined();
    expect(mockFunction).not.toHaveBeenCalled();
  });

  test("click on previous page is working on other page", async function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 2,
      },
    });
    const previousPageButton = wrapper.find(".fr-pagination__link--prev");

    await previousPageButton.trigger('click');

    expect(previousPageButton.exists()).toBe(true);
    expect(previousPageButton.attributes("href")).toBe("#");
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith(1);
  });

  test("click on current page is disabled", function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    const currentPageButton = wrapper.find("[aria-current='page']");

    currentPageButton.trigger("click");

    expect(currentPageButton.exists()).toBe(true);
    expect(currentPageButton.attributes("href")).toBeUndefined();
    expect(mockFunction).not.toHaveBeenCalled();
  });

  test("click on a page is working", async function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    const pageButton = wrapper.find(".fr-pagination__link[data-page='2']");

    await pageButton.trigger('click');

    expect(pageButton.exists()).toBe(true);
    expect(pageButton.attributes("href")).toBe("#");
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith(2);
  });

  test("click on next page is disabled on last page", function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 10,
      },
    });
    const nextPageButton = wrapper.find(".fr-pagination__link--next");

    nextPageButton.trigger("click");

    expect(nextPageButton.exists()).toBe(true);
    expect(nextPageButton.attributes("href")).toBeUndefined();
    expect(mockFunction).not.toHaveBeenCalled();
  });

  test("click on next page is working on other page", async function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    const nextPageButton = wrapper.find(".fr-pagination__link--next");

    await nextPageButton.trigger('click');

    expect(nextPageButton.exists()).toBe(true);
    expect(nextPageButton.attributes("href")).toBe("#");
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith(page + 1);
  });


  test("click on last page is disabled on last page", async function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page: 10,
      },
    });
    const lastPageButton = wrapper.find(".fr-pagination__link--last");

    await lastPageButton.trigger('click');

    expect(lastPageButton.exists()).toBe(true);
    expect(lastPageButton.attributes("href")).toBeUndefined();
    expect(mockFunction).not.toHaveBeenCalled();
  });

  test("click on last page is working on other page", async function () {
    /** @type {import("@vue/test-utils").VueWrapper<Pagination>} */
    const wrapper = mount(Pagination, {
      global: {
        mocks: {
          $t(m) {return m;}
        }
      },
      props: {
        changePage: mockFunction,
        totalResults,
        pageSize,
        page,
      },
    });
    const lastPageButton = wrapper.find(".fr-pagination__link--last");

    await lastPageButton.trigger('click');

    expect(lastPageButton.exists()).toBe(true);
    expect(lastPageButton.attributes("href")).toBe("#");
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith(10);
  });
});
