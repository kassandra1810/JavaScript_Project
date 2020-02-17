const form = document.getElementById('my-form');
const inputs = form.querySelectorAll('.input');

inputs.forEach(input => input.addEventListener('blur', validateInput));
form.addEventListener('submit', validateAndSendForm);

const errors = {};

inputs.forEach(input => (errors[input.name] = true));

function validateInput(e) {
	switch (e.target.name) {
		case 'marka':
			validateMark(e);
			break;
		case 'model':
			validateModel(e);
			break;
		case 'pojemnoscSilnika':
			validateCapacity(e);
			break;
		case 'skrzyniaBiegow':
			validateGearbox(e);
			break;	
		case 'kolor':
			validateColour(e);
			break;
		case 'numerRejestracyjny':
			validateID(e);
			break;		
		default:
			return;
	}
}

function validateMark(e) {
	if (e.target.value.trim().length < 3) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Marka musi mieć co najmniej 3 znaki.';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateModel(e) {
	if (e.target.value.trim().length < 2) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Model musi mieć co najmniej 2 znaki.';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateCapacity(e) {
	const regId = /\d{4}/;
	if (!regId.test(e.target.value.trim())) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Podaj poprawną pojemność silnika w cm³';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateGearbox(e) {
	if (select.options[select.selectedIndex].value === '' || select.options[select.selectedIndex].value === '-1') {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Wybierz skrzynie biegów ';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function validateColour(e) {
	if (e.target.value.trim().length < 3) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Kolor musi mieć co najmniej 3 znaki.';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}

}

function validateID(e) {
	const regId = /[A-Z](\d|[A-Z])(\d|[A-Z])(\d|[A-Z])(\d|[A-Z])(\d|[A-Z])(\d|[A-Z])/;
	if (!regId.test(e.target.value.trim())) {
		errors[e.target.name] = true;
		e.target.nextElementSibling.textContent = 'Podaj poprawny numer rejestraxycny samochodu XX00000 lub X000000';
	} else {
		errors[e.target.name] = false;
		e.target.nextElementSibling.textContent = '';
	}
}

function onFileSelected(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("myimage");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}

function validateAndSendForm(e) {
	e.preventDefault();
	const errorValues = Object.values(errors);
	if (errorValues.indexOf(true) > 0) {
		return
	};
	form.submit();
}