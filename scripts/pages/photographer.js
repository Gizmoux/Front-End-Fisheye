import { getPhotographers } from './index.js';
import { photographerTemplate } from '../templates/photographer.js';

const urlParams = new URLSearchParams(window.location.search);
const photographerIdURL = parseInt(urlParams.get('id'));
const { photographers, mediaPhotographers } = await getPhotographers();
const mediaPhotographerFiltered = mediaPhotographers.filter(
	media => media.photographerId === photographerIdURL
);
const selectedPhotographer = photographers.find(
	photographer => photographer.id === photographerIdURL
);

const fetchDataPhotographer = async () => {
	try {
		if (selectedPhotographer) {
			const mainElement = document.querySelector('.photograph-header');
			const { getUserCardDOM } = photographerTemplate(selectedPhotographer);
			mainElement.appendChild(getUserCardDOM());
			mainElement.classList.add('photographer_header-presentation');
			mainElement.classList.add('photographer_header-image');
		} else {
			console.error('Photographe non trouvé avec lID spécifié.');
		}
	} catch (error) {
		console.log(error);
	}
};
fetchDataPhotographer();

const formcontactname = document.querySelector('#form_contact-name>span');
const nameForm = selectedPhotographer.name;
formcontactname.textContent = `${nameForm}`;
const heartIcon = document.createElement('i');
heartIcon.setAttribute('aria-label', 'Appuyer sur Entrer pour aimer la photo');
heartIcon.setAttribute('tabindex', '0');
heartIcon.classList.add('fa-solid', 'fa-heart');
let totalUpdateLikes = 0;

async function createMedia(mediaArray) {
	const mediaContainer = document.querySelector('.media-container');
	mediaContainer.innerHTML = '';

	mediaArray.forEach(media => {
		let currentLikes = media.likes;
		const divCard = document.createElement('div');
		divCard.classList.add('divCard');
		const cardInfo = document.createElement('div');
		cardInfo.classList.add('cardInfo');
		const cardInfoLike = document.createElement('div');
		cardInfoLike.classList.add('cardInfoLike');
		const p = document.createElement('p');
		p.textContent = media.title;
		const likesElement = document.createElement('span');
		likesElement.textContent = ` ${currentLikes}`;

		const updateLikesInfo = () => {
			likesElement.textContent = `${currentLikes + 1}`;
			totalUpdateLikes += 1;
			divTotalLikes.innerHTML = ` ${totalUpdateLikes} ${heartIcon.outerHTML} ${selectedPhotographer.price}€ /jour`;
		};

		const addLike = () => {
			updateLikesInfo();
			cardInfo.removeEventListener('click', addLike);
		};
		cardInfo.addEventListener('click', addLike);
		const handleKeyPress = event => {
			if (event.key === 'Enter') {
				updateLikesInfo();
				cardInfo.removeEventListener('keydown', handleKeyPress);
			} else {
				return;
			}
		};
		cardInfo.addEventListener('keydown', handleKeyPress);

		// cardInfo.appendChild(heartIcon);
		cardInfo.innerHTML = ` ${heartIcon.outerHTML}`;
		document.body.appendChild(cardInfo);
		cardInfo.appendChild(likesElement);

		// Définir une classe de création d'éléments média
		class Media {
			constructor(photographerIdURL, media) {
				this.photographerIdURL = photographerIdURL;
				this.media = media;
				this.element = null;
			}

			// createMediaElement() {
			// 	throw new Error(
			// 		'La méthode createMediaElement doit être implémentée par les classes filles.'
			// 	);
			// }
		}

		class ImageMedia extends Media {
			createMediaElement() {
				const imageElement = document.createElement('img');
				imageElement.classList.add('elementToLightbox');
				imageElement.src = `assets/images/${this.photographerIdURL}/${this.media.image}`;
				imageElement.alt = this.media.alt;
				return imageElement;
			}
		}

		class VideoMedia extends Media {
			createMediaElement() {
				const videoElement = document.createElement('video');
				videoElement.classList.add('elementToLightbox');
				videoElement.src = `assets/images/${this.photographerIdURL}/${this.media.video}`;
				videoElement.controls = true;
				return videoElement;
			}
		}

		class MediaFactory {
			static createMedia(mediaType, photographerIdURL, media) {
				if (mediaType === 'image') {
					return new ImageMedia(photographerIdURL, media).createMediaElement();
				} else if (mediaType === 'video') {
					return new VideoMedia(photographerIdURL, media).createMediaElement();
				} else {
					throw new Error('Type de média différent');
				}
			}
		}

		// Utilisation de la Factory pour créer les éléments média
		if (media.image) {
			const imageElement = MediaFactory.createMedia(
				'image',
				photographerIdURL,
				media
			);
			divCard.appendChild(imageElement);
		} else if (media.video) {
			const videoElement = MediaFactory.createMedia(
				'video',
				photographerIdURL,
				media
			);
			divCard.appendChild(videoElement);
		}

		mediaContainer.appendChild(divCard);
		divCard.appendChild(cardInfo);
		cardInfo.appendChild(p);
	});
}
createMedia(mediaPhotographerFiltered);

