// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('Log',(message)=>{
    return cy.task('logToTerminal', message);
})


Cypress.Commands.add('Login', () => {
  return  cy.request({
      method: 'POST',
      url: '/auth/login',
       retryOnStatusCodeFailure: true,
  timeout: 10000,

      headers: { 'Content-Type': 'application/json' },
      body: {
        username: Cypress.env('userEmail'),     
        password: Cypress.env('password')      
      }
    })
});

Cypress.Commands.add('GetUser',(id)=>{
    return cy.request({
        method:'Get',
        url: `/users/${id}`
    })
})

Cypress.Commands.add('SearchProducts',(product)=>{
    return cy.request({
        method:'Get',
        url: `/products/search?q=${product}`
    })
})
Cypress.Commands.add('createProduct', (product) => {
  return cy.request({
    method: 'POST',
    url: '/products/add',
    body: product,
  });
});

Cypress.Commands.add('addProduct_toCart', (productId, quantity) => {
  return cy.request({
    method: 'POST',
    url: '/products/add',
    headers: { 'Content-Type': 'application/json' },
    body: {
      id: productId,
      quantity: quantity,
    },
  });
});


Cypress.Commands.add('UpdateProductInCart', (productId,quantity) => {
  return cy.request({
   method: 'PUT', /* or PATCH */
    url: `/products/${productId}`,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    merge: true, // this will include existing products in the cart
    products: [
      {
        id: productId,
        quantity: quantity,
      },
    ]
  })
})
})

Cypress.Commands.add('DeleteProductsInCart',(id)=>{
    return cy.request({
        method:'DELETE',
        url: `/Carts/${id}`
    })
})

Cypress.Commands.add('GetProducts',()=>{
    return cy.request({
        method:'Get',
        url: '/Products'
    })
})
Cypress.Commands.add('GetProductbyid',(id)=>{
    return cy.request({
        method:'Get',
        url: `/Products/${id}`
    })
})

Cypress.Commands.add('UpdateProduct',(id,data)=>{
    return cy.request({
        method:'PUT',
        url: `/Products/${id}`,
        body: data
    })
})

Cypress.Commands.add('deleteProduct', (id) => {
  return cy.request({
    method: 'DELETE',
    url: `/Products/${id}`,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('userDetailsfromAuth', (token) => {
  return  cy.request({
      method: 'GET',
      url: 'https://dummyjson.com/auth/me',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Note: 'credentials: include' equivalent is not required in Cypress
    })
  });
