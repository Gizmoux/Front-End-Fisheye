import { photographerTemplate } from '../templates/photographer.js';
export async function getPhotographers() {
	// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
	// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
	try {
		const response = await fetch('../../data/photographers.json');
		// console.log('REPONSE PAGE INDEX.JS', response);
		if (!response.ok) {
			throw new Error(`Erreur Statut : ${response.status}`);
		}
		// Réponse en JSON
		const data = await response.json();
		const photographers = data.photographers;
		const mediaPhotographers = data.media;
		// console.log('DATA.MEDIA', mediaPhotographers);

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

	// et bien retourner le tableau photographers seulement une fois récupéré
	// return {
	// 	photographers: [
	// 		...photographers,
	// 		...photographers,
	// 		...photographers,
	// 		...photographers,
	// 	],
	// };
}

const photographersSection = document.querySelector('.photographer_section');
export async function displayData(photographers) {
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
