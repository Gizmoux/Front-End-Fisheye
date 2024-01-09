// // Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from './index.js';
import { photographerTemplate } from '../templates/photographer.js';

const urlParams = new URLSearchParams(window.location.search);
const photographerIdURL = parseInt(urlParams.get('id'));

// console.log('photographerIdURL', photographerIdURL);
// console.log('urlParams', urlParams);

const { photographers, mediaPhotographers } = await getPhotographers();
const mediaPhotographerFiltered = mediaPhotographers.filter(
	media => media.photographerId === photographerIdURL
);

const fetchDataPhotographer = async () => {
	try {
		// Utilisez getPhotographers pour récupérer les données
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

// const {} = await getPhotographers();
async function createMedia(mediaArray) {
	const mediaContainer = document.querySelector('.media-container');
	// mediaContainer.innerHTML = '';
	mediaArray.forEach(media => {
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

	// console.log('selectedMediaPhotographerTITLE', selectedMediaPhotographer);
	// console.log('mediaPhotographers', mediaPhotographers[0].image);
}
createMedia(mediaPhotographerFiltered);
// console.log('mediaPhotographersLIKES', mediaPhotographers[0].likes);

// Bouton Filter
const buttonFilter = () => {
	const filterContainer = document.querySelector('#filter-container');
	const select = document.createElement('select');
	const filterOptions = ['Popularité', 'Date', 'Titre'];

	filterContainer.appendChild(select);
	filterOptions.forEach(optionText => {
		const option = document.createElement('option');
		option.value = optionText;
		option.text = optionText;
		select.appendChild(option);
		// console.dir('OPTION', option);
		// console.log('option.text', option.text);
	});
	select.addEventListener('change', () => {
		console.log('Option de filtre seléctionnée:', select.value);
		if (select.value === 'Popularité') {
			const mediaTabSort = mediaPhotographerFiltered
				.slice()
				.sort((a, b) => b.likes - a.likes);

			document.querySelector('.media-container').innerHTML = '';
			createMedia(mediaTabSort);
			// console.log('mediaTAB', likesTab);
			// console.log('mediaTabSort', mediaTabSort);
		} else if (select.value === 'Date') {
			const mediaTabSort = mediaPhotographerFiltered
				.slice()
				.sort((a, b) => new Date(a.date) - new Date(b.date));

			document.querySelector('.media-container').innerHTML = '';
			createMedia(mediaTabSort);
		} else if (select.value === 'Titre') {
			const mediaTabSort = mediaPhotographerFiltered
				.slice()
				.sort((a, b) => a.title.localeCompare(b.title));
			console.log('mediaTabSort', mediaTabSort);
			document.querySelector('.media-container').innerHTML = '';
			createMedia(mediaTabSort);
		}
		// console.log('mediaPhotographers.date', mediaPhotographers.date);
		// console.log('mediaPhotographers.title', mediaPhotographers.title);
	});
};
buttonFilter();

// LIghtbox
const lightboxElements = document.querySelectorAll('.divCard');
const modalMedia = document.querySelector('.modal-media');
const displayModalMedia = () => {
	modalMedia.style.display = 'block';
};
const lightbox = () => {
	lightboxElements.forEach((element, index) => {
		element.addEventListener('click', () => {
			const selectedMedia = mediaPhotographerFiltered[index];
			const mediaElement = selectedMedia.image
				? document.createElement('img')
				: document.createElement('video');

			mediaElement.src = selectedMedia.image
				? `assets/images/${photographerIdURL}/${selectedMedia.image}`
				: `assets/images/${photographerIdURL}/${selectedMedia.video}`;

			modalMedia.innerHTML = '';
			modalMedia.appendChild(mediaElement);

			// Ajouter les boutons de navigation
			const prevButton = document.createElement('button');
			prevButton.innerHTML = '<';
			prevButton.classList.add('prevButton');

			prevButton.addEventListener('click', () => showPreviousImage(index));
			modalMedia.appendChild(prevButton);

			const nextButton = document.createElement('button');
			nextButton.innerHTML = '>';
			nextButton.classList.add('nextButton');

			nextButton.addEventListener('click', () => showNextImage(index));
			modalMedia.appendChild(nextButton);

			displayModalMedia();
		});
	});

	// Fonction pour afficher l'image précédente
	const showPreviousImage = currentIndex => {
		const newIndex = currentIndex - 1;
		lightboxElements[newIndex].click();
	};

	// Fonction pour afficher l'image suivante
	const showNextImage = currentIndex => {
		const newIndex = currentIndex + 1;
		lightboxElements[newIndex].click();
	};
};

lightbox();

// const lightbox = () => {
// 	lightboxElements.forEach((element, index) => {
// 		element.addEventListener('click', () => {
// 			const selectedMedia = mediaPhotographerFiltered[index];
// 			const mediaElement = selectedMedia.image
// 				? document.createElement('img')
// 				: document.createElement('video');

// 			mediaElement.src = selectedMedia.image
// 				? `assets/images/${photographerIdURL}/${selectedMedia.image}`
// 				: `assets/images/${photographerIdURL}/${selectedMedia.video}`;
// 			console.log('selectedMedia', selectedMedia.image);
// 			modalMedia.innerHTML = '';
// 			modalMedia.appendChild(mediaElement);

// 			displayModalMedia();
// 		});
// 	});
// };

// lightbox();
