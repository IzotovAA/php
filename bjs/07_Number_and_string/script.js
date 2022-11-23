"use strict";

let firstOperand = 0; // первый операнд
let secondOperand = 0; // второй операнд
let addOperation = false; // для набора цифр после вторичного и дальнейшего применения оператора (+, -, *, /)
let operation = null; // текущая операция
let position = 0; // для разбивания строчки из двух операнд и оператора на части, для дальнейшего вычисления
let result = false; // после применеия равно становится true
let previusOperator = ""; // для контроля изменения оператора (+, -, *, /)
let doubleOperator = false; // для блокирования нескольких нажатий операторов подряд

const digitalButtonsArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const inputWindow = document.querySelector("#inputWindow");

//
// --- очистить ---
document.querySelector("#btn_clr").addEventListener("click", () => {
  firstOperand = 0;
  secondOperand = 0;
  addOperation = false;
  operation = null;
  position = 0;
  result = false;
  previusOperator = "";
  doubleOperator = false;
  inputWindow.value = "";
});
// ...
//

//
// --- по нажатию цифровых кнопок записывает их значение в инпут ---
digitalButtonsArray.forEach((element) => {
  document.querySelector("#btn_" + element).addEventListener("click", () => {
    if (result === true) {
      inputWindow.value = element;
      result = false;
    } else {
      inputWindow.value += element;
      doubleOperator = false;
    }
  });
});
// ...
//

//
// --- модификация равно ---
document.querySelector("#btn_result").addEventListener("click", () => {
  if (doubleOperator === true) {
    inputWindow.value = inputWindow.value;
  } else if (operation === "sum") {
    findPosition(previusOperator);
    findOperand();
    inputWindow.value = tempCalc(firstOperand, secondOperand);
    result = true;
    operation = null;
    previusOperator = "";
  } else if (operation === "dif") {
    findPosition(previusOperator);
    findOperand();
    inputWindow.value = tempCalc(firstOperand, secondOperand);
    result = true;
    operation = null;
    previusOperator = "";
  } else if (operation === "mult") {
    findPosition(previusOperator);
    findOperand();
    inputWindow.value = tempCalc(firstOperand, secondOperand);
    result = true;
    operation = null;
    previusOperator = "";
  } else if (operation === "div") {
    findPosition(previusOperator);
    findOperand();
    inputWindow.value = tempCalc(firstOperand, secondOperand);
    result = true;
    operation = null;
    previusOperator = "";
  }
});
// ...
//

//
// --- модификация сложенеия ---
document.querySelector("#btn_sum").addEventListener("click", () => {
  // возможно использовать плюс вместо равно после операции * или /
  if (operation === "mult" || operation === "div") {
    let inp = inputWindow.value;
    let checkNumber = false;

    // проверка последнего символа в выражении после операции * или /
    // checkNumber = true если последний символ цифра
    digitalButtonsArray.forEach((element) => {
      if (inp[inp.length - 1] === element) {
        checkNumber = true;
      }
    });
    // ...

    // если при операции * или / нажать плюс после любого числа
    // то выполнится расчёт предыдущего выражения, так же как при нажатии равно
    if (checkNumber) {
      findPosition(previusOperator);
      findOperand();
      inputWindow.value = tempCalc(firstOperand, secondOperand);
      inputWindow.value += "+";
      addOperation = true;
      doubleOperator = true;
      operation = "sum";
      previusOperator = "+";
    }
    // ...
  }
  // ...

  // блокировка дополнительных операторов после плюса
  if (doubleOperator === true) {
    inputWindow.value = inputWindow.value;
  }
  // ...

  // можно использовать плюс для расчёта выражения так же как равно
  // если выражение это сумма
  else if (operation === "sum") {
    findPosition(previusOperator);
    findOperand();
    inputWindow.value = tempCalc(firstOperand, secondOperand);
    inputWindow.value += "+";
    addOperation = true;
    doubleOperator = true;
  }
  // ...

  // можно использовать плюс для расчёта выражения так же как равно
  // если предыдущий оператор отличен от сложения
  else {
    if (previusOperator !== "+" && previusOperator !== "") {
      addOperation = false;
      findPosition(previusOperator);
      findOperand();
      inputWindow.value = tempCalc(firstOperand, secondOperand);
      previusOperator = "+";
      inputWindow.value += previusOperator;
      addOperation = true;
      doubleOperator = true;
      operation = "sum";
    }
    // ...

    // блокировка плюса в пустой инпут
    else {
      if (inputWindow.value === "" || inputWindow.value === "ошибка") {
        addOperation = false;
        result = false;
        inputWindow.value = "";
      }
      // ...

      // операция сложение
      else {
        addOperation = false;
        operation = "sum";
        inputWindow.value = inputWindow.value + "+";
        result = false;
        previusOperator = "+";
        doubleOperator = true;
      }
      // ...
    }
  }
});
// ...
//

