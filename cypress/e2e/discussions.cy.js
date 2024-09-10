import dataset from '../fixtures/dataset.json';

describe("Testing discussion links", () => {
  it("displays the dataset page without hash", () => {
    cy.visit("/datasets/" + dataset.id);
    cy.intercept('**/?(_themes)/**').as('script');
    cy.wait(['@script']);
    cy.get("h1")
      .should("be.visible")
      .should("include.text", dataset.title);
    cy.get("#resources-panel")
      .should("be.visible")
      .should("have.class", "fr-tabs__panel--selected")
      .should("have.attr", "data-fr-js-tab-panel");
  });
});

