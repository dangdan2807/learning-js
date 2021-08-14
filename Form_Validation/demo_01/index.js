// object `Validator`
function Validator(options) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

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
            switch (inputElement.type) {
                case "radio":
                case "checkbox":
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ":checked"));
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
                    break;
            }
            if (errorMessage) break;
        }

        if (errorMessage !== undefined) {
            errorElement.innerText = errorMessage;
            inputElement.closest(options.formGroupSelector).classList.add("invalid");
        } else {
            userInput(inputElement, errorElement);
        }

        return !errorMessage;
    }

    // get form element to validate
    var formElement = $(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var errorElement = inputElement.closest(options.formGroupSelector).querySelector(options.errorSelector);
                var isValid = validate(inputElement, errorElement, rule);

                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof options.onSubmit === "function") {
                    var enableInputs = formElement.querySelectorAll("[name]:not([disabled])");
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        switch (input.type) {
                            case "checkbox":
                                if (!input.matches(":checked")) {
                                    values[input.name] = [];
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case "radio":
                                if (input.matches(":checked")) {
                                    values[input.name] = input.value;
                                }
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                                break;
                        }
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                }
            }
        };

        options.rules.forEach(function (rule) {
            // submit form

            // save rules
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement) {
                var errorElement = inputElement.closest(options.formGroupSelector).querySelector(options.errorSelector);
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
        });
    }
}

Validator.isRequired = function (selector, lastMessage = "value input", firstMessage = "enter") {
    return {
        selector: selector,
        test: function (value) {
            if (value === "string") {
                return value.trim() ? undefined : `You must ${firstMessage} ${lastMessage}`;
            }
            return value ? undefined : `You must ${firstMessage} ${lastMessage}`;
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

const $ = document.querySelector.bind(document);

Validator({
    form: "#form-1",
    errorSelector: ".form-message",
    formGroupSelector: ".form-group",
    rules: [
        Validator.isRequired("#email", "your email"),
        Validator.isEmail("#email"),
        Validator.isRequired("#fullName", "your full name"),
        Validator.isRequired("input[name='gender']", "your gender"),
        Validator.isRequired("#province", "your province", 'choose'),
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
        Validator.isRequired("#avatar", "your avatar", "upload"),
    ],
    onSubmit: function (data) {
        console.log(data);
    },
});