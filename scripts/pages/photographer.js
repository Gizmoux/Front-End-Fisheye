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
const selectedPhotographer = photographers.find(
	photographer => photographer.id === photographerIdURL
);
console.log('photographers', photographers);
const fetchDataPhotographer = async () => {
	try {
		// Utilisez getPhotographers pour récupérer les données
		// J'ai déplacé ça au dessus si ça bug...
		// const selectedPhotographer = photographers.find(
		// 	photographer => photographer.id === photographerIdURL
		// );
		// Trouver le photographe avec l'ID correspondant dans les données récupérées

		if (selectedPhotographer) {
			const mainElement = document.querySelector('.photograph-header');
			// const divImageElement = document.createElement('div');
			// const divMainElement = document.createElement('div');
			// Appeler la fonction qui affiche les détails du photographe
			const { getUserCardDOM } = photographerTemplate(selectedPhotographer);
			mainElement.appendChild(getUserCardDOM());
			// Inutile ?
			// mainElement.appendChild(divMainElement);
			mainElement.classList.add('photographer_header-presentation');
			// mainElement.appendChild(divImageElement);
			mainElement.classList.add('photographer_header-image');

			console.log('selectedPhotographer :', selectedPhotographer);
			console.log('mediaPhotographerFiltered', mediaPhotographerFiltered);
		} else {
			console.error("Photographe non trouvé avec l'ID spécifié.");
		}
	} catch (error) {
		console.log(error);
	}
};
// Appeler la fonction pour récupérer et afficher les données du photographe
fetchDataPhotographer();
//Afficher nom dans le form
const formcontactname = document.querySelector('#form_contact-name>span');

const nameForm = selectedPhotographer.name;
formcontactname.textContent = `${nameForm}`;

// Factory pour Media

// const {} = await getPhotographers();
const heartIcon = document.createElement('i');
heartIcon.setAttribute('aria-label', 'likes');
heartIcon.classList.add('fa-solid', 'fa-heart');
let totalUpdateLikes = 0;

async function createMedia(mediaArray) {
	const mediaContainer = document.querySelector('.media-container');
	// mediaContainer.innerHTML = '';

	mediaArray.forEach(media => {
		let currentLikes = media.likes;
		const divCard = document.createElement('div');
		divCard.classList.add('divCard');

		// divCard.appendChild(divCardPresentation);
		const cardInfo = document.createElement('div');
		cardInfo.classList.add('cardInfo');

		const cardInfoLike = document.createElement('div');
		cardInfoLike.classList.add('cardInfoLike');

		const p = document.createElement('p');
		p.textContent = media.title;

		const likesElement = document.createElement('span');
		likesElement.textContent = ` ${currentLikes}`;

		// Fonction pour ajouter un Like aux éléments

		const addLike = () => {
			likesElement.textContent = `${currentLikes + 1}`;
			totalUpdateLikes += 1;
			divTotalLikes.innerHTML = ` ${totalUpdateLikes} ${heartIcon.outerHTML}	${selectedPhotographer.price}€ /jour`;
			cardInfo.removeEventListener('click', addLike);
			console.log(selectedPhotographer.price);
		};

		cardInfo.addEventListener('click', addLike);

		// Fonction Total de likes

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
			imageElement.alt = media.alt;
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
const divTotalLikes = document.createElement('div');
function totalLikes() {
	let totalMediaLikes = 0;

	divTotalLikes.classList.add('divTotalLikes');
	mediaPhotographerFiltered.forEach(mediaLikes => {
		totalMediaLikes = totalMediaLikes + mediaLikes.likes;
		divTotalLikes.innerHTML = ` ${totalMediaLikes} ${heartIcon.outerHTML}	${selectedPhotographer.price}€ /jour`;

		document.body.appendChild(divTotalLikes);
	});

	// console.log('totalUpdateLikes', totalUpdateLikes);
	return totalMediaLikes;
}
totalLikes();
// Cette ligne appelle à nouveau la fonction totalLikes et assigne
// sa valeur de retour (le nombre total de likes) à la variable totalUpdateLikes.
totalUpdateLikes = totalLikes();

// Bouton Filter
const buttonFilter = () => {
	const filterContainer = document.querySelector('#filter-container');
	const select = document.createElement('select');
	select.setAttribute('aria-label', 'Order by');
	const filterOptions = ['Popularité', 'Date', 'Titre'];

	filterContainer.appendChild(select);
	filterOptions.forEach(optionText => {
		const option = document.createElement('option');
		option.value = optionText;
		option.text = optionText;
		option.classList.add('options-style');
		select.appendChild(option);

		// console.dir('OPTION', option);
		// console.log('option.text', option.text);
	});
	select.addEventListener('change', () => {
		// console.log('Option de filtre seléctionnée:', select.value);
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
			mediaElement.alt = selectedMedia.alt;
			if (selectedMedia.image) {
				mediaElement.src = `assets/images/${photographerIdURL}/${selectedMedia.image}`;
			} else {
				mediaElement.src = `assets/images/${photographerIdURL}/${selectedMedia.video}`;
				mediaElement.controls = true;
				mediaElement.autoplay = true;
			}

			modalMedia.innerHTML = '';

			// Bouton précédent
			const prevButton = document.createElement('button');
			prevButton.innerHTML = '<';
			prevButton.classList.add('prevButton');
			prevButton.setAttribute('aria-label', 'Previous Image');

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
			nextButton.setAttribute('aria-label', 'Next Image');

			nextButton.addEventListener('click', () => showNextImage(index));
			modalMedia.appendChild(nextButton);
			displayModalMedia();
			document
				.querySelector('.modal-media')
				.setAttribute('aria-hidden', 'false');
		});
	});
	function closeButtonModal() {
		const modal = document.querySelector('.modal-media');
		modal.style.display = 'none';
		modal.setAttribute('aria-hidden', 'true');
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
