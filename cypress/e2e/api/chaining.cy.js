/// <reference types="cypress" />

describe('Cart Flow', () => {
    let userId;
    let productsArray = [];

    it('Login user and fetch Token', () => {
        cy.Login().then((response) => {
            expect(response.status).to.eq(200);
            cy.Log(response.body);

            userId = response.body.id;
            cy.log(`User ID: ${userId}`);
        });
    });

    it('Get logged-in user details', () => {
        cy.GetUser(userId).then((response) => {
            expect(response.status).to.eq(200);
            cy.Log(response.body);
        });
    });

    it('Search products', () => {
        cy.SearchProducts('phone').then((response) => {
            expect(response.status).to.eq(200);
            cy.Log(response.body);
            productsArray = response.body.products;
        });
    });

    it('Add 4 products to cart with increasing quantity', () => {
        const selectedProducts = productsArray.slice(0, 4);
        cy.wrap(selectedProducts).each((product, index) => {
            const quantity = index + 1;

            cy.addProduct_toCart(product.id, quantity).then((response) => {
                expect(response.status).to.eq(201);
                cy.log(`Added Product ID: ${product.id}`);
                cy.task('logToTerminal', `Added Product ID: ${product.id}, Quantity: ${quantity}`);
            });
        });
    });

    it('Update same 4 products with new quantity', () => {
        const selectedProducts = productsArray.slice(0, 4);
        cy.wrap(selectedProducts).each((product, index) => {
            const quantity = index + 2;

            cy.UpdateProductInCart(product.id, quantity).then((response) => {
                expect(response.status).to.eq(200);
                cy.log(`Updated Product ID: ${product.id}`);
                cy.task('logToTerminal', `Updated Product ID: ${product.id}, Quantity: ${quantity}`);
            });
        });
    });

    it('Get first product by ID', () => {
        const firstProduct = productsArray[0];
        cy.GetProductbyid(firstProduct.id).then((response) => {
            expect(response.status).to.eq(200);
            cy.Log(response.body);
        });
    });

    it('Delete first product from cart only', () => {
        const selectedProducts = productsArray.slice(0, 4);
        
        // This needs to check that valid existed ids are only from 1 to 20 in dummy json 
        cy.request('/carts').then((response) => {
  const ids = response.body.carts.map(c => c.id);
  cy.log(`Valid Cart IDs: ${ids.join(', ')}`);
});

        
        
        cy.wrap(selectedProducts).each((product, index) => {
            if (index === 0) {
                cy.DeleteProductsInCart(1, { failOnStatusCode: false }).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(`Deleted Product ID: ${product.id}`);
                    cy.task('logToTerminal', `Deleted Product ID: ${product.id}`);
                });
            }
        });



    });
});
