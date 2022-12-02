"use strict";

let minValue = ""; // нижняя граница для угадывания
let maxValue = ""; // верхняя граница для угадывания
let answerNumber = 0; // предположительно загаданное число
let orderNumber = 0; // номер попытки угадать
let gameRun = false;

// поля для вывода информации
const orderNumberField = document.querySelector("#orderNumberField");
const answerField = document.querySelector("#answerField");
const alertMessage = document.querySelector("#alert-message");

// поля для ввода информации
const inputWindowMin = document.querySelector(".input-min");
const inputWindowMax = document.querySelector(".input-max");

// назначение модального окна диапазона
const modalWindow = new bootstrap.Modal(
  document.querySelector("#staticBackdrop")
);

// модальное окно диапазона как элемент
const modalWindowElement = document.querySelector("#staticBackdrop");

// кнопка Ок в модальном окне диапазона
const buttonOk = document.querySelector(".button-input");

// кнопка Закрыть в модальном окне диапазона
const buttonClose = document.querySelector(".button-close");

// назначение модального окна alert
const modalAlert = new bootstrap.Modal(document.querySelector("#alert"));

// модальное окно alert как элемент
const modalAlertElement = document.querySelector("#alert");

// массив-заготовка для отображенимя чисел прописью
const names = new Array();
names[0] = "ноль";
names[1] = "один";
names[2] = "два";
names[3] = "три";
names[4] = "четыре";
names[5] = "пять";
names[6] = "шесть";
names[7] = "семь";
names[8] = "восемь";
names[9] = "девять";
names[10] = "десять";
names[11] = "одиннадцать";
names[12] = "двенадцать";
names[13] = "тринадцать";
names[14] = "четырнадцать";
names[15] = "пятнадцать";
names[16] = "шестнадцать";
names[17] = "семнадцать";
names[18] = "восемнадцать";
names[19] = "девятнадцать";
names[20] = "двадцать";
names[30] = "тридцать";
names[40] = "сорок";
names[50] = "пятьдесят";
names[60] = "шестьдесят";
names[70] = "семьдесят";
names[80] = "восемьдесят";
names[90] = "девяносто";
names[100] = "сто";
names[200] = "двести";
names[300] = "триста";
names[400] = "четыреста";
names[500] = "пятьсот";
names[600] = "шестьсот";
names[700] = "семьсот";
names[800] = "восемьсот";
names[900] = "девятьсот";

startGame();

// кнопка заново
document.querySelector("#btnRetry").addEventListener("click", function () {
  startGame();
});
// ...

// кнопка больше
document.querySelector("#btnOver").addEventListener("click", function () {
  if (gameRun) {
    if (minValue === maxValue) {
      answerField.innerText = guessedWrong();
      gameRun = false;
    } else {
      minValue = answerNumber + 1;
      answerNumber = Math.floor((minValue + maxValue) / 2);
      orderNumber++;

      checkAnswerNumberText();

      orderNumberField.innerText = orderNumber;
    }
  }
});
// ...

// кнопка верно
document.querySelector("#btnEqual").addEventListener("click", function () {
  if (gameRun) {
    answerField.innerText = right();
    gameRun = false;
  }
});
// ...

// кнопка меньше
document.querySelector("#btnLess").addEventListener("click", function () {
  if (gameRun) {
    if (minValue === maxValue) {
      answerField.innerText = guessedWrong();
      gameRun = false;
    } else {
      maxValue = answerNumber - 1;
      answerNumber = Math.ceil((minValue + maxValue) / 2);
      orderNumber++;

      checkAnswerNumberText();

      orderNumberField.innerText = orderNumber;
    }
  }
});
// ...

// слушатель на кнопку Ок в модальном окне диапазона
buttonOk.addEventListener("click", () => {
  minValue = parseInt(inputWindowMin.value);
  maxValue = parseInt(inputWindowMax.value);

  // округление до 999
  // исправление ошибки при вводе положительного числа больше 999 в минимум
  // аналогично с максимумом
  minValue > 999 ? (minValue = 999) : (minValue = minValue);
  maxValue < -999 ? (maxValue = -999) : (maxValue = maxValue);
  // ...

  // проверка минимума и максимума
  // если минимальное меньше -999, то значение устанавливается -999
  // аналогично с максимумом
  minValue < -999 ? (minValue = -999) : (minValue = minValue);
  maxValue > 999 ? (maxValue = 999) : (maxValue = maxValue);
  // ...

  // проверка введённых данных
  // если введено не число установка значений по умолчанию
  if (isNaN(minValue) || isNaN(maxValue)) {
    minValue = 0;
    maxValue = 100;
  }
  // если минимум больше или равен максимуму установка значений по умолчанию
  else if (minValue >= maxValue) {
    minValue = 0;
    maxValue = 100;
  }
  // ...

  modalWindow.hide(); // закрытие модального окна диапазона
});
// ...

