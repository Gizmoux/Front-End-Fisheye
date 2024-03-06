import { photographerTemplate } from '../templates/photographer.js';
export async function getPhotographers() {
	try {
		// const response = await fetch('../data/photographers.json');
		const response = await fetch(
			'https://gizmoux.github.io/Front-End-Fisheye/data/photographers.json'
		);
		if (!response.ok) {
			console.log('erreur');
		}
		const data = await response.json();
		const photographers = data.photographers;
		const mediaPhotographers = data.media;
		return {
			photographers: photographers,
			mediaPhotographers: mediaPhotographers,
		};
	} catch (error) {
		console.error('Erreur lors de la récupération des photographes :', error);
		return {
			photographers: [],
		};
	}
}

async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');
	if (photographersSection === null) {
		return;
	}
	photographers.forEach(photographer => {
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();
