
console.clear()


describe('Crud using custom commands', () => {
    let productId;


    
    it('Add Product', () => {
        
        cy.createProduct({
            title: 'Custom Command Product',
            price: 999
        }).then((response) => {
            expect(response.status).to.eq(201);
            productId = response.body.id;
            cy.task('logToTerminal', response.body);
        })


    })

     it('Get product', () => {
        cy.GetProducts().then((response) => {
            expect(response.status).to.eq(200);
           cy.task('logToTerminal', response.body);
        })


    })

     
    
    
    it.only('Get product by id', () => {
        cy.GetProductbyid(1).then((response) => {
            expect(response.status).to.eq(200);
           // productId = response.body.id;
            cy.task('logToTerminal', response.body);
        })
    })

     it.only('Update product', () => {
        cy.UpdateProduct(2,{
     title :'Updated title'


        }).then((response) => {
            expect(response.status).to.eq(200);
            productId = response.body.id;
            cy.task('logToTerminal', response.body);
        })


    })
     it.only('Delete product', () => {
       cy.deleteProduct(2).then((response) => {
            expect(response.status).to.eq(200);
            productId = response.body.id;
            cy.task('logToTerminal', response.body);
        })


    })
})

