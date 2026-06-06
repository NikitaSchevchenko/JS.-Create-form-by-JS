"use strict";

const body = document.querySelector("body");
const modal = document.createElement("div");
modal.className = "modal";
body.appendChild(modal);

const modalTitle = document.createElement("h1");
const modalSubTitle = document.createElement("p");
modalTitle.textContent = "CREATE AN ACCOUNT";
modalSubTitle.className = "subtitle";
modalSubTitle.textContent =
    "We always keep your name and email address private.";

modal.append(modalTitle, modalSubTitle);

const form = document.createElement("form");
form.className = "form";
modal.appendChild(form);

const inputTextWrapper = document.createElement("div");
inputTextWrapper.classList.add("input-text-wrapper");
form.appendChild(inputTextWrapper);

function createInputTextWrapperRow(
    inputTextWrapper,
    { type: typeFirstEl, placeholder: placeholderFirstEl },
    { type: typeSecondEl, placeholder: placeholderSecondEl }
) {
    const inputTextWrapperRow = document.createElement("div");
    inputTextWrapperRow.className = "row";
    inputTextWrapper.appendChild(inputTextWrapperRow);

    createInput(inputTextWrapperRow, {
        type: typeFirstEl,
        placeholder: placeholderFirstEl,
    });
    createInput(inputTextWrapperRow, {
        type: typeSecondEl,
        placeholder: placeholderSecondEl,
    });
}

function createInput(inputTextWrapperRow, { type, placeholder }) {
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";
    inputTextWrapperRow.appendChild(inputWrapper);

    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("placeholder", placeholder);
    inputWrapper.appendChild(input);
}

createInputTextWrapperRow(
    inputTextWrapper,
    { type: "text", placeholder: "First name" },
    { type: "text", placeholder: "Last name" }
);
createInputTextWrapperRow(
    inputTextWrapper,
    { type: "text", placeholder: "Display Name" },
    { type: "email", placeholder: "Email Address" }
);
createInputTextWrapperRow(
    inputTextWrapper,
    { type: "password", placeholder: "Password" },
    { type: "password", placeholder: "Password Confirmation" }
);

const inputRadioWrapper = document.createElement("div");
inputRadioWrapper.className = "input-radio-wrapper";
form.appendChild(inputRadioWrapper);

function createInputRadioWrapperOption(
    inputRadioWrapper,
    { radioButtonId, radioButtonValue, labelPartOne, labelPartTwo }
) {
    const option = document.createElement("div");
    option.className = "option";
    inputRadioWrapper.appendChild(option);

    const radioButton = document.createElement("input");
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("id", radioButtonId);
    radioButton.setAttribute("name", "role");
    radioButton.setAttribute("value", radioButtonValue);

    const label = document.createElement("label");
    label.setAttribute("for", radioButtonId);

    const labelContent = document.createElement("span");
    label.appendChild(labelContent);

    const labelContentPartOne = document.createElement("b");
    labelContentPartOne.textContent = labelPartOne;
    const labelContentPartTwo = document.createElement("small");
    labelContentPartTwo.textContent = labelPartTwo;

    labelContent.append(
        labelContentPartOne,
        document.createElement("br"),
        labelContentPartTwo
    );
    option.append(radioButton, label);
}

createInputRadioWrapperOption(inputRadioWrapper, {
    radioButtonId: "buyer",
    radioButtonValue: "Buyer",
    labelPartOne: "Join As a Buyer",
    labelPartTwo:
        "I am looking for a Name, Logo or Tagline for my business,brand or product",
});
createInputRadioWrapperOption(inputRadioWrapper, {
    radioButtonId: "seller",
    radioButtonValue: "Seller",
    labelPartOne: "Join As a Creative or Marketplace Seller",
    labelPartTwo:
        "I plan to submit name ideas, Logo designs or sell names in Domain Marketplace",
});

const checkBoxWrapper = document.createElement("div");

const checkBox = document.createElement("input");
checkBox.setAttribute("type", "checkbox");
checkBox.setAttribute("id", "squadhelp");
checkBox.setAttribute("name", "squadhelp");

const checkBoxLabel = document.createElement("label");
checkBoxLabel.setAttribute("for", "squadhelp");
checkBoxLabel.textContent =
    "Allow Squadhelp to send marketing/promotional offers from time to time";

checkBoxWrapper.append(checkBox, checkBoxLabel);
form.appendChild(checkBoxWrapper);

const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.textContent = "Create account";
form.appendChild(submitButton);

function checkRoleNotEmpty() {
    const role = document.querySelector('input[name="role"]:checked');
    let roleErrorMessage = document.querySelector("p.role-error");

    if (!role) {
        if (!roleErrorMessage) {
            roleErrorMessage = document.createElement("p");
            roleErrorMessage.className = "role-error";
            roleErrorMessage.textContent =
                "Please choose who you will be join as!";
            roleErrorMessage.style.color = "red";
            roleErrorMessage.style.fontWeight = 700;
            modal.appendChild(roleErrorMessage);
        }
        return false;
    } else {
        if (roleErrorMessage) {
            modal.removeChild(roleErrorMessage);
        }
    }
    return true;
}

