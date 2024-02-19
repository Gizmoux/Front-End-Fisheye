import { photographerTemplate } from '../templates/photographer.js';
export async function getPhotographers() {
	// Fetch de données dans le fichier /data/photographers.json
	try {
		// const response = await fetch('../data/photographers.json');
		const response = await fetch(
			'https://gizmoux.github.io/Front-End-Fisheye/data/photographers.json'
		);
		// console.log('REPONSE PAGE INDEX.JS', response);

		if (!response.ok) {
			console.log('erreur');
		}
		// Réponse en JSON
		const data = await response.json();
		const photographers = data.photographers;
		const mediaPhotographers = data.media;

		// console.log('mediaPhotographers PAGE INDEX.JS', mediaPhotographers);

		// Retournez les données récupérées
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
