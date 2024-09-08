let operator = "";
let firstNumber = 0;
let secondNumber = 0;

const operators = {
    "+": function add(a, b) {
        return a + b;
    },
    "-": function subtract(a, b) {
        return a - b;
    },
    "*": function multiply(a, b) {
        return a * b;
    },
    "/": function divide(a, b) {
        return a / b;
    },
};

const display = document.querySelector(".display");
const resultDisplay = document.querySelector(".display-result");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        switch (e.target.textContent) {
            case "+":
            case "/":
            case "-":
            case "*":
                if (operator !== "") {
                    // if operation has more than one operator
                    displayOperationResult();
                    firstNumber = Number(display.textContent);
                    operator = e.target.textContent;
                } else {
                    firstNumber = Number(display.textContent);
                    display.textContent = "0";
                    operator = e.target.textContent;
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
                addDot(e);
                break;
            default:
                displayNumberOnDisplay(e);
                break;
        }
    });
});

function addDot(e) {
    // if there is a dot button stops working
    if (!display.textContent.split("").includes(".")) {
        displayNumberOnDisplay(e);
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
}

function displayNumberOnDisplay(e) {
    if (operator !== "") {
        display.textContent = 0;
    }
    if (display.textContent == 0) {
        display.textContent = e.target.textContent;
    } else {
        display.textContent += e.target.textContent;
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
    return result.toFixed(5);
}