const divTotalLikes = document.createElement('div');
function totalLikes() {
	let totalMediaLikes = 0;

	divTotalLikes.classList.add('divTotalLikes');
	mediaPhotographerFiltered.forEach(mediaLikes => {
		totalMediaLikes = totalMediaLikes + mediaLikes.likes;
		divTotalLikes.innerHTML = ` ${totalMediaLikes} ${heartIcon.outerHTML}	${selectedPhotographer.price}€ /jour`;

		document.body.appendChild(divTotalLikes);
	});

	return totalMediaLikes;
}
totalLikes();
totalUpdateLikes = totalLikes();

const dropdownOptions = document.querySelectorAll(
	'.dropdown_content li button'
);
const chevronIcon = document.querySelector('.fas.fa-chevron-down');
const chevronIconUp = document.querySelector('.fas.fa-chevron-up');
const dropdownContent = document.querySelector('.dropdown_content');

chevronIcon.addEventListener('click', () => {
	chevronIconUp.style.display = 'block';
	chevronIcon.style.display = 'none';
	dropdownContent.classList.toggle('show-options');
});

chevronIcon.addEventListener('keydown', event => {
	if (event.key === 'Enter') {
		chevronIconUp.style.display = 'block';
		chevronIcon.style.display = 'none';
		dropdownContent.classList.toggle('show-options');
	} else {
		return;
	}
});
chevronIconUp.addEventListener('click', () => {
	chevronIconUp.style.display = 'none';
	chevronIcon.style.display = 'block';
	dropdownContent.classList.toggle('show-options');
});
chevronIconUp.addEventListener('keydown', event => {
	if (event.key === 'Enter') {
		chevronIconUp.style.display = 'none';
		chevronIcon.style.display = 'block';
		dropdownContent.classList.toggle('show-options');
	} else {
		return;
	}
});
dropdownOptions.forEach(option => {
	option.addEventListener('click', () => {
		// Mettre à jour le texte du bouton avec l'option sélectionnée
		document.getElementById('current_filter').textContent = option.textContent;
		// Cacher les options après avoir sélectionné une option
		dropdownContent.classList.remove('show-options');
		if (option.textContent === 'Popularité') {
			const mediaTabSort = mediaPhotographerFiltered.sort(
				(a, b) => b.likes - a.likes
			);
			document.querySelector('.media-container').innerHTML = '';
			chevronIcon.style.display = 'block';
			chevronIconUp.style.display = 'none';
			createMedia(mediaTabSort);
		} else if (option.textContent === 'Date') {
			const mediaTabSort = mediaPhotographerFiltered.sort(
				(a, b) => new Date(a.date) - new Date(b.date)
			);
			document.querySelector('.media-container').innerHTML = '';
			chevronIcon.style.display = 'block';
			chevronIconUp.style.display = 'none';
			createMedia(mediaTabSort);
		} else if (option.textContent === 'Titre') {
			const mediaTabSort = mediaPhotographerFiltered.sort((a, b) =>
				a.title.localeCompare(b.title)
			);
			document.querySelector('.media-container').innerHTML = '';
			chevronIcon.style.display = 'block';
			chevronIconUp.style.display = 'none';
			createMedia(mediaTabSort);
		}
	});
});
dropdownOptions.forEach(option => {
	option.addEventListener('keydown', event => {
		if (event.key === 'Enter') {
			document.getElementById('current_filter').textContent =
				option.textContent;
			dropdownContent.classList.remove('show-options');

			if (option.textContent === 'Popularité') {
				const mediaTabSort = mediaPhotographerFiltered.sort(
					(a, b) => b.likes - a.likes
				);
				document.querySelector('.media-container').innerHTML = '';
				chevronIcon.style.display = 'block';
				chevronIconUp.style.display = 'none';
				createMedia(mediaTabSort);
			} else if (option.textContent === 'Date') {
				const mediaTabSort = mediaPhotographerFiltered.sort(
					(a, b) => new Date(a.date) - new Date(b.date)
				);
				document.querySelector('.media-container').innerHTML = '';
				chevronIcon.style.display = 'block';
				chevronIconUp.style.display = 'none';
				createMedia(mediaTabSort);
			} else if (option.textContent === 'Titre') {
				const mediaTabSort = mediaPhotographerFiltered.sort((a, b) =>
					a.title.localeCompare(b.title)
				);
				document.querySelector('.media-container').innerHTML = '';
				chevronIcon.style.display = 'block';
				chevronIconUp.style.display = 'none';
				createMedia(mediaTabSort);
			}
		}
	});
});

