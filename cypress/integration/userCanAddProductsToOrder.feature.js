

describe('User can add products to his/her order', () => {

    before(() => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'http://localhost:3000/api/products',
            response: 'fixture:menu_data.json'
        })

        cy.route({
            method: 'POST',
            url: 'http://localhost:3000/api/orders',
            response: { message: 'The product has been added to your order'}
        })
    });

    it('user gets a confirmation message when adding to order', () => {
        cy.visit('http://localhost:3001')
        cy.get('#product-1').within(()=>{
            cy.get('button').contains('Add to order').click()
        })
        cy.wait(500)
        cy.get('#product-1').within(()=>{
            cy.get(' .message').should('contain', "The product has been added to your order")
        })
    });

});