//
// --- модификация вычитания ---
document.querySelector("#btn_dif").addEventListener("click", () => {
  // возможно использовать минус вместо равно после операции * или /
  if (operation === "mult" || operation === "div") {
    let inp = inputWindow.value;
    let checkNumber = false;

    // проверка последнего символа в выражении после операции * или /
    // checkNumber = true если последний символ цифра
    digitalButtonsArray.forEach((element) => {
      if (inp[inp.length - 1] === element) {
        checkNumber = true;
      }
    });
    // ...

    // блокировка ещё одного минуса после назначения оператора * или /
    // (можно умножать и делить на отрицательные числа)
    if (inp[inp.length - 1] === "-") {
      inputWindow.value = inputWindow.value;
    }
    // ...

    // если при операции * или / нажать минус после любого числа
    // то выполнится расчёт предыдущего выражения, так же как при нажатии равно
    else if (checkNumber) {
      findPosition(previusOperator);
      findOperand();
      inputWindow.value = tempCalc(firstOperand, secondOperand);
      inputWindow.value += "-";
      addOperation = true;
      doubleOperator = true;
      operation = "dif";
      previusOperator = "-";
    }
    // ...

    // возможно добавления минус после * или /
    // можно умножать и делить на отрицательные числа
    else {
      inputWindow.value += "-";
      doubleOperator = true;
    }
    // ...
  }
  // ...

  // блокировка дополнительных операторов после минуса
  else if (doubleOperator === true) {
    inputWindow.value = inputWindow.value;
  }
  // ...

  // можно использовать минус для расчёта выражения так же как равно
  // если выражение это разность
  else if (operation === "dif") {
    findPosition(previusOperator);
    findOperand();
    inputWindow.value = tempCalc(firstOperand, secondOperand);
    inputWindow.value += "-";
    addOperation = true;
    doubleOperator = true;
  }
  // ...

  // можно использовать минус для расчёта выражения так же как равно
  // если предыдущий оператор отличен от вычитания
  else {
    if (previusOperator !== "-" && previusOperator !== "") {
      addOperation = false;
      findPosition(previusOperator);
      findOperand();
      inputWindow.value = tempCalc(firstOperand, secondOperand);
      previusOperator = "-";
      inputWindow.value += previusOperator;
      addOperation = true;
      doubleOperator = true;
      operation = "dif";
    }
    // ...

    // можно записать в пустой инпут отрицательное число
    else {
      if (inputWindow.value === "") {
        addOperation = false;
        inputWindow.value = "-";
        result = false;
        doubleOperator = true;
      } else if (inputWindow.value === "ошибка") {
        inputWindow.value = "";
      }
      // ...

      // операция вычитание
      else {
        addOperation = false;
        operation = "dif";
        inputWindow.value = inputWindow.value + "-";
        result = false;
        previusOperator = "-";
        doubleOperator = true;
      }
      // ...
    }
  }
});
// ...
//

//
// --- модификация умножения ---
document.querySelector("#btn_mult").addEventListener("click", () => {
  // блокировка дополнительных операторов после *
  if (doubleOperator === true) {
    inputWindow.value = inputWindow.value;
  }
  // ...

  // можно использовать * для расчёта выражения так же как равно
  // если выражение это умножение
  else if (operation === "mult") {
    findPosition(previusOperator);
    findOperand();
    inputWindow.value = tempCalc(firstOperand, secondOperand);
    inputWindow.value += "*";
    addOperation = true;
    doubleOperator = true;
  }
  // ...

  // можно использовать * для расчёта выражения так же как равно
  // если предыдущий оператор отличен от умножения
  else {
    if (previusOperator !== "*" && previusOperator !== "") {
      addOperation = false;
      findPosition(previusOperator);
      findOperand();
      inputWindow.value = tempCalc(firstOperand, secondOperand);
      previusOperator = "*";
      inputWindow.value += previusOperator;
      addOperation = true;
      doubleOperator = true;
      operation = "mult";
    }
    // ...

    // блокировка * в пустой инпут
    else {
      if (inputWindow.value === "" || inputWindow.value === "ошибка") {
        addOperation = false;
        result = false;
        inputWindow.value = "";
      }
      // ...

      // операция умножение
      else {
        addOperation = false;
        operation = "mult";
        inputWindow.value = inputWindow.value + "*";
        result = false;
        previusOperator = "*";
        doubleOperator = true;
      }
      // ...
    }
  }
});
// ...
//

