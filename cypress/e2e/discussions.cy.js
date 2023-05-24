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

  it("displays the reuses tab with reuse hash", () => {
    cy.visit("/datasets/" + dataset.id + "/#/community-reuses");
    cy.intercept('**/?(_themes)/**').as('script');
    cy.wait(['@script']);
    cy.get("#resources-panel")
      .should("not.be.visible");
    cy.get("#community-reuses-panel")
      .should("be.visible")
      .should("have.class", "fr-tabs__panel--selected")
      .should("have.attr", "data-fr-js-tab-panel");
  });

  it("displays the discussions tab with dicussions hash", () => {
    cy.visit("/datasets/" + dataset.id + "/#/discussions");
    cy.intercept('**/?(_themes)/**').as('script');
    cy.wait(['@script']);
    cy.get("#resources-panel")
      .should("not.be.visible");
    cy.get("#discussions-panel")
      .should("be.visible")
      .should("have.class", "fr-tabs__panel--selected")
      .should("have.attr", "data-fr-js-tab-panel");
  });

  it("displays the discussions tab with dicussions hash with id", () => {
    cy.visit(`/datasets/${dataset.id}/#/discussions/${dataset.discussion_id}`);
    cy.intercept('**/?(_themes)/**').as('script');
    cy.wait(['@script']);
    cy.get("#resources-panel")
      .should("not.be.visible");
    cy.get("[data-cy=threadFromURL]")
      .should("be.visible");
    cy.get("#discussions-panel")
      .should("be.visible")
      .should("have.class", "fr-tabs__panel--selected")
      .should("have.attr", "data-fr-js-tab-panel");
      cy.get(`[id="discussions/${dataset.discussion_id}"]`)
      .should("be.visible");
  });

  it("displays the discussions tab with old dicussions hash with id", () => {
    cy.visit(`/datasets/${dataset.id}/#discussion-${dataset.discussion_id}`);
    cy.intercept('**/?(_themes)/**').as('script');
    cy.wait(['@script']);
    cy.get("#resources-panel")
      .should("not.be.visible");
    cy.get("[data-cy=threadFromURL]")
      .should("be.visible");
    cy.get("#discussions-panel")
      .should("be.visible")
      .should("have.class", "fr-tabs__panel--selected")
      .should("have.attr", "data-fr-js-tab-panel");
      cy.get(`[id="discussions/${dataset.discussion_id}"]`)
      .should("be.visible");
  });
});

