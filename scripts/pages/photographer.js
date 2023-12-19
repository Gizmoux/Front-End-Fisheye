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
		const { photographers, mediaPhotographers } = await getPhotographers();

		// Trouver le photographe avec l'ID correspondant dans les données récupérées
		const selectedPhotographer = photographers.find(
			photographer => photographer.id === photographerIdURL
		);
		const selectedMediaPhotographer = mediaPhotographers
			.filter(media => media.photographerId === photographerIdURL)
			.map(element => {
				return element.title;
			});
		console.log('selectedMediaPhotographer', selectedMediaPhotographer);

		if (selectedPhotographer) {
			const mainElement = document.querySelector('.photograph-header');
			const divMediaElement = document.createElement('div');
			const divMainElement = document.createElement('div');
			divMediaElement.classList.add('photograph-media');
			divMainElement.classList.add('photograph-presentation');

			// Appeler la fonction qui affiche les détails du photographe
			const { getUserCardDOM } = photographerTemplate(selectedPhotographer);

			mainElement.appendChild(getUserCardDOM());
			mainElement.appendChild(divMainElement);

			selectedMediaPhotographer.forEach(media => {
				const img = document.createElement('img');
				const picture = `assets/images/${media.image}`;
				console.log('PICTUREE', picture);
				// console.log('media.photographerId', photographerId);
				img.setAttribute('src', picture);
				divMediaElement.appendChild(img);
			});
			selectedMediaPhotographer.forEach(title => {
				const p = document.createElement('p');
				p.textContent = title;
				divMediaElement.appendChild(p);
			});

			// Ajouter divMediaElement au DOM
			mainElement.appendChild(divMediaElement);
			console.log('selectedMediaPhotographer2', selectedMediaPhotographer);
			console.log('Détails du photographe sélectionné :', selectedPhotographer);
		} else {
			console.error("Photographe non trouvé avec l'ID spécifié.");
		}
	} catch (error) {
		console.log(error);
	}
};

// Appeler la fonction pour récupérer et afficher les données du photographe
fetchDataPhotographer();

// Factory pour Media
// const mediaFactory = () => {
// 	selectedMediaPhotographer.map(elem => {
// 		return elem.image;
// 	});
// };
