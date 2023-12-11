async function getPhotographers() {
	// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
	// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
	try {
		// Utilisez await pour attendre que la promesse fetch soit résolue
		const response = await fetch('../../data/photographers.json');
		console.log('REPONSE', response);
		// Vérifiez si la requête a réussi (statut HTTP 200)
		if (!response.ok) {
			throw new Error(`Erreur Statut : ${response.status}`);
		}

		// Convertissez la réponse en JSON
		const data = await response.json();
		console.log('DATA', data.photographers);
		// Obtenez la liste des photographes depuis le fichier JSON
		const photographers = data.photographers;

		// Retournez les données récupérées
		return {
			photographers: photographers,
		};
	} catch (error) {
		console.error('Erreur lors de la récupération des photographes :', error);
		// return {
		// 	photographers: [],
		// };
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

async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');

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

// let photographers = [
// 	{
// 		name: 'Ma data test',
// 		id: 1,
// 		city: 'Paris',
// 		country: 'France',
// 		tagline: 'Ceci est ma data test',
// 		price: 400,
// 		portrait: 'account.png',
// 	},
// 	{
// 		name: 'Autre data test',
// 		id: 2,
// 		city: 'Londres',
// 		country: 'UK',
// 		tagline: 'Ceci est ma data test 2',
// 		price: 500,
// 		portrait: 'account.png',
// 	},
// ];
