describe('Product CRUD Test with DummyJSON', () => {
  let productId;

  const testProduct = {
    title: 'Test Product',
    price: 123,
    description: 'This is a dummy product created by Cypress',
    category: 'smartphones',
  };

  before(() => {
    // Setup test data
    cy.createProduct(testProduct).then((product) => {
      productId = product.body.id;
      cy.log(`Created product ID: ${productId}`);
    });
  });

  it('should get the created product', () => {
    cy.GetProductbyid(productId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.title).to.eq('Test Product');
    });
  });

  after(() => {
    // Teardown
    if (productId) {
      cy.deleteProduct(productId).then((res) => {
        // Accept both 200 or 404 (already deleted) to avoid assertion error
        expect([200, 404]).to.include(res.status);
        cy.log('Deleted product:', productId);
      });
    }
  });
});