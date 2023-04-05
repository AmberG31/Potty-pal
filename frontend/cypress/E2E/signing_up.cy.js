describe('Signing up', () => {
  it("with valid credentials, redirects to '/layout'", () => {
    cy.visit('/signup');
    cy.get('#email').type('someone@example.com');
    cy.get('#username').type('someone');
    cy.get('#password').type('password');
    cy.get('#submit-signup').click();

    cy.url().should('include', '/');
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit('/signup');
    cy.get('#email').type('someone@example.com');
    cy.get('#submit-signup').click();

    cy.url().should('include', '/signup');
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit('/signup');
    cy.get('#password').type('password');
    cy.get('#submit-signup').click();

    cy.url().should('include', '/signup');
  });
});
