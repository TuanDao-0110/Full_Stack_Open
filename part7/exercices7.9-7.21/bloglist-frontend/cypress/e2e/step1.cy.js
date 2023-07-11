const user = {
  name: 'test',
  username: 'test',
  password: '1234',
};
describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`);
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user);
    cy.visit('');
  });
  it('application displays the login form by default.', () => {
    cy.contains('Blogs Application');
    cy.contains('show login').click();
    cy.get('#username');
    cy.get('#password');
    cy.get('#login-button').contains('login');
  });
});
