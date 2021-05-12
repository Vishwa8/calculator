const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const calculate = {
    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber, 
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber, 
    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber, 
    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber, 
    '=' : (firstNumber, secondNumber) => secondNumber, 
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const sendNumberValue = (number) => {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
};

const useOperator = (operator) => {
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    const currentValue = Number(calculatorDisplay.textContent);
    if (!firstValue) firstValue = currentValue;
    else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        firstValue = calculation;
        calculatorDisplay.textContent = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
};

const addDecimal = () => {
    if (awaitingNextValue 
        || calculatorDisplay.textContent.includes('.')) return;
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
};

const resetAll = () => {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
};

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', addDecimal);
    }
});

clearBtn.addEventListener('click', resetAll);