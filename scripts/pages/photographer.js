// // Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from './index.js';
import { photographerTemplate } from '../templates/photographer.js';
const urlParams = new URLSearchParams(window.location.search);
const photographerIdURL = parseInt(urlParams.get('id'));

// console.log('photographerIdURL', photographerIdURL);
// console.log('urlParams', urlParams);

const fetchDataPhotographer = async () => {
	try {
		// Utilisez getPhotographers pour récupérer les données
		const { photographers } = await getPhotographers();
		// Trouver le photographe avec l'ID correspondant dans les données récupérées
		const selectedPhotographer = photographers.find(
			photographer => photographer.id === photographerIdURL
		);
		if (selectedPhotographer) {
			const mainElement = document.querySelector('.photograph-header');
			const divMediaElement = document.createElement('div');
			const divMainElement = document.createElement('div');
			// Appeler la fonction qui affiche les détails du photographe
			const { getUserCardDOM } = photographerTemplate(selectedPhotographer);
			mainElement.appendChild(getUserCardDOM());
			mainElement.appendChild(divMainElement);
			mainElement.appendChild(divMediaElement);

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

const mediaContainer = document.querySelector('.media-container');
async function createMedia() {
	const { mediaPhotographers } = await getPhotographers();
	const selectedMediaPhotographer = mediaPhotographers
		.filter(media => media.photographerId === photographerIdURL)
		.forEach(media => {
			const divCard = document.createElement('div');
			divCard.classList.add('divCard');
			const p = document.createElement('p');
			p.textContent = media.title;

			const likesElement = document.createElement('p');
			likesElement.textContent = `Likes: ${media.likes}`;
			if (media.image) {
				const imageElement = document.createElement('img');
				imageElement.src = `assets/images/${photographerIdURL}/${media.image}`;
				imageElement.alt = media.title;
				divCard.appendChild(imageElement);
			} else if (media.video) {
				const videoElement = document.createElement('video');
				videoElement.src = `assets/images/${photographerIdURL}/${media.video}`;
				videoElement.controls = true;
				divCard.appendChild(videoElement);
			}
			mediaContainer.appendChild(divCard);
			divCard.appendChild(p);
			divCard.appendChild(likesElement);
		});

	// const filterOptions = document.getElementById('filter-button');

	console.log('selectedMediaPhotographerTITLE', selectedMediaPhotographer);
	console.log('mediaPhotographers', mediaPhotographers);
}
createMedia();

// Bouton Filter
const buttonFilter = () => {
	const filterContainer = document.querySelector('#filter-container');
	const select = document.createElement('select');
	const filterOptions = ['Popularité', 'Date', 'Titre'];

	console.log(select);

	filterContainer.appendChild(select);

	filterOptions.forEach(optionText => {
		const option = document.createElement('option');
		option.value = optionText;
		option.text = optionText;
		select.appendChild(option);
	});
};
buttonFilter();
