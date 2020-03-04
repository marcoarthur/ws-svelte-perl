context('Progress Bars', () => {
  beforeEach(() => {
    let url = Cypress.env('MOJO_APP_URL') || 'http://localhost:3000';
    cy.visit(url)
  });


  // find 3 progress bar
  it('have three types of progess bar', () => {
    cy.get('.progress-1').should('have.length', 3);
  });

  // find websocket progress bar
  // body > div.ws-pbar > div > svg > text
  it('websocket progress bar', () => {
    cy
      .get('div.ws-pbar div > svg > text')
      .should( ($t) => {
	expect($t.first()).to.contain('0%');
	}
      )
      .wait(13000)
      .then( ($t) => {
	expect($t).to.have.text('100%');
      });
  });

});

