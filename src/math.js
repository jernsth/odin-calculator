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
            return NaN;
    }
}

function extractNumber(expr) {
    let extract = "";
    let i = 0;

    if (expr[i] === '-' || expr[i] === '+') {
        extract += expr[i];
        i++
    } else if (expr[i] === '*'  || expr[i] === '/' ) {
        alert("invalid expression")
        return { number: NaN, rest: " " }
    }

    // Zahl extrahieren (auch Dezimalzahlen)
    while (i < expr.length && /[0-9.]/.test(expr[i])) {
        extract += expr[i];
        i++;
    }

    const restExpr = expr.slice(i);
    return { number: Number(extract), rest: restExpr };
}

function evaluate(expression) {
    expression = expression.replace(/\s+/g, ''); // Leerzeichen entfernen

    // Basisfall: nur eine Zahl übrig
    if (!isNaN(expression)) return Number(expression);

    // 1. Erste Zahl extrahieren
    let extract = extractNumber(expression);
    let num1 = extract.number;
    expression = extract.rest;

    // 2. Operator extrahieren
    let operator = expression[0];
    expression = expression.slice(1);

    // 3. Zweite Zahl extrahieren
    let extract2 = extractNumber(expression);
    let num2 = extract2.number;
    expression = extract2.rest;

    // 4. Operation ausführen
    let result = operate(num1, num2, operator);

    // 5. Falls noch etwas übrig ist, rekursiv weitermachen
    if (expression.length > 0 && "+-*/".includes(expression[0])) {
        return evaluate(String(result) + expression);
    } else {
        return result;
    }
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
console.log(evaluate("12+34*5"));
