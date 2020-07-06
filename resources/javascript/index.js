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
        if (input1 == 0 || input2 == 0) {
            alert('Haha very funny you can\'t divide by zero')
        }
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

        if (e.target.value >= 0 && e.target.value <= 9) {
            console.log(value)
            console.log(e.target.value) 
            if (value == 0 && firstValue >= 1) {
                screen.value = e.target.value;
            }
            else if (value >= 1) {
                if (firstValue === undefined) {
                    screen.value = `${value}${e.target.value}`;
                }
                else if (firstValue >= 1 && currentOperator === undefined) {
                    firstValue = undefined;
                    screen.value = e.target.value;
                }
                else if (firstValue >= 1){
                    screen.value = `${value}${e.target.value}`;
                }
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
        else if (e.target.value == '.') {
            screen.value = `${value}${e.target.value}`;
            button[i].disabled = true;
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
        if (e.target.value == 'clear') {
            if (screen.value == 0) {
                alert('You can\'t backspace a zero');
            }
            else {
                value = screen.value;
                if (value >= 1 && value <= 9) {
                    screen.value = 0;
                }
                else {
                    value = value.slice(0,-1);
                    screen.value = value;
                }
            }
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