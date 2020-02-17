const form = document.getElementById('my-form');
const inputs = form.querySelectorAll('.input');

inputs.forEach(input => input.addEventListener('blur', validateInput));
form.addEventListener('submit', validateAndSendForm);

const errors = {};

inputs.forEach(input => (errors[input.name] = true));

function validateInput(e) {
	switch (e.target.name) {
		case 'id':
			validateIdent(e)
		case 'dataOd':
			validateOd(e);
			break;
		case 'dataDo':
			validateDo(e);
			break;			
		default:
			return;
	}
}

function validateIdent(e) {
	//errors[e.target.name] = false;
	e.target.nextElementSibling.textContent = '';
}

function validateOd(e) {
	const regdata = /([12]\d{3}.(0[1-9]|1[0-2]).(0[1-9]|[12]\d|3[01]))/;
	if (!regdata.test(document.getElementById("dataOd").value)) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Podaj poprawną datę w formacie dzień.miesiąc.rok ' + document.getElementById("dataOd").value ;
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateDo(e) {
	const regdata = /([12]\d{3}.(0[1-9]|1[0-2]).(0[1-9]|[12]\d|3[01]))/;
	if (!regdata.test(document.getElementById("dataDo").value)) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Podaj poprawną datę w formacie dzień.miesiąc.rok ' + document.getElementById("dataDo").value ;
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateAndSendForm(e) {
	e.preventDefault();
	const errorValues = Object.values(errors);
	errorValues[0] = false;
	if (errorValues.indexOf(true) > -1) {
		console.log(errorValues);
		return
	};
	console.log(errorValues);
	form.submit();
}
