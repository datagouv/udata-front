describe("Testing home page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("displays the home page title", () => {
    cy.get("h1").should("be.visible");
  });

  it("has no detectable critical a11y violations on load", () => {
    cy.checkA11y(null, {
      includedImpacts: ["critical"],
    });
  });
});
