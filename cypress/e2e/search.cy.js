import organization from '../fixtures/organization.json';

describe("Testing organization search page", () => {
  beforeEach(() => {
    cy.intercept('**/?(_themes)/**').as('script')
    cy.intercept('**/api/**').as('request')
    cy.visit("/organizations/" + organization.id, {
      onBeforeLoad(window) {
        // spy on the "pushState" method
        cy.spy(window.history, 'pushState').as('pushState');
      },
    });
    cy.injectAxe()
    cy.wait(['@script'])
    const input = '[data-cy="search"] input[data-cy="search-input"]';
    cy.get(input).as('input');
  });

  it("triggers search when typing", () => {
    const typed = "some string";
    cy.get('[aria-controls="datasets-panel"]').click();
    cy.get('@input')
      .type(typed);
    cy.wait(['@request']);
  });

  it("always adds organization to request", () => {
    const typed = "some string";
    const typed_next = "another string";
    cy.get('[aria-controls="datasets-panel"]').click();
    cy.get('@input')
      .type(typed);
    cy.intercept('**/api/2/datasets/search/*', (req) => {
      expect(req.query).to.have.property("organization");
      req.continue();
    });
    cy.wait(['@request']);
    cy.wait(2000);
    cy.get('@pushState')
      .should('have.been.called', 2);
    cy.get('@input')
      .clear()
      cy.wait(2000);
    cy.get('@input')
      .type("{backspace}{backspace}{backspace}");
    cy.wait(['@request']);
    cy.wait(2000);
    cy.get('@pushState')
      .should('have.been.called', 3);
    cy.get('@input')
      .type(typed_next);
    cy.wait(['@request']);
  });
});
