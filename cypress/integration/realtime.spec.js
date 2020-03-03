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

