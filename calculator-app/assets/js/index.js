const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(
        `Double check your '${selector}' selector and make sure it's typed correctly`
    );
};

const links = document.querySelectorAll("link");
const toggleBtn = document.querySelectorAll("input");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");
let prevOperand = selectElement("[data-previous-operand]").innerText;
let currentOperand = selectElement("[data-current-operand]").innerText;
let operation;

function themeChange(i) {
    if(i === "0"){
        links[2].setAttribute("href", "");
    } else {
        links[2].setAttribute("href", `assets/css/theme${i}.css`);
    }
}

function reset() {
    prevOperand = "";
    currentOperand = "";
    operation = undefined;
}

function deleteOperand() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function addNumber(number) {
    if(number === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function operationSelection(operate) {
    if(selectElement("[data-current-operand]") === "") return;
    if(selectElement("[data-previous-operand]") !== "") {
        calculatorOperation();
    }
    operation = operate;
    prevOperand = currentOperand;
    currentOperand = "";
}

function calculatorOperation() {
    let result;
    let prev = parseFloat(prevOperand);
    let current = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(current)) return;

    switch(operation){
        case "+":
            result = prev + current;
            break;

        case "-":
            result = prev - current
            break;

        case "×":
            result = prev * current;
            break;

        case "/":
            result = prev / current;
            break;

        default:
            return;
    }
    currentOperand = result;
    operation = undefined;
    prevOperand = "";
    selectElement("[data-previous-operand]").innerText = "";
}

function displayNum() {
    selectElement("[data-current-operand]").innerText = currentOperand.toLocaleString("en");
    if(operation !== undefined) {
        selectElement("[data-previous-operand]").innerText = `${prevOperand} ${operation.toString("en")}`;
    } else {
        selectElement("[data-previous-operand]").innerText = prevOperand;
    }
}

toggleBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        themeChange(btn.value);
    });
})

selectElement("[data-reset]").addEventListener("click", () => {
    reset();
    displayNum();
});

selectElement("[data-delete]").addEventListener("click", () => {
    deleteOperand();
    displayNum();
});

operands.forEach(operand => {
    operand.addEventListener("click", () => {
        addNumber(operand.innerText);
        displayNum();
    });
});

operatorBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        operationSelection(btn.innerText);
        displayNum();
    })
})

selectElement("[data-output]").addEventListener("click", () => {
    calculatorOperation();
    displayNum();
});