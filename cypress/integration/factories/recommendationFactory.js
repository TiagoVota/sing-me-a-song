import { faker } from '@faker-js/faker'


const recommendationBodyFactory = (bodyInfo) => {
	const fakerName = faker.name.firstName()
	const fakerYoutubeLink = 'https://www.youtube.com/watch?v=chwyjJbcs1Y'

	const body = {
		name: bodyInfo?.name ?? fakerName,
		youtubeLink: bodyInfo?.youtubeLink ?? fakerYoutubeLink,
	}

	return body
}


export {
	recommendationBodyFactory,
}
