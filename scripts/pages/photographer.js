// // Mettre le code JavaScript lié à la page photographer.html
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
const urlParams = new URLSearchParams(window.location.search);
const photographerIdURL = parseInt(urlParams.get('id'));
console.log('photographerIdURL', photographerIdURL);
console.log('urlParams', urlParams);
async function getAllData() {
	try {
		const response = await fetch('./data/photographers.json');
		if (!response.ok) {
			throw new Error(
				'Erreur lors de la récupération des données des photographes.'
			);
		}
		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}
async function findingPhotographId() {
	const data = await getAllData();

	const selectedPhotographer = data.photographers.find(
		element => element.id === photographerIdURL
	);
	const mainElement = document.querySelector('.photograph-header');
	const h2 = document.createElement('h2');
	const h3 = document.createElement('h3');
	const paragraphe = document.createElement('p');
	const img = document.createElement('img');

	mainElement.style.background = 'red';

	h2.textContent = selectedPhotographer.name;
	h3.textContent = `${selectedPhotographer.city}, ${selectedPhotographer.country}`;
	paragraphe.textContent = selectedPhotographer.tagline;
	img.setAttribute(
		'src',
		`assets/photographers/${selectedPhotographer.portrait}`
	);
	img.style.width = '300px';
	mainElement.appendChild(h2);
	mainElement.appendChild(h3);
	mainElement.appendChild(paragraphe);
	mainElement.appendChild(img);

	console.log('Détails du photographe sélectionné :', selectedPhotographer);
	return selectedPhotographer;
}
async function photographInit() {
	try {
		const photographerToDisplay = await findingPhotographId();

		// displayPhotographer(photographerToDisplay);
	} catch (error) {
		console.error(error);
	}
}
photographInit();
