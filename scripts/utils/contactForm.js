function displayModal() {
	const modal = document.getElementById('contact_modal');
	modal.style.display = 'block';
}

function closeModal() {
	const modal = document.getElementById('contact_modal');
	modal.style.display = 'none';
}

// REGEX
let regexMail = new RegExp('[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+');
let regexName = new RegExp('^[a-zA-Zéë-]{2,}$');

// DOM ELEMENTS
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');

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

const form = document.getElementById('contact-form');
// Fonctions pour valider le formulaire
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
// Ajout d'un écouteur d'événement sur le formulaire pour écouter le submit
form.addEventListener('submit', event => {
	// On empêche le comportement par défaut
	event.preventDefault();

	// On appelle les fonctions
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
		//Launch modalValidation "Votre réservation a été reçue."
		closeModal();

		window.location.reload();
		console.log('Prénom:', firstname.value);
		console.log('Nom:', lastname.value);
		console.log('Email:', email.value);
		console.log('Message:', message.value);
	}
});
