function photographerTemplate(data) {
	const { name, portrait, city, tagline, price, country } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement('article');
		const img = document.createElement('img');
		const h2 = document.createElement('h2');
		const h3 = document.createElement('h3');

		const paragraphe = document.createElement('p');
		const span = document.createElement('span');

		img.setAttribute('src', picture);
		h2.textContent = name;
		h3.textContent = `${city}, ${country}`;

		paragraphe.textContent = tagline;
		span.textContent = `${price}${'€/jour'}`;

		article.appendChild(img);
		article.appendChild(h2);
		article.appendChild(h3);

		article.appendChild(paragraphe);
		article.appendChild(span);
		return article;
	}
	return { name, picture, getUserCardDOM };
}
