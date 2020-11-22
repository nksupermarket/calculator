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
    return alert("That one makes my head hurt. Gimme another one.");
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
let onFirstNum = true;
let stillOperating = true;
let evaluated = false;
const nums = document.querySelectorAll(".num");
const display = document.querySelector("#display-main");
const displaySecond = document.querySelector("#display-secondary");

nums.forEach((num) =>
  num.addEventListener("click", () => {
    numberCheck();
    if (display.textContent.length === 25) {
      return;
    } else {
      display.textContent += num.value;
    }
  })
);

function numberCheck() {
  if (display.textContent === "0") display.textContent = "";

  if (firstNum && onSecondNum == false) {
    ontoSecondNumber();
  }

  if (evaluated === true && onFirstNum === false) {
    resetDisplay();
    evaluated = false;
  }
  //checking for an evaluation computted by operator press
  if (firstNum === answer) {
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
    if (stillOperating) operator = btn.value;
    displayExp();
  })
);

function onOperatorPress() {
  textBlink();

  if (display.textContent && !firstNum) {
    (function newEval() {
      firstNum = display.textContent;
      evaluated = false;
    })();
  }

  if (operator && onSecondNum) {
    stillOperating = true;
    evaluate();
  }
}

function displayExp() {
  if (firstNum != "0" && !firstNum) return;
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
  if (!display.textContent && !firstNum) {
    onFirstNum = true;
    return (display.textContent = "0.");
  }
  if (firstNum && operator && onSecondNum === false) {
    ontoSecondNumber();
    return (display.textContent = "0.");
  }
  if (display.textContent.indexOf(".") === -1) {
    display.textContent += ".";
    displayExp();
  }
  appendAnswer();
}
function appendAnswer() {
  if (evaluated === true) {
    onFirstNum = true;
  }
  if (stillOperating === true) {
    onSecondNum = true;
  }
}

const percent = document.querySelector("#percentage");
percent.addEventListener("click", () => {
  if (!display.textContent) return;
  display.textContent = display.textContent / 100;
  appendAnswer();
  displayExp();
});

const absolute = document.querySelector("#pos-neg");
absolute.addEventListener("click", () => {
  +display.textContent < 0
    ? (display.textContent = Math.abs(display.textContent))
    : (display.textContent = -Math.abs(display.textContent));
  appendAnswer();
  displayExp();
});

const equals = document.querySelector("#equal");
equals.addEventListener("click", onEqual);
function onEqual() {
  if (!operator && secondNum) return;
  stillOperating = false;
  evaluate();
  evaluated = true;
  reset();
}
function reset() {
  firstNum = "";
  operator = "";
  answer = "";
  stillOperating = false;
  onFirstNum = false;
}
function evaluate() {
  secondNum = display.textContent;
  answer = operate(firstNum, secondNum);
  display.textContent = answer;
  if (answer) appendNotepad();
  if (stillOperating === true) firstNum = answer;
  displayExp();
  resetSoft();
}
function appendNotepad() {
  const notepad = document.getElementById("notepad");
  const note = document.createElement("p");

  note.classList.add("note", "note-animate");

  type(note);
  notepad.appendChild(note);
}

function type(a) {
  let index = 0;
  let letter = "";
  const arg = a;
  const numFirst = firstNum;
  const numSec = secondNum;
  const op = operator;
  const ans = answer;

  (function animation() {
    const str = `${numFirst} ${op} ${numSec} = ${ans}`;
    letter = str.slice(0, index++);

    arg.textContent = letter;
    if (letter.length === str.length) {
      setTimeout(() => arg.classList.remove("note-animate"), 2000);
      return;
    }
    setTimeout(animation, 200);
  })();
}

function resetSoft() {
  secondNum = "";
  onSecondNum = false;
}

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", deleter);
function deleter() {
  display.textContent = display.textContent.slice(0, -1);
  displayExp();
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
  key.classList.add("active");

  if (e.key != "=" && e.key != "Enter") {
    const glow = key.querySelector(".glow");
    if (glow) glow.classList.add("active");
  }
});

window.addEventListener("keydown", (e) => {
  if (Number.isInteger(+e.key)) {
    numberCheck();
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
    if (stillOperating) operator = e.key;
    displayExp();
  } else if (e.key === "=" || e.key === "Enter") {
    onEqual();
  } else if (e.key === "Backspace") {
    deleter();
  } else if (e.key === ".") {
    onDecimal();
  } else if (e.key === "c") {
    display.textContent = "";
  } else if (e.key === "e") {
    resetSoft();
    reset();
    resetDisplay();
  }
});

window.addEventListener("keyup", (e) => {
  const key = document.querySelector(`button[value="${e.key}"]`);
  if (!key) return;

  key.classList.remove("active");
  if (e.key != "=" && e.key != "Enter") {
    const glow = key.querySelector(".glow");
    glow.classList.remove("active");
  }
});

const toggle = document.querySelector(".switch");

toggle.addEventListener("input", (e) => {
  const checked = e.target.checked;

  checked
    ? document.documentElement.setAttribute("color-mode", "dark")
    : document.documentElement.setAttribute("color-mode", "light");
});
