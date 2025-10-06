function add(num1, num2) {
    return num1 + num2;
}

function mult(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function subt(num1, num2) {
    return num1 - num2;
}

function operate(num1, num2, operator) {
    let result = 0;
    switch(operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subt(num1, num2);
            break;
        case "*":
            result = mult(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
        default:
            console.log("Invalid operator.");
            return;
    }
    return result;
}
