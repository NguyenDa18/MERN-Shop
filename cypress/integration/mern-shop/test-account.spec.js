context('Test with fake account', () => {
  it('Tests home page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('MERN Shop');
    cy.visit('http://localhost:3000/?page=2');
  });
});
