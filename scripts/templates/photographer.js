export function photographerTemplate(data) {
	const { name, portrait, city, tagline, price, country, id } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		// CREER LES ELEMENTS DU DOM
		const article = document.createElement('article');
		const divArticle = document.createElement('div');
		divArticle.classList.add('divArticle');
		const divPres = document.createElement('div');
		divPres.classList.add('divPresentation');
		const img = document.createElement('img');
		const h2 = document.createElement('h2');
		const h3 = document.createElement('h3');
		const paragraphe = document.createElement('p');
		const span = document.createElement('span');

		// SET ATTRIBUTS, ARIA AND TEXT CONTENT
		img.setAttribute('src', picture);
		img.setAttribute('alt', `Photo de`);

		h2.textContent = name;
		h3.textContent = `${city}, ${country}`;
		paragraphe.textContent = tagline;
		span.textContent = `${price}${'€/jour'}`;

		divArticle.appendChild(img);
		divArticle.appendChild(h2);
		divArticle.setAttribute('tabindex', '0');

		article.setAttribute('role', 'article');
		img.setAttribute('role', 'img');
		// img.setAttribute('aria-label', `Portrait de ${name}`);
		h2.setAttribute('role', 'heading');
		h2.setAttribute('aria-level', '2');
		h2.setAttribute('tabindex', '-1');
		h3.setAttribute('role', 'heading');
		h3.setAttribute('aria-level', '3');

		// article.appendChild(divArticle);
		// article.appendChild(img);
		// article.appendChild(divPres);
		// article.appendChild(h2);
		// divPres.appendChild(h2);
		// divPres.appendChild(h3);
		// divPres.appendChild(paragraphe);
		// divPres.appendChild(span);
		// article.appendChild(h2);
		article.appendChild(divArticle);
		article.appendChild(divPres);
		divPres.appendChild(h3);
		divPres.appendChild(paragraphe);
		divPres.appendChild(span);

		// FONCTION CLICK SUR LES PHOTOS ET ENVOIE SUR LA PAGE DU PHOTOGRAPHE CHOISI
		img.addEventListener('click', () => {
			window.location.href = `photographer.html?id=${id}`;
			// console.log('LINKELEMENT', linkElement);
		});
		divArticle.addEventListener('keydown', function (event) {
			if (event.key === 'Enter') {
				// Code à exécuter lorsqu'on appuie sur la touche "Enter"
				// Par exemple, vous pouvez appeler votre fonction displayModal() ici
				window.location.href = `photographer.html?id=${id}`;
			}
		});

		return article;
	}

	return { name, picture, getUserCardDOM };
}
