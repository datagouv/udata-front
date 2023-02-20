describe("Testing registration page", () => {
  beforeEach(() => {
    cy.visit("/register");
    cy.intercept('**/?(_themes)/**').as('script')
    cy.wait(['@script'])
    cy.on('uncaught:exception', (e) => {
      // We don't want cypress to fail on an aborted request
      if (e.message.includes('Request aborted')) {
        return false
      }
    })
  });

  it("displays the register page and form", () => {
    cy.get("h1").should("be.visible");
    cy.get("form").should("be.visible");
  });

  it("displays the form captcha", () => {
    cy.get("#BDC_CaptchaComponent").should("be.visible");
  });

  it("injects the captcha id", () => {
    cy.get("input[name=captcha_id]").should("exist");
  });

  it("displays captcha error", () => {
    cy.get("input[name=email]").type('something@email.com');
    cy.get("input[name=password]").type('Aaaaaa123456$');
    cy.get("input[name=password_confirm]").type('Aaaaaa123456$');
    cy.get("input[name=first_name]").type('john');
    cy.get("input[name=last_name]").type('doe');
    cy.get("input[name=accept_conditions]").check({force: true});

    cy.get("form[data-cy=register]").submit();
    cy.get(".fr-error-text").should("exist");
  });
});
