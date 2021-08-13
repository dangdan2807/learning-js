const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// object `Validator`
function Validator(options) {
    var selectorRules = {};

    // user input
    function userInput(inputElement, errorElement) {
        errorElement.innerText = "";
        inputElement.parentElement.classList.remove("invalid");
    }

    // validate function
    function validate(inputElement, errorElement, rule) {
        var rules = selectorRules[rule.selector];
        var errorMessage;

        // get rule & check
        // if have error => break
        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

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
        formElement.onsubmit = function (e) {
            e.preventDefault();
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                validate(inputElement, errorElement, rule);
            });
        };

        options.rules.forEach(function (rule) {
            // submit form

            // save rules
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

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

Validator.isRequired = function (selector, message = "value input") {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : `You must enter ${message}`;
        },
    };
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value.trim()) ? undefined : "Invalid email";
        },
    };
};

Validator.minLength = function (selector, min, message = "Value input") {
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
        Validator.isRequired("#fullName", "your full name"),
        Validator.isRequired("#email", "your email"),
        Validator.isEmail("#email"),
        Validator.isRequired("#password", "password"),
        Validator.minLength("#password", 6, "Password"),
        Validator.isRequired("#password_confirmation", "password"),
        Validator.isConfirmed(
            "#password_confirmation",
            function () {
                return $("#form-1 #password").value;
            },
            "Re-entered password is incorrect"
        ),
    ],
});
