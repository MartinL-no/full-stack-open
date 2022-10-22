describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('root')
      cy.get('#password-input').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('root')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })
})

// describe('Note app', function() {
//   beforeEach(function() {
//     cy.request('POST', 'http://localhost:3001/api/testing/reset')
//     const user = {
//       name: 'Superuser',
//       username: 'root',
//       password: 'salainen'
//     }

//     cy.request('POST', 'http://localhost:3001/api/users/', user)
//     cy.visit('http://localhost:3000')
//   })

//   it('front page can be opened', function() {
//     cy.contains('Notes')
//     cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
//   })

//   it('login form can be opened', function() {
//     cy.contains('login').click()
//   })

//   it('user can login', function () {
//     cy.contains('login').click()
//     cy.get('input:first').type('root')
//     cy.get('input:last').type('salainen')
//     cy.get('#login-button').click()

//     cy.contains('Superuser logged in')
//   })

//   describe('when logged in', function() {
//     beforeEach(function() {
//       cy.login({ username: 'root', password: 'salainen' })
//     })

//     it('a new note can be created', function() {
//       cy.get('#new-note-button').click()
//       cy.get('input').type('a note created by cypress')
//       cy.contains('save').click()
//       cy.contains('a note created by cypress')
//     })

//     describe('and a note exists', function () {
//       beforeEach(function () {
//         cy.createNote({ content: 'first note', important: false })
//         cy.createNote({ content: 'second note', important: false })
//         cy.createNote({ content: 'third note', important: false })
//       })

//       it('it can be made important', function () {
//         it('one of those can be made important', function () {
//           cy.contains('second note').parent().find('button').click()
//           cy.contains('second note').parent().find('button')
//             .should('contain', 'make not important')
//         })
//       })
//     })
//   })

//   it('login fails with wrong password', function() {
//     cy.contains('login').click()
//     cy.get('#username').type('mluukkai')
//     cy.get('#password').type('wrong')
//     cy.get('#login-button').click()

//     cy.get('.error')
//       .should('contain', 'wrong credentials')
//       .and('have.css', 'color', 'rgb(255, 0, 0)')
//       .and('have.css', 'border-style', 'solid')

//     cy.get('html').should('not.contain', 'Superuser logged in')
//   })
// })