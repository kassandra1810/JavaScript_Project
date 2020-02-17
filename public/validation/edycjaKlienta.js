const form = document.getElementById('my-form');
const inputs = form.querySelectorAll('.input');

inputs.forEach(input => input.addEventListener('blur', validateInput));
form.addEventListener('submit', validateAndSendForm);

const errors = {};

inputs.forEach(input => (errors[input.name] = false));

function validateInput(e) {
	switch (e.target.name) {
		case 'imie':
			validateFName(e);
			break;
		case 'id':
			validateIdent(e)
			break;
		case 'nazwisko':
			validateLName(e);
			break;
		case 'dataUrodzenia':
			validateBday(e);
			break;
		case 'numerDowodu':
			validateId(e);
			break;			
		default:
			return;
	}
}

function validateIdent(e) {
	errors[e.target.name] = false;
	e.target.nextElementSibling.textContent = '';
}

function validateFName(e) {
	if (e.target.value.trim().length < 3) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Imię musi mieć co najmniej 3 znaki.';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateLName(e) {
	if (e.target.value.trim().length < 2) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Nazwisko musi mieć co najmniej 2 znaki.';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateBday(e) {
	const regdata = /([12]\d{3}.(0[1-9]|1[0-2]).(0[1-9]|[12]\d|3[01]))/;
	if (!regdata.test(document.getElementById("dataUrodzenia").value)) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Podaj poprawną datę w formacie dzień.miesiąc.rok ' + document.getElementById("dataUrodzenia").value ;
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateId(e) {
	const regId = /[A-Z]{2}\d{6}/;
	if (!regId.test(e.target.value.trim())) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Podaj poprawny numer dowodu XX000000 ';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateAndSendForm(e) {
	e.preventDefault();
	const errorValues = Object.values(errors);
	errorValues[1] = false;
	if (errorValues.indexOf(true) > -1) {
		console.log(errorValues);
		return
	};
	console.log(errorValues);
	form.submit();
}