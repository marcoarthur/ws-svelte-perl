context('Progress Bars', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });


  // find 3 progress bar
  it('have three types of progess bar', () => {
    cy.get('.progress-1').should('have.length', 3);
  });

  // find websocket progress bar
  // body > div.ws-pbar > div > svg > text
  it('websocket progress bar', () => {
    cy.get('div.ws-pbar div > svg > text.percent').should('have.length', 1);
  });

});
