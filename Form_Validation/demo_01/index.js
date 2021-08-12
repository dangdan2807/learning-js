const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// object `Validator`
function Validator(options) {
    // user input
    function userInput(inputElement, errorElement) {
        errorElement.innerText = "";
        inputElement.parentElement.classList.remove("invalid");
    }

    // validate function
    function validate(inputElement, errorElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        if (errorMessage !== undefined) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
        } else {
            userInput(inputElement, errorElement);
        }
    }

    // get form element to validate
    var formElement = $(options.form);
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
            // handle blur from input
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, errorElement, rule);
                };
            }

            // handle user input
            inputElement.oninput = function () {
                userInput(inputElement, errorElement);
            };
        });
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Enter your full name";
        },
    };
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value.trim()) ? undefined : "You must enter your email";
        },
    };
};

Validator.minLength = function (selector, min, message = 'Value input') {
    return {
        selector: selector,
        test: function (value) {
            return value.trim().length >= min ? undefined : `${message} is greater than or equal to ${min} characters`;
        },
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() === getConfirmValue() ? undefined : message || `Invalid input value`;
        },
    };
};

Validator({
    form: "#form-1",
    errorSelector: ".form-message",
    rules: [
        Validator.isRequired("#fullName"),
        Validator.isEmail("#email"),
        Validator.minLength("#password", 6, 'Password'),
        Validator.isConfirmed("#password_confirmation", function () {
            return $('#form-1 #password').value;
        }, 'Re-entered password is incorrect'),
    ],
});
