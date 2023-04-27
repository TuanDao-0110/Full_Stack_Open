const user = {
  name: 'test',
  username: 'test',
  password: '1234'
}


describe('when logged in and create new blog', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)
    cy.visit('')
    cy.login({ username: user.username, password: user.password })
  })
  it('new blogs can be created and delete', () => {
    cy.contains('show add blog').click()
    cy.contains('new blog')
    cy.get('#title').type('new test title')
    cy.get('#author').type('new test author')
    cy.get('#url').type('new test url')
    cy.contains('save').click()
    // open view button
    cy.contains('new test title by author').parent().find('button').should('contain', 'view').as('theButton')
    cy.get('@theButton').click()
    cy.get('@theButton').should('not.contain', 'view')
    cy.get('@theButton').should('contain', 'close')
    // button
    // const button = cy.contains('like')
    // button.click()
    // debugger
    // cy.contains('logout').click()
    // cy.get('button').then(buttons => {
    //   console.log('number of buttons', buttons.length)
    //   cy.wrap(buttons[0]).click()
    // })
  })

})


