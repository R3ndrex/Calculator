let operator = "";
let firstNumber = 0;
let secondNumber = 0;

const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};

const display = document.querySelector(".display");
const resultDisplay = document.querySelector(".display-result");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleInputs(e.target.textContent);
    });
});

document.addEventListener("keyup", (e) => {
    handleInputs(e.key);
});

function handleInputs(elementText) {
    if (isOperator(elementText)) {
        handleOperatorInput(elementText);
    } else if (isNumber(elementText)) {
        displayNumberOnDisplay(elementText);
    } else if (elementText === "=" || elementText === "Enter") {
        displayOperationResult();
    } else if (elementText === "Backspace" || elementText === "Delete") {
        DeleteNumber();
    } else if (elementText === ".") {
        addDot(elementText);
    } else if (elementText === "Escape" || elementText === "MC") {
        memoryClear();
    } else {
        return;
    }
}

function handleOperatorInput(elementText) {
    if (operator !== "") {
        // if operation has more than one operator
        displayOperationResult();
        firstNumber = Number(display.textContent);
        operator = elementText;
    } else {
        firstNumber = Number(display.textContent);
        display.textContent = "0";
        operator = elementText;
    }
}

function isOperator(string) {
    return string === "+" || string === "-" || string === "*" || string === "/";
}

function isNumber(string) {
    return !isNaN(string);
}

function addDot(elementText) {
    // if there is a dot button stops working
    if (!display.textContent.split("").includes(".")) {
        displayNumberOnDisplay(elementText);
    }
}

function DeleteNumber() {
    // if NaN delete all text content
    if (isNaN(display.textContent)) {
        display.textContent = 0;
        return;
    }
    let array = Array.from(display.textContent);
    array.pop();
    display.textContent = Number(array.join(""));
}

function displayOperationResult() {
    secondNumber = Number(display.textContent);
    display.textContent = operate(operator, firstNumber, secondNumber);
    if (Number(display.textContent) > 1e9) {
        display.textContent = Number(display.textContent).toExponential(2);
    }
    if (firstNumber > 1e9) {
        firstNumber = firstNumber.toExponential(2);
    }
    if (secondNumber > 1e9) {
        secondNumber = secondNumber.toExponential(2);
    }
    resultDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    operator = "";
    secondNumber = 0;
}

function displayNumberOnDisplay(elementText) {
    if (display.textContent == 0) {
        display.textContent = elementText;
    } else {
        display.textContent += elementText;
    }
}

function memoryClear() {
    display.textContent = 0;
    resultDisplay.textContent = 0;
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
}

function operate(operator, firstNumber, secondNumber) {
    if (operator === "/" && secondNumber === 0) return NaN;
    let result = operators[operator](firstNumber, secondNumber);
    if (result % 1 === 0) {
        return result;
    }
    return result.toFixed(2);
}
