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
  if (b === "0") {
    alert("That one makes my head hurt. Gimme another one.");
  } else {
    return +a / +b;
  }
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
let onFirstNum = false;
const nums = document.querySelectorAll(".num");
const display = document.querySelector("#display-main");
const displaySecond = document.querySelector("#display-secondary");

nums.forEach((num) =>
  num.addEventListener("click", () => {
    onNumberPress();
    if (display.textContent.length === 25) {
      return;
    } else {
      display.textContent += num.value;
    }
  })
);
function onNumberPress() {
  if (!firstNum && onFirstNum === false) {
    resetDisplay();
    onFirstNum = true;
  }
  if (display.textContent === "0") display.textContent = "";
  if (firstNum && onSecondNum == false) {
    ontoSecondNumber();
  }
  if (firstNum && firstNum === answer) {
    displayExp();
  }
}
function ontoSecondNumber() {
  onFirstNum = false;
  onSecondNum = true;
  display.textContent = "";
  textBlink();
}
function resetDisplay() {
  display.textContent = "";
  displaySecond.textContent = "";
}

const operators = document.querySelectorAll(".operator");
operators.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (!operator) operator = btn.value;
    onOperatorPress();
    if (answer) operator = btn.value;
    //answer exists because a second operation was activated while the calculator only evaluates one operation at a time
    displayExp();
  })
);
function onOperatorPress() {
  textBlink();
  if (!firstNum) {
    firstNum = display.textContent;
  }
  if (operator && onSecondNum) evaluate();
}
function displayExp() {
  if (!firstNum) return;
  if (!secondNum) {
    displaySecond.textContent = `${firstNum} ${operator}`;
  } else {
    displaySecond.textContent = `${firstNum} ${operator} ${secondNum}`;
  }
}
function textBlink() {
  display.style.opacity = "0";
  setTimeout(() => (display.style.opacity = "1"), 50);
}

const decimal = document.querySelector("#dec");
decimal.addEventListener("click", onDecimal);
function onDecimal() {
  if (!display.textContent) {
    onFirstNum = true;
    return (display.textContent = "0.");
  }
  if (firstNum && operator && onSecondNum === false) {
    ontoSecondNumber();
    return (display.textContent = "0.");
  }
  if (display.textContent.indexOf(".") === -1) {
    display.textContent += ".";
    appendAnswer();
  }
}
function appendAnswer() {
  if (onFirstNum === false) onFirstNum = true;
  //checking if number on screen is result of an evaluation. Appends number then refreshes displaySecond
  if (operator && onSecondNum === false) {
    firstNum = display.textContent;
    displayExp();
  }
  if (!display.textContent && onSecondNum === false) {
    operator = "";
    displayExp();
  }
}

const percent = document.querySelector("#percentage");
percent.addEventListener("click", () => {
  if (!display.textContent) return;
  display.textContent = display.textContent / 100;
  appendAnswer();
});

const absolute = document.querySelector("#pos-neg");
absolute.addEventListener("click", () => {
  +display.textContent < 0
    ? (display.textContent = Math.abs(display.textContent))
    : (display.textContent = -Math.abs(display.textContent));
  appendAnswer();
});

const equals = document.querySelector("#equal");
equals.addEventListener("click", () => {
  if (!operator) return;
  evaluate();
  reset();
});
function reset() {
  firstNum = "";
  operator = "";
  answer = "";
}
function evaluate() {
  secondNum = display.textContent;
  displayExp();
  answer = operate(firstNum, secondNum);
  display.textContent = answer;
  firstNum = answer;
  resetSoft();
}

function resetSoft() {
  secondNum = "";
  onSecondNum = false;
}

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", deleter);
function deleter() {
  display.textContent = display.textContent.slice(0, -1);
  appendAnswer();
}
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => (display.textContent = ""));

const ce = document.querySelector("#ce");
ce.addEventListener("click", () => {
  resetSoft();
  reset();
  resetDisplay();
});

window.addEventListener("keydown", (e) => {
  const key = document.querySelector(`button[value="${e.key}"]`);
  if (!key) return;
  const glow = key.querySelector(".glow");
  key.classList.add("active");
  if (glow) glow.classList.add("active");

  if (Number.isInteger(+e.key)) {
    onNumberPress();
    if (display.textContent.length === 25) {
      return;
    } else {
      display.textContent += e.key;
    }
  } else if (
    e.key === "*" ||
    e.key === "/" ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "^"
  ) {
    if (!operator) operator = e.key;
    onOperatorPress();
    if (answer) operator = e.key;
    displayExp();
  } else if (e.key === "=" || e.key === "Enter") {
    if (!operator) return;
    evaluate();
    reset();
  } else if (e.key === "Backspace") {
    deleter();
  } else if (e.key === ".") {
    if (Math.floor(display.textContent) == display.textContent) {
      display.textContent += ".";
      appendAnswer();
    }
  }
});

window.addEventListener("keyup", (e) => {
  const key = document.querySelector(`button[value="${e.key}"]`);
  if (!key) return;
  const glow = key.querySelector(".glow");
  key.classList.remove("active");
  glow.classList.remove("active");
});
