/* Operator Functions */
function Add(input1, input2) {
    return Number(input1) + Number(input2);
};

function Subtract(input1, input2) {
    return input1 - input2;
};

function Multiply(input1, input2) {
    return input1 * input2;
};

function Divide(input1, input2) {
    return input1 / input2;
};

function operate(operattorValue, input1, input2) {
    console.log(operattorValue, input1, input2)
        if (operattorValue == '*') {
            return Multiply(input1, input2);
        }
        else if (operattorValue == '/') {
            return Divide(input1, input2);
        }
        else if (operattorValue == '+') {
            return Add(input1, input2);
        }
        else if (operattorValue == '-') {
            return Subtract(input1, input2);
        }
};

/* Screen Value */
const screen = document.querySelector('.calculator-screen');
screen.value = 0;

/* Math Variables */
let firstValue;
let currentOperator;
let secondValue;

/* Operators */
const operators = ['+','-','*','/'];

/* Button Clicking */
let button = document.querySelectorAll('button');

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function(e) {
        let value = screen.value;   
        console.log(value)
        console.log(e.target.value) 
        if (e.target.value >= 0 && e.target.value <= 9) {
            if (value >= 0 && firstValue >= 1) {
                screen.value = e.target.value;
                secondValue = undefined;
            }
            if (value == 0 && firstValue >= 1) {
                screen.value = e.target.value;
            }
            else if (value >= 1) {
                screen.value = `${value}${e.target.value}`;
            }
            else if (value >= 0 && e.target.value == '.') {
                screen.value = `${value}${e.target.value}`;
            }
            else {
                screen.value = e.target.value;
            }
        }
        else if (operators.includes(e.target.value)) {
                if (currentOperator === undefined && firstValue === undefined && secondValue === undefined) {
                    DoMath(e.target.value);
                }
                else if (currentOperator === undefined) {
                    secondValue = 0;
                    DoMath(e.target.value);
                }
                else {
                    DoMath(e.target.value);
                }
        }
        if (e.target.value == '=' && firstValue >= 1) {
            secondValue = screen.value;
            firstValue = operate(currentOperator, firstValue, secondValue);
            screen.value = firstValue;
            secondValue = undefined;
            currentOperator = undefined;
        }
        if (e.target.value == 'all-clear') {
            firstValue = undefined;
            secondValue = undefined;
            currentOperator = undefined;
            screen.value = 0;
        }
    })
};

function DoMath(value) {
    let newValue = value;
    if (screen.value >= 1) {
        if (firstValue === undefined) {
            firstValue = screen.value;
            screen.value = 0;
        }
        else if (secondValue === undefined) {
            secondValue = screen.value;
            screen.value = 0;
        }
    }
    if (newValue.indexOf(operators)) {
        if (currentOperator === undefined) {
            currentOperator = value;
            screen.value = 0;
            secondValue = undefined;
        }
    }
    if (firstValue >= 1 && secondValue >= 1 && currentOperator != undefined) {
        console.log("I here 5")
        firstValue = operate(currentOperator, firstValue, secondValue);
        screen.value = firstValue;
        secondValue = undefined;
        currentOperator = newValue;
    }
}