describe('Intercept API and validate mock data using fixture', () => {
  it('should mock GET /products and verify response from intercept', () => {
    cy.intercept('GET', '/products', { fixture: 'mockProduct.json' }).as('getMockedProducts');

    // Use fetch inside `cy.window()` to trigger the request
    cy.window().then((win) => {
      return win.fetch('/products').then((res) => res.json());
    });

    // Now wait for the intercepted request
    cy.wait('@getMockedProducts').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.mockproduct).to.have.length(2);
      expect(interception.response.body.mockproduct[0].title).to.eq('Mocked Product A');
    });
  });
});
