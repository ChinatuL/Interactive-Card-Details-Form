const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputNumber = document.getElementById("card-number");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const inputCvc = document.getElementById("cvc");

const isRequired = (value) => {
    if (value.trim() === "") {
        return false;
    } else {
        return true;
    }
};

const showError = (input, errorMessage) => {
    input.classList.add("error");
    input.setAttribute("aria-invalid", true);
    const error = input.parentElement.querySelector("p");
    error.textContent = errorMessage;
    error.style.display = "block";
};

const showSuccess = (input) => {
    input.classList.remove("error");
    input.setAttribute("aria-invalid", false);
    const error = input.parentElement.querySelector("p");
    error.textContent = "";
    error.style.display = "none";
};

const validateName = () => {
    const nameValue = inputName.value;
    if (!isRequired(nameValue)) {
        showError(inputName, "Can't be blank");
        return false;
    } else {
        showSuccess(inputName);
        return true;
    }
};

const validateNumber = () => {
    const numberValue = inputNumber.value;
    if (!isRequired(numberValue)) {
        showError(inputNumber, "Can't be blank");
        return false;
    } else {
        showSuccess(inputNumber);
        console.log(numberValue.replace(/(\d{4})/g, "$1 "));
        return true;
    }
};

const validateDate = () => {
    const monthValue = inputMonth.value;
    const yearValue = inputYear.value;
    const currentYear = new Date().getFullYear().toString().slice(2, 4);
    const currentMonth = new Date().getMonth() + 1;
    if (!isRequired(monthValue) || !isRequired(yearValue)) {
        showError(inputMonth, "Can't be blank");
        return false;
    } else if (monthValue < 1 || monthValue > 12) {
        showError(inputMonth, "Invalid month");
        return false;
    } else if (yearValue < currentYear) {
        showError(inputYear, "Card Expired");
        return false;
    } else if (yearValue === currentYear && monthValue <= currentMonth) {
        showError(inputMonth, "Card Expired");
        return false;
    } else {
        showSuccess(inputMonth);
        showSuccess(inputYear);
        return true;
    }
};

const validateCvc = () => {
    const cvcValue = inputCvc.value;
    if (!isRequired(cvcValue)) {
        showError(inputCvc, "Can't be blank");
        return false;
    } else if (cvcValue == 000) {
        showError(inputCvc, "Invalid CVC");
        return false;
    } else {
        showSuccess(inputCvc);
        return true;
    }
};

form.addEventListener("submit", (e) => {
    const isNameValid = validateName();
    const isNumberValid = validateNumber();
    const isDateValid = validateDate();
    const isCvcValid = validateCvc();
    if (isNameValid && isNumberValid && isDateValid && isCvcValid) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
});

inputNumber.addEventListener("keyup", () => {
    const cardNumber = document.querySelector(".card__number");
    cardNumber.textContent = inputNumber.value
        .trim()
        .replace(/(\d{4})/g, "$1 ");
});

inputName.addEventListener("keyup", () => {
    const cardName = document.querySelector(".card__name");
    cardName.textContent = inputName.value;
});

inputMonth.addEventListener("keyup", () => {
    const cardMonth = document.querySelector(".card__exp-month");
    cardMonth.textContent = inputMonth.value;
});

inputYear.addEventListener("keyup", () => {
    const cardYear = document.querySelector(".card__exp-year");
    cardYear.textContent = inputYear.value;
});

inputCvc.addEventListener("keyup", () => {
    const cardCvc = document.querySelector(".card__cvc");
    cardCvc.textContent = inputCvc.value;
});
