// UI элементы
const form = document.querySelector('#form');
const userName = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector("#confirmPassword");

// Показываем сообщение об ошибке
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  formControl.classList.remove('success');
  const smallText = formControl.querySelector('small');

  if (smallText) {
    smallText.textContent = message;
  }
}

// Добавляем класс указывающий что валидация пройдена
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add("success");
  formControl.classList.remove("error");
}

// Метод валидации поля типа email
function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkEmail(input) {
  if (!isValidEmail(input.value.trim())) {
    showError(input, 'Укажите валидный email');
  } else {
    showSuccess(input);
  }
}

// Метод проверки обязательности введенного значения
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, 'Поле обязательно для заполнения');
    } else {
      showSuccess(input);
    }
  });
}

// Метод для проверки длины значения
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Длина поля должна быть не менее ${min} символов`);
  } else if (input.value.length > max) {
    showError(input, `Длина поля должна быть не более ${max} символов`);
  } else {
    showSuccess(input);
  }
}

// Метод проверки совпадения паролей
function checkPasswordsMatch(password, confirmPassword) {
  if (password.value.trim() !== confirmPassword.value.trim()) {
    showError(confirmPassword, 'Пароли не совпадают');
  } else {
    showSuccess(confirmPassword);
  }
}

// Обработчик отправки формы
form.addEventListener('submit', function(event){
  console.log('submits');
  event.preventDefault();

  checkRequired([userName, email, password, passwordConfirm]);
  checkLength(userName, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, passwordConfirm);
});
