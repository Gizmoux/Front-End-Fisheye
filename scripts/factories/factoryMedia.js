// Fonction Factory pour gérer les images / Vidéos de la page photographe
const factoryMedia = () => {
	switch (media) {
		case 'image':
			console.log('image');
			break;

		case 'videos':
			console.log('videos');

			break;
		default:
			console.log(`${media}`);
	}
};
