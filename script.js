let operator = "";
let firstNumber = 0;
let secondNumber = 0;
let isNewNumber = false;

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
        handleInputs(e.target);
    });
});

document.addEventListener("keyup", (e) => {
    handleInputsKeys(e.key);
});

function handleInputsKeys(key) {
    console.log("key: " + key);
    if (isOperator(key)) {
        if (operator !== "") {
            // if operation has more than one operator
            displayOperationResult();
            firstNumber = Number(display.textContent);
            operator = key;
        } else {
            firstNumber = Number(display.textContent);
            display.textContent = "0";
            operator = key;
        }
    } else if (isNumber(key)) {
        displayNumberOnDisplay(key);
    } else if (key === "=" || key === "Enter") {
        displayOperationResult();
    } else if (key === "Backspace" || key === "Delete") {
        DeleteNumber();
    } else if (key === ".") {
        addDot(key);
    } else if (key === "Escape") {
        memoryClear();
    } else {
        return;
    }
}

function isOperator(string) {
    return string === "+" || string === "-" || string === "*" || string === "/";
}

function isNumber(string) {
    return !isNaN(string);
}

function handleInputs(button) {
    switch (button.textContent) {
        case "+":
        case "/":
        case "-":
        case "*":
            if (operator !== "") {
                // if operation has more than one operator
                displayOperationResult();
                firstNumber = Number(display.textContent);
                operator = button.textContent;
                isNewNumber = true;
            } else {
                firstNumber = Number(display.textContent);
                display.textContent = "0";
                operator = button.textContent;
            }
            break;
        case "=":
            displayOperationResult();
            break;
        case "MC":
            memoryClear();
            break;
        case "DEL":
            DeleteNumber();
            break;
        case ".":
            addDot(button.textContent);
            break;
        default:
            displayNumberOnDisplay(button.textContent);
            break;
    }
}

function addDot(elementText) {
    // if there is a dot button stops working
    if (!display.textContent.split("").includes(".")) {
        displayNumberOnDisplay(elementText);
    }
}

function DeleteNumber() {
    // if NaN delete all text Content
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
    resultDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    operator = "";
    secondNumber = 0;
    isNewNumber = true;
}

function displayNumberOnDisplay(elementText) {
    if (display.textContent == 0 || isNewNumber) {
        display.textContent = elementText;
        isNewNumber = false;
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
