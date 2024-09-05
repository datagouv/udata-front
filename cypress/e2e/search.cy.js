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
});
