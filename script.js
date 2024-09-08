let operator = "";
let firstNumber = 0;
let secondNumber = 0;

const display = document.querySelector(".display");
const resultDisplay = document.querySelector(".display-result");
const buttons = document.querySelectorAll(".button");

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