document.addEventListener('click', () => {
	lightbox();
});

const modalMedia = document.querySelector('.modal-media');
const displayModalMedia = () => {
	modalMedia.style.display = 'block';
	modalMedia.style.backgroundColor = 'white';
};
const lightbox = () => {
	let currentIndex;

	const handleActivation = index => {
		currentIndex = index;
		const selectedMedia = mediaPhotographerFiltered[index];
		if (!selectedMedia) {
			return;
		}
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
		prevButton.setAttribute('aria-label', 'Image précédente');
		prevButton.addEventListener('click', showPreviousImage);
		modalMedia.appendChild(prevButton);
		modalMedia.appendChild(mediaElement);

		// Bouton suivant
		const closeButton = document.createElement('button');
		closeButton.innerHTML = 'X';
		closeButton.classList.add('close-modal');
		closeButton.addEventListener('click', closeButtonModal);
		modalMedia.appendChild(closeButton);

		const nextButton = document.createElement('button');
		nextButton.innerHTML = '>';
		nextButton.classList.add('nextButton');
		nextButton.setAttribute('aria-label', 'Image suivante');
		nextButton.addEventListener('click', showNextImage);
		modalMedia.appendChild(nextButton);

		displayModalMedia();

		document.querySelector('.modal-media').setAttribute('aria-hidden', 'false');
	};

	const lightboxElements = document.querySelectorAll('.elementToLightbox');
	lightboxElements.forEach((element, index) => {
		element.addEventListener('click', () => handleActivation(index));
		element.setAttribute('tabindex', '0');
		element.addEventListener('keydown', event => {
			if (event.key === 'Enter') {
				handleActivation(index);
			} else {
				return;
			}
		});
	});

	const closeButtonModal = () => {
		const modal = document.querySelector('.modal-media');
		modal.style.display = 'none';
		modal.setAttribute('aria-hidden', 'true');
	};
	const showPreviousImage = () => {
		const newIndex = currentIndex - 1;
		handleActivation(newIndex);
	};
	const showNextImage = () => {
		const newIndex = currentIndex + 1;
		handleActivation(newIndex);
	};
	const handleKeyUp = event => {
		switch (event.key) {
			case 'Escape':
				closeButtonModal();
				break;
			case 'ArrowLeft':
				showPreviousImage();
				break;
			case 'ArrowRight':
				showNextImage();
				break;
		}
	};
	document.addEventListener('keyup', handleKeyUp);
};
lightbox();

// Sans factory Pattern
// if (media.image) {
// 	const imageElement = document.createElement('img');
// 	imageElement.classList.add('elementToLightbox');

// 	imageElement.src = `assets/images/${photographerIdURL}/${media.image}`;
// 	imageElement.alt = media.alt;
// 	divCard.appendChild(imageElement);
// } else if (media.video) {
// 	const videoElement = document.createElement('video');
// 	videoElement.classList.add('elementToLightbox');

// 	videoElement.src = `assets/images/${photographerIdURL}/${media.video}`;
// 	videoElement.controls = true;
// 	divCard.appendChild(videoElement);
// }
// mediaContainer.appendChild(divCard);
// divCard.appendChild(cardInfo);
// cardInfo.appendChild(p);

// class MediaFactory {
// 	static createMedia(mediaType, photographerIdURL, media) {
// 		if (mediaType === 'image') {
// 			return MediaFactory.createImageElement(photographerIdURL, media);
// 		} else if (mediaType === 'video') {
// 			return MediaFactory.createVideoElement(photographerIdURL, media);
// 		} else {
// 			throw new Error('Type de média différents');
// 		}
// 	}

// 	static createImageElement(photographerIdURL, media) {
// 		const imageElement = document.createElement('img');
// 		imageElement.classList.add('elementToLightbox');
// 		imageElement.src = `assets/images/${photographerIdURL}/${media.image}`;
// 		imageElement.alt = media.alt;
// 		return imageElement;
// 	}

// 	static createVideoElement(photographerIdURL, media) {
// 		const videoElement = document.createElement('video');
// 		videoElement.classList.add('elementToLightbox');
// 		videoElement.src = `assets/images/${photographerIdURL}/${media.video}`;
// 		videoElement.controls = true;
// 		return videoElement;
// 	}
// }

// // Utilisation de la Factory pour créer les éléments média
// if (media.image) {
// 	const imageElement = MediaFactory.createMedia(
// 		'image',
// 		photographerIdURL,
// 		media
// 	);
// 	divCard.appendChild(imageElement);
// } else if (media.video) {
// 	const videoElement = MediaFactory.createMedia(
// 		'video',
// 		photographerIdURL,
// 		media
// 	);
// 	divCard.appendChild(videoElement);
// }
