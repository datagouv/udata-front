describe("Testing home page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("Displays the home page title", () => {
    cy.get("h1").should("be.visible");
  });

  it("Has no detectable critical a11y violations on load", () => {
    cy.checkA11y(null, {
      includedImpacts: ["critical"],
    });
  });
});

describe("Testing search bar", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });
  const input = 'input[data-cy="search-input"]';
  it("Show you a search bar", () => {
    cy.get(input).should("be.visible");
  });

  it("Open popup as you type", () => {
    cy.get(input)
      .type("some string")
      .get(input)
      .should('have.attr', 'aria-expanded', 'true');
  });
});
