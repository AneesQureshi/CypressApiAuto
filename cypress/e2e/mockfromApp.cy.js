describe('Intercept app-initiated fetch', () => {
  it('mocks fetch request from app', () => {
    cy.intercept('GET', '/products/1', {
      statusCode: 200,
      body: {
        id: 1,
        title: 'Mocked Product',
        price: 99,
      },
    }).as('getProduct');

    cy.visit('cypress/fixtures/mock-app.html');
    
    cy.wait('@getProduct').its('response.body.title').should('eq', 'Mocked Product');
  });
});
