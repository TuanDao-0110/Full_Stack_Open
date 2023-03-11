const correctUser = {
  name: 'correctUser',
  username: 'correctUser',
  password: '1234'
}
const wrongUser = {
  name: 'wrongUser',
  username: 'wrongUser',
  password: '1234'
}

describe('Make a test for ensuring that other users but the creator do not the delete button.', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    // 1. create 2 new user
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, correctUser)
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, wrongUser)
    cy.visit('')
    cy.login({ username: correctUser.username, password: correctUser.password })

  })
  it('logging with correct user and create new blog and wronguser can not delete it', () => {
    // 1. correct user create new blog and logout
    cy.contains('show add blog').click()
    cy.get('#title').type('new test title')
    cy.get('#author').type('new test author')
    cy.get('#url').type('new test url')
    cy.contains('save').click()
    cy.contains('show add blog').click()
    cy.contains('log out').click()
    // 2. wrong user login vs can not delete
    cy.login({ username: wrongUser.username, password: wrongUser.password })
    cy.contains('new test title by author').parent().find('button').should('contain', 'view').as('theButton')
    cy.get('@theButton').click()
    cy.contains('new test url').find('button').should('contain', 'Remove').as('theRemoveButton')
    cy.get('@theRemoveButton').click()
    cy.contains('show add blog').click()
    cy.contains('log out').click()
    // 3. correct user login vs can delete it:
    cy.login({ username: correctUser.username, password: correctUser.password })
    cy.contains('new test title by author').parent().find('button').should('contain', 'view').as('theButton')
    cy.get('@theButton').click()
    cy.contains('new test url').find('button').should('contain', 'Remove').as('theRemoveButton')
    cy.get('@theRemoveButton').click()
    cy.get('new test url').should('not.exist')
  })
})