// слушатель на кнопку Закрыть в модальном окне диапазона
buttonClose.addEventListener("click", () => {
  minValue = 0;
  maxValue = 100;
});
// ...

// слушатель на закрытие модального окна диапазона
modalWindowElement.addEventListener("hidden.bs.modal", () => {
  answerField.innerText = "Вы загадали число...";
  alertMessage.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
  modalAlert.show(); // вызов модального окна alert

  // слушатель на закрытие моадльного окна alert
  modalAlertElement.addEventListener("hidden.bs.modal", () => {
    answerNumber = Math.floor((minValue + maxValue) / 2);
    checkAnswerNumberText();
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    gameRun = true;
  });
  // ...
});
// ...

// функция формирующая 3 варианта ответа при попытке угадывания числа
function guess(answer) {
  const phraseRandom = Math.round(Math.random() * 2);
  if (phraseRandom === 1) {
    return `Вы загадали число ${answer}?`;
  } else if (phraseRandom === 2) {
    return `Так... Наверное, вы загадали число ${answer}?`;
  } else return `Скорее всего, загаданное вами число это ${answer}!?`;
}
// ...

// функция формирующая 3 варианта ответа если не угадал число
function guessedWrong() {
  const phraseRandom = Math.round(Math.random() * 2);
  if (phraseRandom === 1) {
    return `Вы загадали неправильное число!\n\u{1F9D0}`;
  } else if (phraseRandom === 2) {
    return `Я сдаюсь...\n\u{1F615}`;
  } else return `Эх... Мне кажется вы меня обманываете...\n\u{1F914}`;
}
// ...

// функция формирующая 3 варианта ответа при нажатии кнопки верно
function right() {
  const phraseRandom = Math.round(Math.random() * 2);
  if (phraseRandom === 1) {
    return `Я всегда угадываю\n\u{1F60E}`;
  } else if (phraseRandom === 2) {
    return `Я так и знал!\n\u{1F609}`;
  } else return `Это было проще простого\n\u{1F920}`;
}
// ...

// функция преобразовывает цифровое число в число прописью
function numberToPhrase(number) {
  let result = "";
  let residue = 0; // остаток
  let digit = 0; // разряд (10, 100)

  // обработка чисел от 0 до 20
  if (number >= 0 && number <= 20) {
    result = names[number];
  }

  // для отрицательных
  else if (number < 0 && number >= -20) {
    result = "минус " + names[Math.abs(number)];
  }
  // ...

  // обработка чисел от 21 до 99
  else if (number > 20 && number < 100) {
    residue = number % 10;
    if (residue === 0) {
      result = names[number];
    } else {
      digit = number - residue;
      result = names[digit] + " " + names[residue];
    }
  }

  // для отрицательных
  else if (number < -20 && number > -100) {
    residue = Math.abs(number) % 10;
    if (residue === 0) {
      result = "минус " + names[Math.abs(number)];
    } else {
      digit = Math.abs(number) - residue;
      result = "минус " + names[digit] + " " + names[residue];
      console.log(result);
    }
  }
  // ...

  // обработка числа от 100 до 999
  else if (number >= 100 && number < 1000) {
    residue = number % 100;
    digit = number - residue;
    if (residue === 0) {
      result = names[digit];
    } else if (residue % 10 === 0) {
      result = names[digit] + " " + names[residue];
    } else if (residue > 0 && residue <= 20) {
      result = names[digit] + " " + names[residue];
    } else {
      result = names[digit] + " ";
      digit = residue - (residue % 10);
      result += names[digit] + " " + names[residue % 10];
    }
  }

  // для отрицательных
  else if (number <= -100 && number > -1000) {
    residue = Math.abs(number) % 100;
    digit = Math.abs(number) - residue;
    if (residue === 0) {
      result = "минус " + names[digit];
    } else if (residue % 10 === 0) {
      result = "минус " + names[digit] + " " + names[residue];
    } else if (residue > 0 && residue <= 20) {
      result = "минус " + names[digit] + " " + names[residue];
    } else {
      result = "минус " + names[digit] + " ";
      digit = residue - (residue % 10);
      result += names[digit] + " " + names[residue % 10];
    }
  }
  // ...

  return result;
}
// ...

// функция проверяет ответ, если ответ прописью меньше 20-ти символов, то выводит его, иначе выводит число цифрами
function checkAnswerNumberText() {
  let answerNumberText = "";
  if (numberToPhrase(answerNumber).length < 20) {
    answerNumberText = numberToPhrase(answerNumber);
    answerField.innerText = guess(answerNumberText);
  } else {
    answerField.innerText = guess(answerNumber);
  }
}
// ...

// функция начинающая игру
function startGame() {
  inputWindowMin.value = 0;
  inputWindowMax.value = 100;
  modalWindow.show(); // вызов модального окна диапазона
}
// ...
