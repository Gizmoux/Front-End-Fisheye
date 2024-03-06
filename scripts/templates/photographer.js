export function photographerTemplate(data) {
	const { name, portrait, city, tagline, price, country, id } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
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

		img.setAttribute('src', picture);
		img.setAttribute('alt', `Photo de ${name}`);

		h2.textContent = name;
		h3.textContent = `${city}, ${country}`;
		paragraphe.textContent = tagline;
		span.textContent = `${price}${'€/jour'}`;

		divArticle.appendChild(img);
		divArticle.appendChild(h2);
		divArticle.setAttribute('tabindex', '0');

		article.setAttribute('role', 'article');
		img.setAttribute('role', 'img');
		h2.setAttribute('role', 'heading');
		h2.setAttribute('aria-level', '2');
		h2.setAttribute('tabindex', '-1');
		h3.setAttribute('role', 'heading');
		h3.setAttribute('aria-level', '3');

		article.appendChild(divArticle);
		article.appendChild(divPres);
		divPres.appendChild(h3);
		divPres.appendChild(paragraphe);
		divPres.appendChild(span);

		img.addEventListener('click', () => {
			window.location.href = `photographer.html?id=${id}`;
		});
		divArticle.addEventListener('keydown', function (event) {
			if (event.key === 'Enter') {
				window.location.href = `photographer.html?id=${id}`;
			}
		});

		return article;
	}
	return { name, picture, getUserCardDOM };
}
