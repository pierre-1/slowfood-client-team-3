describe('user views menus', () => {

	beforeEach(() => {
		cy.visit("http://localhost:3001")
	});

	describe('when there are products', () => {
		before(() => {
			cy.server();
			cy.route({
				method: 'GET',
				url: 'http://localhost:3000/api/products',
				response: 'fixture:menu_data.json'
			})
		})

		it('successfully', () => {
			cy.get('#index').within(() => {
				cy.contains('Gravad lax')
				cy.contains('Sill')
				cy.contains('Varmrökt lax')
			})
		})
	});

	describe('when the are NO products', () => {

		before(() => {
			cy.server();
			cy.route({
				method: 'GET',
				url: 'http://localhost:3000/api/products',
				response: []
			})
		})

		it('unsuccessfully', () => {
			cy.get('#index').should('not.exist')
		})
	});
})