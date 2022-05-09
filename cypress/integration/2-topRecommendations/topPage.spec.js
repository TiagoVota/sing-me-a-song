/// <reference types='cypress' />


describe('view top recommendations', () => {
	it('should return recommendations order by score', () => {
		cy.visitTopPage()
    
		cy.compareFirstAndLastScore()

		cy.end()
	})
})