function checkInputsNotEmpty() {
    if (!checkRoleNotEmpty()) {
        return false;
    }
    let emptyDataErrorMessage = document.querySelector("p.emptydata-error");
    const inputsValues = Array.from(
        document.querySelectorAll(".input-text-wrapper > .row > input")
    ).map((el) => el.value);
    const hasEmptyInputs = inputsValues.some(
        (value) => !value || value.trim() === ""
    );
    if (hasEmptyInputs) {
        if (!emptyDataErrorMessage) {
            emptyDataErrorMessage = document.createElement("p");
            emptyDataErrorMessage.className = "emptydata-error";
            emptyDataErrorMessage.textContent = "Please fill all data";
            emptyDataErrorMessage.style.color = "red";
            emptyDataErrorMessage.style.fontWeight = 700;
            emptyDataErrorMessage.style.margin = 5;
            modal.appendChild(emptyDataErrorMessage);
        }
        return false;
    }

    if (emptyDataErrorMessage) {
        modal.removeChild(emptyDataErrorMessage);
    }
    return true;
}

class Person {
    constructor(data) {
        Object.assign(this, data);
    }
}

function collectProps(event) {
    event.preventDefault();
    if (!checkInputsNotEmpty()) {
        return;
    }
    const user = {};
    const inputs = document.querySelectorAll(
        ".input-text-wrapper > .row > input:not([type = 'password'])"
    );
    inputs.forEach((el) => {
        let inputName = el.getAttribute("placeholder");
        const words = inputName.split(" ");
        //Тут делаем преобразования строки в формат сamelCase:допустим когда у нас был Last name, оно превратиться в lastName
        inputName =
            words[0].toLowerCase() +
            words
                .slice(1)
                .map(
                    (word) =>
                        word[0].toUpperCase() + word.slice(1).toLowerCase()
                );
        user[inputName] = el.value;
    });
    const person = new Person(user);
    localStorage.setItem(person.lastName, JSON.stringify(person));
}

submitButton.addEventListener("click", collectProps);

function checkEmail(event) {
    const inputText = event.target.value;
    const inputContainer = event.target.parentNode;
    let invalidEmailMessage = document.querySelector("#invalidemail-error");
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        inputText
    );

    if (!isValid) {
        if (!invalidEmailMessage) {
            invalidEmailMessage = document.createElement("div");
            invalidEmailMessage.className = "invaliddata-error";
            invalidEmailMessage.id = "invalidemail-error";
            invalidEmailMessage.textContent =
                "Please enter a valid email (e.g. user@example.com)!";
            inputContainer.appendChild(invalidEmailMessage);
            event.target.classList.add("invalid-data");
        }
        return;
    }

    if (invalidEmailMessage) {
        inputContainer.removeChild(invalidEmailMessage);
        event.target.classList.remove("invalid-data");
    }
}

const emailInput = document.querySelector(
    ".input-text-wrapper > .row:nth-child(2) input[type='email']"
);
emailInput.addEventListener("change", checkEmail);

function checkPassword(event) {
    const inputText = event.target.value;
    let invalidPasswordMessage = document.querySelector(
        "#invalidpassword-error"
    );
    const inputContainer = event.target.parentNode;
    const isValid =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{8,}$/.test(
            inputText
        );
    checkPasswordCoincidence();
    
    if (!isValid) {
        if (!invalidPasswordMessage) {
            invalidPasswordMessage = document.createElement("div");
            invalidPasswordMessage.className = "invaliddata-error";
            invalidPasswordMessage.id = "invalidpassword-error";
            invalidPasswordMessage.textContent =
                "Password must be min 8 symbols long and contain at least 1 capital english letter, 1 number and one special symbol";
            inputContainer.appendChild(invalidPasswordMessage);
            event.target.classList.add("invalid-data");
        }
        return;
    }

    if (invalidPasswordMessage) {
        inputContainer.removeChild(invalidPasswordMessage);
        event.target.classList.remove("invalid-data");
    }
}

function checkPasswordCoincidence() {
    const confirmationPasswordInput = document.querySelector(
        ".input-text-wrapper > .row:nth-child(3) > .input-wrapper:nth-child(2) > input"
    );
    const passwordConfirmationText = confirmationPasswordInput.value;
    const passwordText = document.querySelector(
        ".input-text-wrapper > .row:nth-child(3) > .input-wrapper:first-child > input"
    ).value;
    let passwordMismatchMessage = document.querySelector(
        "#mismatchpassword-error"
    );
    const inputContainer = confirmationPasswordInput.parentNode;
    const doPasswordsMatch = passwordText === passwordConfirmationText;

    if (!doPasswordsMatch) {
        if (!passwordMismatchMessage) {
            passwordMismatchMessage = document.createElement("div");
            passwordMismatchMessage.className = "invaliddata-error";
            passwordMismatchMessage.id = "mismatchpassword-error";
            passwordMismatchMessage.textContent = "Passwords must match";
            inputContainer.appendChild(passwordMismatchMessage);
            confirmationPasswordInput.classList.add("invalid-data");
        }
        return;
    }

    if (passwordMismatchMessage) {
        inputContainer.removeChild(passwordMismatchMessage);
        confirmationPasswordInput.classList.remove("invalid-data");
    }
}

const passwordInput = document.querySelector(
    ".input-text-wrapper > .row:nth-child(3) > .input-wrapper:first-child > input"
);
const confirmationPasswordInput = document.querySelector(
    ".input-text-wrapper > .row:nth-child(3) > .input-wrapper:nth-child(2) > input"
);
passwordInput.addEventListener("change", checkPassword);
confirmationPasswordInput.addEventListener("change", checkPasswordCoincidence);
