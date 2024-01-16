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

			// console.log('Détails du photographe sélectionné :', selectedPhotographer);
			// console.log('mediaPhotographerFiltered', mediaPhotographerFiltered);
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
		let currentLikes = media.likes;

		// divCard.appendChild(divCardPresentation);
		const cardInfo = document.createElement('div');
		cardInfo.classList.add('cardInfo');
		const p = document.createElement('p');
		p.textContent = media.title;

		const heartIcon = document.createElement('i');
		heartIcon.classList.add('fa-solid', 'fa-heart');
		const likesElement = document.createElement('span');
		likesElement.textContent = ` ${currentLikes}`;
		// Fonction pour ajouter un Like aux éléments
		const addLike = () => {
			likesElement.textContent = ` ${currentLikes + 1}`;
		};

		cardInfo.addEventListener('click', addLike);

		// Fonction Total de likes

		function totalLikes() {
			let totalMediaLikes = 0;
			mediaPhotographerFiltered.forEach(mediaLikes => {
				totalMediaLikes = totalMediaLikes + mediaLikes.likes;
			});
			const divTotalLikes = document.createElement('div');
			divTotalLikes.classList.add('divTotalLikes');
			divTotalLikes.textContent = `Total Likes: ${totalMediaLikes}`;
			document.body.appendChild(divTotalLikes);
			// console.log('totalMediaLikes', totalMediaLikes);
		}
		totalLikes();
		// cardInfo.appendChild(heartIcon);
		cardInfo.innerHTML = ` ${heartIcon.outerHTML}`;
		document.body.appendChild(cardInfo);
		cardInfo.appendChild(likesElement);
		// Selon le type de media, j'affiche une image ou une video. Je leur
		// donne une classe elementToLightbox pour pouvoir par la suite ouvrir ces médias au click en récupérant leur classe
		if (media.image) {
			const imageElement = document.createElement('img');
			imageElement.classList.add('elementToLightbox');

			imageElement.src = `assets/images/${photographerIdURL}/${media.image}`;
			imageElement.alt = media.title;
			divCard.appendChild(imageElement);
		} else if (media.video) {
			const videoElement = document.createElement('video');
			videoElement.classList.add('elementToLightbox');

			videoElement.src = `assets/images/${photographerIdURL}/${media.video}`;
			videoElement.controls = true;
			divCard.appendChild(videoElement);
		}
		mediaContainer.appendChild(divCard);
		divCard.appendChild(cardInfo);
		cardInfo.appendChild(p);
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

// Fonction pour la Lightbox
const lightboxElements = document.querySelectorAll('.elementToLightbox');
const modalMedia = document.querySelector('.modal-media');
const displayModalMedia = () => {
	modalMedia.style.display = 'block';
};
const lightbox = () => {
	lightboxElements.forEach((element, index) => {
		element.addEventListener('click', () => {
			const selectedMedia = mediaPhotographerFiltered[index];
			// console.log('selectedMedia', selectedMedia);
			const mediaElement = selectedMedia.image
				? document.createElement('img')
				: document.createElement('video');

			mediaElement.src = selectedMedia.image
				? `assets/images/${photographerIdURL}/${selectedMedia.image}`
				: `assets/images/${photographerIdURL}/${selectedMedia.video}`;

			modalMedia.innerHTML = '';

			// Bouton précédent
			const prevButton = document.createElement('button');
			prevButton.innerHTML = '<';
			prevButton.classList.add('prevButton');

			prevButton.addEventListener('click', () => showPreviousImage(index));
			modalMedia.appendChild(prevButton);
			modalMedia.appendChild(mediaElement);

			// Bouton suivant
			const closeButton = document.createElement('button');
			closeButton.innerHTML = 'X';
			closeButton.classList.add('close-modal');
			modalMedia.appendChild(closeButton);
			closeButton.addEventListener('click', closeButtonModal);

			const nextButton = document.createElement('button');
			nextButton.innerHTML = '>';
			nextButton.classList.add('nextButton');

			nextButton.addEventListener('click', () => showNextImage(index));
			modalMedia.appendChild(nextButton);

			displayModalMedia();
		});
	});
	function closeButtonModal() {
		const modal = document.querySelector('.modal-media');
		modal.style.display = 'none';
	}
	// Image précédente
	const showPreviousImage = currentIndex => {
		const newIndex = currentIndex - 1;
		lightboxElements[newIndex].click();
	};

	// Image suivantr
	const showNextImage = currentIndex => {
		const newIndex = currentIndex + 1;
		lightboxElements[newIndex].click();
	};
};

lightbox();
