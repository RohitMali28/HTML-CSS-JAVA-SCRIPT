function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    let display = document.getElementById("display");
    display.value += value;
}

function calculate() {
    let display = document.getElementById("display");
    let expression = display.value;

    // Replace ^ with ** for exponentiation
    expression = expression.replace(/\^/g, "**");

    // Replace sqrt( with Math.sqrt(
    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");

    try {
        display.value = eval(expression);
    } catch (error) {
        display.value = "Error";
    }
}