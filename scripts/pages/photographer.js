// // Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from './index.js';
// import { displayData } from '../pages/index.js';
import { photographerTemplate } from '../templates/photographer.js';
const urlParams = new URLSearchParams(window.location.search);
const photographerIdURL = parseInt(urlParams.get('id'));
console.log('photographerIdURL', photographerIdURL);
console.log('urlParams', urlParams);

const fetchDataPhotographer = async () => {
	try {
		// Utilisez getPhotographers pour récupérer les données
		const { photographers } = await getPhotographers();
		console.log('PHOTOGRAPHERS PAGE PHOTOGRAPHER.JS', photographers);

		// Trouver le photographe avec l'ID correspondant dans les données récupérées
		const selectedPhotographer = photographers.find(
			photographer => photographer.id === photographerIdURL
		);

		if (selectedPhotographer) {
			const mainElement = document.querySelector('.photograph-header');
			//Ajouter une div pour flex entre nom pays et prez
			const divMainElement = document.createElement('div');
			divMainElement.classList.add('photograph-presentation');
			// Appeler la fonction qui affiche les détails du photographe
			const { getUserCardDOM } = photographerTemplate(selectedPhotographer);
			mainElement.appendChild(getUserCardDOM());
			mainElement.appendChild(divMainElement);

			console.log('Détails du photographe sélectionné :', selectedPhotographer);
		} else {
			console.error("Photographe non trouvé avec l'ID spécifié.");
		}
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des données du photographe :',
			error
		);
	}
};

// Appeler la fonction pour récupérer et afficher les données du photographe
fetchDataPhotographer();

// const urlParams = new URLSearchParams(window.location.search);
// const photographerIdURL = parseInt(urlParams.get('id'));
// console.log('photographerIdURL', photographerIdURL);
// console.log('urlParams', urlParams);
// async function fetchDataAndDisplay() {
// 	try {
// 		const data = await fetchData();
// 		displayData(data);
// 	} catch (error) {
// 		console.error('Une erreur est survenue :', error);
// 	}
// }
// // Appeler fetchDataAndDisplay au lieu de getDataPhotographer
// fetchDataAndDisplay();
// async function fetchData() {
// 	try {
// 		const response = await fetch('../../data/photographers.json');
// 		console.log('REPONSE', response);

// 		if (!response.ok) {
// 			throw new Error(`Erreur Statut : ${response.status}`);
// 		}

// 		const data = await response.json();
// 		const selectedPhotographer = data.photographers.find(
// 			element => element.id === photographerIdURL
// 		);
// 		console.log(
// 			'Détails du photographe sélectionné :',
// 			selectedPhotographer,
// 			selectedPhotographer.name
// 		);
// 		console.log('DATA', data.photographers);
// 		return {
// 			photographers: data.photographers,
// 			selectedPhotographer: selectedPhotographer,
// 		};
// 	} catch (error) {
// 		console.error('Erreur lors de la récupération des photographes :', error);
// 	}
// }

// async function displayData(selectedPhotographer) {
// 	const photographersSection = document.querySelector('.photograph-header');

// 	selectedPhotographer.forEach(photographer => {
// 		const photographerModel = createPhotographerTemplate(photographer);
// 		const userCardDOM = photographerModel.getUserCardDOM();
// 		photographersSection.appendChild(userCardDOM);
// 	});
// }

// function createPhotographerTemplate(data) {
// 	const { name, portrait, city, tagline, price, country, id } = data;
// 	const picture = `assets/photographers/${portrait}`;

// 	function getUserCardDOM() {
// 		const mainElement = document.querySelector('.photograph-header');
// 		const h2 = document.createElement('h2');
// 		mainElement.style.background = 'red';
// 		h2.textContent = 'NIcolas';
// 		mainElement.appendChild(h2);
// 	}

// 	return { id, name, picture, getUserCardDOM };
// }
// const urlParams = new URLSearchParams(window.location.search);
// const photographerIdURL = parseInt(urlParams.get('id'));
// console.log('photographerIdURL', photographerIdURL);
// console.log('urlParams', urlParams);
// async function getAllData() {
// 	try {
// 		const response = await fetch('./data/photographers.json');
// 		if (!response.ok) {
// 			throw new Error(
// 				'Erreur lors de la récupération des données des photographes.'
// 			);
// 		}
// 		const data = await response.json();

// 		return data;
// 	} catch (error) {
// 		console.error(error);
// 		return [];
// 	}
// }
// async function findingPhotographId() {
// 	const data = await getAllData();

// 	const selectedPhotographer = data.photographers.find(
// 		element => element.id === photographerIdURL
// 	);
// 	const mainElement = document.querySelector('.photograph-header');
// 	const h2 = document.createElement('h2');
// 	const h3 = document.createElement('h3');
// 	const paragraphe = document.createElement('p');
// 	const img = document.createElement('img');

// 	mainElement.style.background = 'red';

// 	h2.textContent = selectedPhotographer.name;
// 	h3.textContent = `${selectedPhotographer.city}, ${selectedPhotographer.country}`;
// 	paragraphe.textContent = selectedPhotographer.tagline;
// 	img.setAttribute(
// 		'src',
// 		`assets/photographers/${selectedPhotographer.portrait}`
// 	);
// 	img.style.width = '300px';
// 	mainElement.appendChild(h2);
// 	mainElement.appendChild(h3);
// 	mainElement.appendChild(paragraphe);
// 	mainElement.appendChild(img);

// 	console.log('Détails du photographe sélectionné :', selectedPhotographer);
// 	return selectedPhotographer;
// }
// async function photographInit() {
// 	try {
// 		const photographerToDisplay = await findingPhotographId();

// 		// displayPhotographer(photographerToDisplay);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }
// photographInit();
