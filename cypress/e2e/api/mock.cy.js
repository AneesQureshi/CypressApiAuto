describe('Mock API response using cy.intercept and cy.request', () => {
  it('should return mocked product', () => {
    // Intercept must come BEFORE request
    cy.intercept('GET', '/products/1', {
      statusCode: 200,
      body: {
        id: 1,
        title: 'Mocked Product',
        price: 99,
      },
    }).as('getMockedProduct')

    // Request AFTER intercept
    cy.request('/products/1').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.title).to.eq('Mocked Product') // ✅ Pass
    })
  })
})
