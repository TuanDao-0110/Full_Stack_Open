const user = {
  name: 'test',
  username: 'test',
  password: '1234'
}
describe('loggin succcess', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)
    cy.visit('')
  })
  it('front page can be opened', () => {
    cy.contains('Blogs Application')
    cy.contains('show login')
  })
  it('user con login', function () {
    cy.login({ username: user.username, password: user.password })
    cy.contains('Blogs Application')
  })
})