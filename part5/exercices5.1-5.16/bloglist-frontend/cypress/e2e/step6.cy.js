const user = {
  name: 'user',
  username: 'user',
  password: '1234'
}

const blog1 = {
  author: 'author_1', title: 'title_1', url: 'url_1', likes: 1
}
const blog2 = {
  author: 'author_2', title: 'title_2', url: 'url_2', likes: 2
}
const blog3 = {
  author: 'author_3', title: 'title_3', url: 'url_3', likes: 3
}

describe('Make a test that checks that the blogs are ordered according to likes with the blog with the most likes being first.', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    // 1. create 2 new user
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)
    cy.visit('')
    cy.login({ username: user.username, password: user.password })
    cy.addBlog(blog1)
    cy.addBlog(blog2)
    cy.addBlog(blog3)
  })
  it('log in and start add 3 blog', async () => {
    cy.visit('')
    // 1. get 1 like value
    cy.get('.blog').eq(0).should('contain', 'title_1')
    cy.contains('title_1 by author').parent().find('button').should('contain', 'view').as('viewBtn')
    cy.get('@viewBtn').click()
    // 2. get like button
    cy.contains(`${blog1.url}`).parent().contains('likes:').find('button').should('contain', 'like').as('likeBtn')
    cy.get('@likeBtn').click()
    cy.get('@likeBtn').click()
    // 3. after like update to 3, Blog_1 move to 2nd position
    cy.get('.blog').eq(0).should('contain', 'title_2')
    cy.get('.blog').eq(1).should('contain','title_1')

  })
})

