describe('open the cypress website', () => {
  it('enter yt url', () => {
    cy.visit('https://docs.cypress.io/guides/tooling/typescript-support')
    cy.get('button.clean-btn.tocCollapsibleButton_TO0P');
  })
})