//
// --- модификация деления ---
document.querySelector("#btn_div").addEventListener("click", () => {
  // блокировка дополнительных операторов после /
  if (doubleOperator === true) {
    inputWindow.value = inputWindow.value;
  }
  // ...

  // можно использовать / для расчёта выражения так же как равно
  // если выражение это деление
  else if (operation === "div") {
    findPosition(previusOperator);
    findOperand();
    inputWindow.value = tempCalc(firstOperand, secondOperand);
    inputWindow.value += "/";
    addOperation = true;
    doubleOperator = true;
  }
  // ...

  // можно использовать / для расчёта выражения так же как равно
  // если предыдущий оператор отличен от деления
  else {
    if (previusOperator !== "/" && previusOperator !== "") {
      addOperation = false;
      findPosition(previusOperator);
      findOperand();
      inputWindow.value = tempCalc(firstOperand, secondOperand);
      previusOperator = "/";
      inputWindow.value += previusOperator;
      addOperation = true;
      doubleOperator = true;
      operation = "div";
    }
    // ...

    // блокировка / в пустой инпут
    else {
      if (inputWindow.value === "" || inputWindow.value === "ошибка") {
        addOperation = false;
        result = false;
        inputWindow.value = "";
      }
      // ...

      // операция деления
      else {
        addOperation = false;
        operation = "div";
        inputWindow.value = inputWindow.value + "/";
        result = false;
        previusOperator = "/";
        doubleOperator = true;
      }
      // ...
    }
  }
});
// ...
//

//
// --- корень квадратный ---
document.querySelector("#btn_sqrt").addEventListener("click", () => {
  // ошибка при попытке извлечь sqrt из отрицательного значения
  let inp = inputWindow.value;
  if (inputWindow.value[0] === "-") {
    inputWindow.value = "ошибка";
    result = true;
  }
  // ...

  // можно использовать sqrt для расчёта выражения так же как равно
  // если предыдущий оператор отличен от sqrt
  else if (previusOperator !== "") {
    addOperation = false;
    findPosition(previusOperator);
    findOperand();
    inputWindow.value = Math.sqrt(tempCalc(firstOperand, secondOperand));
    previusOperator = "";
    addOperation = true;
    operation = "sqrt";
  }
  // ...

  // блокировка sqrt в пустой инпут
  else if (inputWindow.value === "") {
    addOperation = false;
    result = false;
    inputWindow.value = "";
  }
  // ...

  // операция извлечения квадратного корня
  else {
    addOperation = false;
    operation = "sqrt";
    inputWindow.value = Math.sqrt(Number(inputWindow.value));
    result = false;
    previusOperator = "";
  }
  // ...
});
// ...
//

// поиск позиции оператора в инпуте (+, -, /, *)
function findPosition(element) {
  position = inputWindow.value.lastIndexOf(element);
}
// ...

// расчёт выражения
function tempCalc(elem1, elem2) {
  let res = 0;
  if (previusOperator === "+") {
    return (res = Number(elem1) + Number(elem2));
  } else if (previusOperator === "-") {
    return (res = Number(elem1) + Number(elem2));
  } else if (previusOperator === "*") {
    return (res = Number(elem1) * Number(elem2));
  } else if (previusOperator === "/") {
    return (res = Number(elem1) / Number(elem2));
  }
}
// ...

// вычленение операндов из выражения
function findOperand() {
  if (operation === "sum" || operation === "dif") {
    firstOperand = inputWindow.value.substring(0, position);
    secondOperand = inputWindow.value.substring(position);
  } else if (operation === "mult" || operation === "div") {
    firstOperand = inputWindow.value.substring(0, position);
    secondOperand = inputWindow.value.substring(position + 1);
  }
}
// ...
