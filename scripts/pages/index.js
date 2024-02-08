import { photographerTemplate } from '../templates/photographer.js';
export async function getPhotographers() {
	// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
	// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
	try {
		// const response = await fetch('../../data/photographers.json');
		// console.log('URL de la requête fetch :', '../../data/photographers.json');

		// const response = await fetch('../data/photographers.json');
		const response = await fetch(
			'https://gizmoux.github.io/Front-End-Fisheye/data/photographers.json'
		);
		// console.log('REPONSE PAGE INDEX.JS', response);

		if (!response.ok) {
			// throw new Error(`Erreur Statut : ${response.status}`);
			console.log('erreur');
		}
		// Réponse en JSON
		const data = await response.json();
		const photographers = data.photographers;
		const mediaPhotographers = data.media;
		// console.log('data PAGE INDEX.JS', data);
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
		// console.error('La section des photographes est introuvable dans le DOM.');
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

// async function displayData(photographers) {
// 	const photographersSection = document.querySelector('.photographer_section');
// 	photographers.forEach(photographer => {
// 		const photographerModel = photographerTemplate(photographer);
// 		const userCardDOM = photographerModel.getUserCardDOM();
// 		photographersSection.appendChild(userCardDOM);
// 	});
// }
