/// <reference types='cypress' />


describe('view random recommendations page', () => {
	it('should return random recommendation', () => {
		cy.visitRandomPage()

		cy.verifyExistentRecommendation()
	})
})
