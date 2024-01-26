export function photographerTemplate(data) {
	const { name, portrait, city, tagline, price, country, id } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		// CREER LES ELEMENTS DU DOM
		const article = document.createElement('article');
		const divPres = document.createElement('div');
		divPres.classList.add('divPresentation');
		const img = document.createElement('img');
		const h2 = document.createElement('h2');
		const h3 = document.createElement('h3');
		const paragraphe = document.createElement('p');
		const span = document.createElement('span');

		// SET ATTRIBUTES AND TEXT CONTENT
		img.setAttribute('src', picture);
		img.setAttribute('alt', `Photo de ${name}`);
		h2.textContent = name;
		h3.textContent = `${city}, ${country}`;
		paragraphe.textContent = tagline;
		span.textContent = `${price}${'€/jour'}`;

		// ADD ARIA AND ROLE ATTRIBUTES
		article.setAttribute('role', 'article');
		img.setAttribute('role', 'img');
		img.setAttribute('aria-label', `${name}'s portrait`);
		h2.setAttribute('role', 'heading');
		h2.setAttribute('aria-level', '2');
		h3.setAttribute('role', 'heading');
		h3.setAttribute('aria-level', '3');

		article.appendChild(img);
		article.appendChild(divPres);
		divPres.appendChild(h2);
		divPres.appendChild(h3);
		divPres.appendChild(paragraphe);
		divPres.appendChild(span);

		// FONCTION CLICK SUR LES PHOTOS ET ENVOIE SUR LA PAGE DU PHOTOGRAPHE CHOISI
		const linkElement = img.addEventListener('click', () => {
			window.location.href = `photographer.html?id=${id}`;
			// console.log('LINKELEMENT', linkElement);
		});
		// ADD FOCUS STYLES FOR ACCESSIBILITY
		img.addEventListener('focus', () => {
			article.classList.add('focused');
		});

		img.addEventListener('blur', () => {
			article.classList.remove('focused');
		});
		return article;
	}

	return { name, picture, getUserCardDOM };
}
