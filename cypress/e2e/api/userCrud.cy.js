
const baseUrl = Cypress.env('baseUrl');

describe('GET Products', () => {
    it('should return a list of all products', () => {
        cy.request('/products').then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.products).to.have.length.above(0)
            console.log(res.body.products[0].id)
        })
    })
})

describe('Get Product id with chaining', () => {
    it('First get all products then get product by first it', () => {
        cy.request('/products').then((res) => {
            expect(res.status).to.eq(200)
            const id = res.body.products[1].id
            console.log(id)
            cy.request(`/products/${id}`).its('status').should('eq', 200)
        })
    })
})

describe('Adding a product', () => {
    it('Add a product', () => {
        cy.request({
            method: 'POST',
            url: '/products/add',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'BMW Pencil1',

                /* other product data */
            })

        }).should((response) => {
            expect(response.status).to.eq(201); // Created
            expect(response.body).to.have.property('id')
            console.log(response.body.id)
            console.log(response)


        })
    })
})

describe('PUT update product', () => {
  it('should update the product', () => {
    cy.request({
      method: 'PUT',
      url: '/products/1',
      body: {
        title: "Updated Product",
      },
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.title).to.eq("Updated Product")
      console.log(res.body.id)
      console.log(res)
    })
  })
})


describe('DELETE product', () => {
  it('should delete product', () => {
    cy.request({
      method: 'DELETE',
      url: '/products/1',
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('isDeleted', true)
    })
  })
})
