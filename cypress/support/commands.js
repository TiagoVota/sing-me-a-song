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

const FRONT_BASE_URL = 'http://localhost:3000'
const BACK_BASE_URL = 'http://localhost:5000'
const RECOM_BASE_URL = `${BACK_BASE_URL}/recommendations`


Cypress.Commands.add('createInvalidRecommendation', () => {
	cy.visit(FRONT_BASE_URL)

	cy.get('button').click()
})


Cypress.Commands.add('createRecommendation', (recommendationInfo) => {
	const { name, youtubeLink } = recommendationInfo

	cy.visit(FRONT_BASE_URL)

	cy.get('input[placeholder=\'Name\']').type(name)
	cy.get('input[placeholder=\'https://youtu.be/...\']').type(youtubeLink)

	cy
		.intercept('POST', RECOM_BASE_URL)
		.as('cyCreatedRecommendation')

	cy.get('button').click()

	cy.wait('@cyCreatedRecommendation')
})


Cypress.Commands.add('verifyErrorAlert', () => {
	cy.on('window:alert', (text) => {
		expect(text).to.contains('Error creating recommendation!')
	})
})


Cypress.Commands.add('upvoteRecommendation', (recommendationName) => {
	cy.contains(recommendationName)
		.get('article')
		.get('#upvote')
		.click()

	cy.contains(recommendationName)
		.get('article')
		.get('#scoreBox')
		.should('have.text', '1')
})


Cypress.Commands.add('downvoteRecommendation', (recommendationName) => {
	cy.contains(recommendationName)
		.get('article')
		.get('#downvote')
		.click()

	cy.contains(recommendationName)
		.get('article')
		.get('#scoreBox')
		.should('have.text', '-1')
})


Cypress.Commands.add('deleteRecommendation', (recommendationName) => {
	cy.contains(recommendationName)
		.get('article')
		.get('#downvote')
		.click()
		.click()
		.click()
		.click()
		.click()
		.click()
})


Cypress.Commands.add('visitTopPage', () => {
	cy.visit(FRONT_BASE_URL)

	cy.contains('Top').click()

	cy.url().should('equal', `${FRONT_BASE_URL}/top`)
})


Cypress.Commands.add('compareFirstAndLastScore', () => {
	let [ highScore, lowScore ] = [-6, -5]
	cy
		.get('article:first-of-type')
		.get('#scoreBox')
		.should(($div) => {
			highScore = $div.text()
		})

	cy.reload()
	
	cy
		.get('article:last-of-type')
		.get('#scoreBox')
		.should(($div) => {
			lowScore = $div.text()
			expect(Number(highScore)).gte(Number(lowScore))
		})

})


Cypress.Commands.add('visitRandomPage', () => {
	cy.visit(FRONT_BASE_URL)

	cy.contains('Random').click()

	cy.url().should('equal', `${FRONT_BASE_URL}/random`)
})


Cypress.Commands.add('verifyExistentRecommendation', () => {
	cy.get('article').should('be.visible')
})
