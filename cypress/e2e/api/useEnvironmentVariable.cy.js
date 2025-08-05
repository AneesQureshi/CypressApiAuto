describe('Using Environment Variables', () => {
  it('Login', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
       retryOnStatusCodeFailure: true,
  timeout: 10000,

      headers: { 'Content-Type': 'application/json' },
      body: {
        username: Cypress.env('userEmail'),     
        password: Cypress.env('password')      
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.task('logToTerminal', response.body);
    });
  });
});
