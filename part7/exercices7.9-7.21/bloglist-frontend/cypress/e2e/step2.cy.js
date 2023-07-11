describe('logging fail', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it.only('login fail with wrong password', () => {
    cy.contains('show login').click();
    cy.get('#username').type('test');
    cy.get('#password').type('wrong pwd');
    cy.get('#login-button').click();
    cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('html').should('not.contain', 'test logged in');
  });
});
