let lastOperand = 0;
let operation = null;

const inputWindow = document.querySelector("#inputWindow");

const digitalButtonsArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//очистить
document.querySelector("#btn_clr").addEventListener("click", () => {
  lastOperand = 0;
  operation = null;
  inputWindow.value = "";
});

//по нажатию цифровых кнопок записывает их значение в инпут
digitalButtonsArray.forEach((element) => {
  document.querySelector("#btn_" + element).addEventListener("click", () => {
    inputWindow.value += element;
  });
});

//равно
document.querySelector("#btn_result").addEventListener("click", () => {
  if (operation === "sum") {
    inputWindow.value = lastOperand + Number(inputWindow.value);
  } else if (operation === "dif") {
    inputWindow.value = lastOperand - Number(inputWindow.value);
  } else if (operation === "mult") {
    inputWindow.value = lastOperand * Number(inputWindow.value);
  } else if (operation === "div") {
    inputWindow.value = lastOperand / Number(inputWindow.value);
  }
});

//сложение
document.querySelector("#btn_sum").addEventListener("click", () => {
  operation = "sum";
  lastOperand = Number(inputWindow.value);
  inputWindow.value = "";
});

//вычитание
document.querySelector("#btn_dif").addEventListener("click", () => {
  operation = "dif";
  lastOperand = Number(inputWindow.value);
  inputWindow.value = "";
});

//умножение
document.querySelector("#btn_mult").addEventListener("click", () => {
  operation = "mult";
  lastOperand = Number(inputWindow.value);
  inputWindow.value = "";
});

//деление
document.querySelector("#btn_div").addEventListener("click", () => {
  operation = "div";
  lastOperand = Number(inputWindow.value);
  inputWindow.value = "";
});

//корень квадратный
document.querySelector("#btn_sqrt").addEventListener("click", () => {
  operation = null;
  inputWindow.value = Math.sqrt(Number(inputWindow.value));
});
