"use strict";

// функция генерации, с помощью метода объекта personGenerator заполняет окно информацией
const generate = function () {
  const initPerson = personGenerator.getPerson();
  document.querySelector("#firstNameOutput").innerText = initPerson.firstName;
  document.querySelector("#secondNameOutput").innerText = initPerson.secondName;
  document.querySelector("#surnameOutput").innerText = initPerson.surname;
  document.querySelector("#genderOutput").innerText = initPerson.gender;
  document.querySelector("#birthYearOutput").innerText = initPerson.birthYear;
  document.querySelector("#jobOutput").innerText = initPerson.job;
};
// ...

// при загрузке окна браузера запускает функцию генерации
window.onload = generate();
//...

// кнопка генерации
document.querySelector(".start").addEventListener("click", () => {
  generate();
});
// ...

// кнопка очистки
document.querySelector(".clear").addEventListener("click", () => {
  document.querySelector("#firstNameOutput").innerText = "Имя";
  document.querySelector("#secondNameOutput").innerText = "Отчество";
  document.querySelector("#surnameOutput").innerText = "Фамилия";
  document.querySelector("#genderOutput").innerText = "Пол,";
  document.querySelector("#birthYearOutput").innerText = "Дата рождения";
  document.querySelector("#jobOutput").innerText = "Профессия";
});
