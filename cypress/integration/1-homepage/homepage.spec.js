/// <reference types='cypress' />


import { recommendationBodyFactory } from '../factories/recommendationFactory'


describe('post recommendation', () => {
	it('should advise a invalid insert body', () => {
		cy.createInvalidRecommendation()
		cy.verifyErrorAlert()

		cy.end()
	})

	it('should create a recommendation', () => {
		const recommendation = recommendationBodyFactory()

		cy.createRecommendation(recommendation)
		cy.contains(recommendation.name)

		cy.end()
	})

	it('should advise conflict recommendation error', () => {
		const recommendation = recommendationBodyFactory()

		cy.createRecommendation(recommendation)
		cy.createRecommendation(recommendation)
		cy.verifyErrorAlert()

		cy.end()
	})
})


describe('upvote recommendation', () => {
	it('should increase recommendation', () => {
		const recommendation = recommendationBodyFactory()

		cy.createRecommendation(recommendation)
		cy.upvoteRecommendation(recommendation.name)

		cy.end()
	})
})


describe('downvote recommendation', () => {
	it('should decrease recommendation', () => {
		const recommendation = recommendationBodyFactory()

		cy.createRecommendation(recommendation)
		cy.downvoteRecommendation(recommendation.name)

		cy.end()
	})
	
	it('should remove recommendation within -5 score', () => {
		const recommendation = recommendationBodyFactory()
	
		cy.createRecommendation(recommendation)
		cy.deleteRecommendation(recommendation.name)
	
		cy.end()
	})
})

