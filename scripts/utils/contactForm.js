const contactButton = document.querySelector('.contact_button');
contactButton.addEventListener('click', displayModal);
function displayModal() {
	const modal = document.getElementById('contact_modal');
	modal.style.display = 'block';
	document.querySelector('#firstname').focus();
	modal.setAttribute('aria-hidden', 'false');
}
const closeContactButton = document.querySelector('.close-modal-image');
closeContactButton.addEventListener('click', closeModal);

function closeModal() {
	const modal = document.getElementById('contact_modal');
	modal.style.display = 'none';
	modal.setAttribute('aria-hidden', 'true');
}

// REGEX
let regexMail = new RegExp('[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+');
let regexName = new RegExp('^[a-zA-Zéë-]{2,}$');

// DOM ELEMENTS
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const message = document.getElementById('message');

// DOM ELEMENTS ERRORS
const firstnameError = document.getElementById('firstnameError');
const lastnameError = document.getElementById('lastnameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Objet des messages d'erreurs
const errorMessages = {
	firstname:
		'Veuillez entrer 2 caractères alphabétiques ou plus pour le champ du Prénom.',
	lastname:
		'Veuillez entrer 2 caractères alphabétiques ou plus pour le champ du Nom.',
	email: 'Veuillez entrer un email correct',
	message: 'Veuillez écrire un message',
};

// Fonctions pour valider le formulaire
const form = document.getElementById('contact-form');
const validateFieldName = (field, errorElement, errorMessage) => {
	if (!regexName.test(field.value)) {
		errorElement.textContent = errorMessage;
		field.style.border = '4px solid red';
	} else {
		field.style.border = '4px solid green';
	}
};
const validateFieldEmail = (field, errorElement, errorMessage) => {
	if (!regexMail.test(field.value)) {
		errorElement.textContent = errorMessage;
		field.style.border = '4px solid red';
	} else {
		field.style.border = '4px solid green';
	}
};
const validateFieldMessage = (field, errorElement, errorMessage) => {
	if (field.value === '') {
		errorElement.textContent = errorMessage;
		field.style.border = '4px solid red';
	} else {
		field.style.border = '4px solid green';
	}
};

form.addEventListener('submit', event => {
	event.preventDefault();
	validateFieldName(firstname, firstnameError, errorMessages.firstname);
	validateFieldName(lastname, lastnameError, errorMessages.lastname);
	validateFieldEmail(email, emailError, errorMessages.email);
	validateFieldMessage(message, messageError, errorMessages.message);

	if (
		!firstnameError.textContent &&
		!lastnameError.textContent &&
		!emailError.textContent &&
		!messageError.textContent
	) {
		console.log('Prénom:', firstname.value);
		console.log('Nom:', lastname.value);
		console.log('Email:', email.value);
		console.log('Message:', message.value);

		closeModal();
		document.querySelector('.btn_list').focus();
	}
});

document.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		closeModal();
	}
});
