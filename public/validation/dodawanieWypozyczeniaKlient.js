const form = document.getElementById('my-form');
const inputs = form.querySelectorAll('.input');

inputs.forEach(input => input.addEventListener('blur', validateInput));
form.addEventListener('submit', validateAndSendForm);

const errors = {};

inputs.forEach(input => (errors[input.name] = true));

function validateInput(e) {
	switch (e.target.name) {
		case 'szukany':
			validateFName(e);
			break;			
		default:
			return;
	}
}

function validateFName(e) {
	if (e.target.value.trim().length < 3) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Podaj imie, nazwisko lub numer dowodu.';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateAndSendForm(e) {
	e.preventDefault();
	const errorValues = Object.values(errors);
	if (errorValues.indexOf(true) > -1) {
		return
	};
	form.submit();
}