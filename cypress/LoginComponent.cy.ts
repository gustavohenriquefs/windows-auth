describe('LoginComponent.cy.ts', () => {

  beforeEach(() => {
    cy.visit('/login')
  })

  it('has the correct title', () => {
    cy.title().should('eq', 'Login');
  })
})