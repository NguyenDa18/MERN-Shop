const nameErrMsg = 'Name must be 3-15 characters long';
const pwdErrMsg = 'Password must be at least 6 characters';

context('Test with fake account', () => {
  it('Test unsuccessful signups', () => {
    cy.visit('http://localhost:3000');
    cy.contains('MERN Shop');
    cy.contains('Signup').click();
    cy.url().should('include', '/signup');
  });

  it('Test sign up with too short name', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('input[name="name"]').type('h');
    cy.get('input[name="email"]').type('h@yahoo.com');
    cy.get('input[name="password"]').type('h');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.contains(nameErrMsg);
  });

  it('Test sign up with too short password', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('input[name="name"]').type('John');
    cy.get('input[name="email"]').type('h@yahoo.com');
    cy.get('input[name="password"]').type('h');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.contains(pwdErrMsg);
  });
});
