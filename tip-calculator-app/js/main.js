const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(
        `Double check your '${selector}' selector and make sure it's typed correctly`
    );
};

const tips = document.querySelectorAll(".tip__btn");

selectElement("#bill-input").addEventListener("input", billInputFun);
selectElement(".tip__people-input").addEventListener("input", peopleInputFun);


tips.forEach(function (val) {
    val.addEventListener("click", handleClick);
});

selectElement(".result__btn").addEventListener("click", reset);
selectElement(".tip__custom").addEventListener("click", tipInputFun);

selectElement("#bill-input").value = "0.0";
selectElement(".tip__people-input").value = "1";
selectElement("#tip-amount").innerHTML = "$" + (0.0).toFixed(2); // Tip per person
selectElement("#total-amount").innerHTML = "$" + (0.0).toFixed(2); // Total per person

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billInputFun() {
    billValue = parseFloat(selectElement("#bill-input").value);
    calculateTip();
}

function tipInputFun() {
    tipValue = parseFloat(selectElement(".tip__custom").value / 100);

    selectElement("tip__btn").forEach(function (val) {
        val.classList.remove("tip__btn--active");
    });
    calculateTip();
}

function peopleInputFun() {
    peopleValue = parseFloat(selectElement(".tip__people-input").value);

    if (peopleValue < 1) {
        selectElement(".error").style.display = "flex";
        selectElement(".error").style.visibility = "inherit";
        selectElement(".tip__people-input").style.border = "thick solid red";
    } else {
        selectElement(".error").style.display = "none";
        selectElement(".tip__people-input").style.border = "none";
        calculateTip();
    }
}

function handleClick(event) {
    tips.forEach(function (val) {
        val.classList.remove("tip__btn--active");
        if (event.target.innerHTML == val.innerHTML) {
            val.classList.add("tip__btn--active");
            tipValue = parseFloat(val.innerHTML) / 100;
        }
    });
    calculateTip();
}

function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue + tipAmount) / peopleValue;
        selectElement("#tip-amount").innerHTML = "$" + tipAmount.toFixed(2);
        selectElement("#total-amount").innerHTML = "$" + total.toFixed(2);
    }
}

function reset() {
    selectElement("#bill-input").value = "0.0";
    billInputFun();
    selectElement(".tip__people-input").value = "1";
    peopleInputFun();
    selectElement(".tip__custom").value = "";
}
