// select form
const form = document.getElementById("form");

// select the complete section and reset button
const completeMessage = document.getElementById("complete");
const resetBtn = document.getElementById("complete-btn");

// select form inputs
const inputName = document.getElementById("name");
const inputNumber = document.getElementById("card-number");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const inputCvc = document.getElementById("cvc");

// select card details
const cardNumber = document.querySelector(".card__number");
const cardName = document.querySelector(".card__name");
const cardMonth = document.querySelector(".card__exp-month");
const cardYear = document.querySelector(".card__exp-year");
const cardCvc = document.querySelector(".card__cvc");

// checks if input is required
const isRequired = (value) => {
    if (value.trim() === "") {
        return false;
    } else {
        return true;
    }
};

// shows error messages
const showError = (input, errorMessage) => {
    input.classList.add("error");
    input.setAttribute("aria-invalid", true);
    const error = input.parentElement.querySelector("p");
    error.textContent = errorMessage;
    error.style.display = "block";
};

// hides error messages
const showSuccess = (input) => {
    input.classList.remove("error");
    input.setAttribute("aria-invalid", false);
    const error = input.parentElement.querySelector("p");
    error.textContent = "";
    error.style.display = "none";
};

// validates card name
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

// validates card number
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

// validates card expiry date
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

// validates card cvc
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

// submit event listener for the form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isNameValid = validateName();
    const isNumberValid = validateNumber();
    const isDateValid = validateDate();
    const isCvcValid = validateCvc();
    if (isNameValid && isNumberValid && isDateValid && isCvcValid) {
        form.style.display = "none";
        completeMessage.style.display = "flex";
    } else {
        return false;
    }
});

// updates card number
inputNumber.addEventListener("keyup", () => {
    cardNumber.textContent = inputNumber.value
        .trim()
        .replace(/(\d{4})/g, "$1 ");
});

// updates card name
inputName.addEventListener("keyup", () => {
    cardName.textContent = inputName.value;
});

// updates card month
inputMonth.addEventListener("keyup", () => {
    cardMonth.textContent = inputMonth.value;
});

// updates card year
inputYear.addEventListener("keyup", () => {
    cardYear.textContent = inputYear.value;
});

// updates card cvc
inputCvc.addEventListener("keyup", () => {
    cardCvc.textContent = inputCvc.value;
});

const resetForm = () => {
    // clears form fields
    inputName.value = "";
    inputNumber.value = "";
    inputMonth.value = "";
    inputYear.value = "";
    inputCvc.value = "";

    // resets card details to default state
    cardName.textContent = "Jane Appleseed";
    cardNumber.textContent = "0000 0000 0000 0000";
    cardMonth.textContent = "00";
    cardYear.textContent = "00";
    cardCvc.textContent = "000";
};

// event listener to reset the form and card
resetBtn.addEventListener("click", () => {
    form.style.display = "block";
    completeMessage.style.display = "none";
    resetForm();
});
