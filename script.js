function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  return +a / +b;
}

function exponent(a, b) {
  return Math.pow(+a, +b);
}
function operate(a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "^":
      return exponent(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

let firstNum;
let secondNum;
let answer;
let operator;
let onSecondNum = false;
const nums = document.querySelectorAll(".num");
const display = document.querySelector("#display-main");
const displaySecond = document.querySelector("#display-secondary");

nums.forEach((num) =>
  num.addEventListener("click", () => {
    onNumberPress();
    display.textContent += num.value;
  })
);
function onNumberPress() {
  if (answer) {
    resetDisplay();
  }
  if (display.textContent === "0") display.textContent = "";
  if (firstNum && onSecondNum == false) {
    onSecondNum = true;
    display.textContent = "";
    textBlink();
  }
}
function resetDisplay() {
  answer = "";
  display.textContent = "";
  displaySecond.textContent = "";
}

const operators = document.querySelectorAll(".operator");
operators.forEach((btn) =>
  btn.addEventListener("click", () => {
    firstNum = display.textContent;
    if (firstNum) operator = btn.value;
    onOperatorPress();
  })
);
function onOperatorPress() {
  if (operator && onSecondNum) evaluate();
  if (firstNum) {
    answer = "";
    displaySecond.textContent = `${firstNum} ${operator}`;
    textBlink();
  }
}
function textBlink() {
  display.style.opacity = "0";
  setTimeout(() => (display.style.opacity = "1"), 50);
}

const decimal = document.querySelector("#dec");
decimal.addEventListener("click", () => {
  if (display.textContent.indexOf(".") === -1) display.textContent += ".";
});

const percent = document.querySelector("#percentage");
percent.addEventListener(
  "click",
  () => (display.textContent = +display.textContent * 0.01)
);

const absolute = document.querySelector("#pos-neg");
absolute.addEventListener("click", () => {
  +display.textContent < 0
    ? (display.textContent = Math.abs(display.textContent))
    : (display.textContent = -Math.abs(display.textContent));
});

const equals = document.querySelector("#equal");
equals.addEventListener("click", () => {
  if (answer || !operator) return;
  evaluate();
});

function evaluate() {
  secondNum = display.textContent;
  displaySecond.textContent = `${firstNum} ${operator} ${secondNum}`;
  answer = operate(firstNum, secondNum);
  display.textContent = answer;
  reset();
}
function reset() {
  firstNum = "";
  secondNum = "";
  operator = "";
  onSecondNum = false;
}

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", deleter);
function deleter() {
  display.textContent = display.textContent.slice(0, -1);
}
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => (display.textContent = ""));

const ce = document.querySelector("#ce");
ce.addEventListener("click", () => {
  reset();
  resetDisplay();
});

window.addEventListener("keydown", (e) => {
  console.log(e);
  if (Number.isInteger(+e.key)) {
    onNumberPress();
    display.textContent += e.key;
  } else if (
    e.key === "*" ||
    e.key === "/" ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "^"
  ) {
    firstNum = display.textContent;
    if (firstNum) operator = e.key;
    onOperatorPress();
  } else if (e.key === "=" || e.key === "Enter") {
    if (answer || !operator) return;
    evaluate();
  } else if (e.key === "Backspace") {
    deleter();
  } else if (e.key === ".") {
    if (display.textContent.indexOf(".") === -1) display.textContent += ".";
  }
});
