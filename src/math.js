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
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subt(num1, num2);
        case "*": return mult(num1, num2);
        case "/": return divide(num1, num2);
        default:
            console.log("default")
            return NaN;
    }
}

function extractNumber(expr) {
    let extract = "";
    let i = 0;

    // optionales Vorzeichen
    if (expr[i] === '-' || expr[i] === '+') {
        extract += expr[i];
        i++;
    }

    let dotUsed = false;
    while (i < expr.length) {
        const ch = expr[i];
        if (ch === '.') {
            if (dotUsed) break; // zweiter Punkt → Zahl zu Ende
            dotUsed = true;
            extract += ch;
        } else if (/[0-9]/.test(ch)) {
            extract += ch;
        } else {
            break;
        }
        i++;
    }

    return { number: Number(extract), rest: expr.slice(i) };
}

function evaluate(expression) {
    expression = expression.replace(/\s+/g, '').trim();

    // Schritt 1: Zahlen & Operatoren extrahieren
    const numbers = [];
    const operators = [];

    while (expression.length > 0) {
        const { number, rest } = extractNumber(expression);
        numbers.push(number);
        expression = rest;

        if (expression.length > 0) {
            operators.push(expression[0]);
            expression = expression.slice(1);
        }
    }

    // Schritt 2: * und / zuerst auswerten
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/') {
            // console.log(numbers[i] + " , " + numbers[i + 1] + " , " + operators[i])
            const res = operate(numbers[i], numbers[i + 1], operators[i]);
            // console.log(res);
            numbers.splice(i, 2, res);   // ersetze zwei Zahlen durch Ergebnis
            operators.splice(i, 1);      // entferne Operator
            i--; // Array kürzer geworden → Index korrigieren
        }
    }

    // Schritt 3: + und - auswerten
    let result = numbers[0];
    console.log(operators.length)
    for (let i = 0; i < operators.length; i++) {
        // console.log(result + " , " + numbers[i + 1] + " , " + operators[i])
        result = operate(result, numbers[i + 1], operators[i]);
    }

    return Math.round(result * 100) / 100;
}




function generateCalculator() {
    const body = document.getElementById("body");
    const display = document.getElementById("display");
    const inputDiv = document.getElementById("inputDiv");
    const inputButtons = Array.from(document.getElementsByClassName("inputButton"));
    const evalButton = document.getElementById("buttonEval");
    const clearButton = document.getElementById("buttonAC");
    const backButton = document.getElementById("buttonBack");
    
    inputButtons.forEach(element => {
        document.getElementById(element.id).addEventListener("mousedown", () => {
            display.textContent += document.getElementById(element.id).textContent;
        })
    });

    evalButton.addEventListener("mousedown", () => {
        display.textContent = evaluate(display.textContent);
    })

    clearButton.addEventListener("mousedown", () => {
        display.textContent = "";
    })

    backButton.addEventListener("mousedown", () => {
        display.textContent = display.textContent.slice(0, -1);
    })
}

generateCalculator();
