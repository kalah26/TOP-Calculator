const display = document.getElementById('display')
const digits = document.querySelectorAll('.digit')
const resetButton = document.getElementById('resetButton')
const deleteButton = document.getElementById('deleteButton')
const operators = document.querySelectorAll('.operator')
const equalButton = document.getElementById('equalButton')
const decimalButton = document.getElementById('decimalButton')
const signToggle = document.getElementById('signToggle')
const percentageButton = document.getElementById('percentageButton')
let firstOperand = ''
let secondOperand = ''
let resetScreen = false;
let currentOperator = NaN;

function appendDigit(number) {
    if (display.textContent === '0' || resetScreen) resetDisplay();
    display.textContent += number;
}

digits.forEach((digit) => digit.addEventListener('click', () => appendDigit(digit.textContent)))
resetButton.addEventListener('click', () => clearDisplay())
deleteButton.addEventListener('click', () => erase())
operators.forEach((operator) => operator.addEventListener('click', ()=> {
    if (currentOperator !== null) calculate();
    firstOperand = display.textContent
    currentOperator = operator.textContent
    resetScreen = true;
}))

equalButton.addEventListener('click', ()=> calculate())
decimalButton.addEventListener('click', ()=> {
    if (display.textContent.includes('.')) return
    if (display.textContent === '0') display.textContent = '0'
    appendDigit('.')
})

signToggle.addEventListener('click', ()=> {
    display.textContent = negate(display.textContent)
})

percentageButton.addEventListener('click', ()=> {
    display.textContent = percentage(display.textContent)
})

function clearDisplay() {
    display.textContent = '0'
    currentOperator = null
}

function resetDisplay() {
    display.textContent = '';
    resetScreen = false;
}

function erase() {
    display.textContent = display.textContent.slice(0,-1)
    if (currentOperator !== null && display.textContent !== '0') currentOperator = null
    if (display.textContent.length === 0 && display.textContent !== 0) display.textContent = '0'
}

function calculate() {
    if (currentOperator === null || resetScreen) return;
    secondOperand = display.textContent;
    const result = round(operate(currentOperator, firstOperand, secondOperand));
    display.textContent = result;
    currentOperator = null
    resetScreen = true
}

/* operations */
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function negate(a) {
    return -1 * a;
}

function percentage(a) {
    return a / 100;
}

function round(a) {
    return Math.round(1000*a) / 1000
}

function operate(operand, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operand) {
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b)
        case "×":
            return multiply(a, b)
        case "÷":
            return divide(a, b)
        default:
            return null;
    }
}