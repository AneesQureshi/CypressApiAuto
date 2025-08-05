console.clear()

describe('Adding a product', () => {
    it('Add a single product from json', () => {
        cy.fixture('product').then((product) => {
            cy.request({
                method: 'POST',
                url: '/products/add',
                body: {
                    title: product.title,
                    price: product.price
                    // You can add more fields here as needed
                }

            }).should((response) => {
                expect(response.status).to.eq(201); // Created
                expect(response.body).to.have.property('id')
                console.log(response.body.id)
                console.log(response)


            })


        })



    })

    it('Add multiple product', () => {
        cy.fixture('productMultiple').then((products) => {
            products.forEach(element => {


                cy.request({
                    method: 'POST',
                    url: '/products/add',
                    body: {
                        title: element.title,
                        price: element.price
                        // You can add more fields here as needed
                    }

                }).should((response) => {
                    expect(response.status).to.eq(201); // Created
                    expect(response.body).to.have.property('id')
                    console.log(response.body.id)
                    console.log(response)


                })


            })

        })

    })
})
