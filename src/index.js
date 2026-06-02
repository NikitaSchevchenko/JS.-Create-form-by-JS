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
    { type: typeSecondEl, placeholder: placeholderSecondEl },
) {
    const inputTextWrapperRow = document.createElement("div");
    inputTextWrapperRow.className = "row";
    inputTextWrapper.appendChild(inputTextWrapperRow);

    const firstEl = document.createElement("input");
    firstEl.setAttribute("type", typeFirstEl);
    firstEl.setAttribute("placeholder", placeholderFirstEl);

    const secondEl = document.createElement("input");
    secondEl.setAttribute("type", typeSecondEl);
    secondEl.setAttribute("placeholder", placeholderSecondEl);

    inputTextWrapperRow.append(firstEl, secondEl);
}

createInputTextWrapperRow(
    inputTextWrapper,
    { type: "text", placeholder: "First name" },
    { type: "text", placeholder: "Last name" },
);
createInputTextWrapperRow(
    inputTextWrapper,
    { type: "text", placeholder: "Display Name" },
    { type: "email", placeholder: "Email Address" },
);
createInputTextWrapperRow(
    inputTextWrapper,
    { type: "password", placeholder: "Password" },
    { type: "password", placeholder: "Password Confirmation" },
);

const inputRadioWrapper = document.createElement("div");
inputRadioWrapper.className = "input-radio-wrapper";
form.appendChild(inputRadioWrapper);

function createInputRadioWrapperOption(
    inputRadioWrapper,
    { radioButtonId, radioButtonValue, labelPartOne, labelPartTwo },
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

    labelContent.append(labelContentPartOne,document.createElement("br"), labelContentPartTwo);
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
checkBoxLabel.textContent = "Allow Squadhelp to send marketing/promotional offers from time to time";

checkBoxWrapper.append(checkBox,checkBoxLabel);
form.appendChild(checkBoxWrapper);

const submitButton = document.createElement("button");
submitButton.setAttribute("type","submit");
submitButton.textContent = "Create account";
form.appendChild(submitButton);

