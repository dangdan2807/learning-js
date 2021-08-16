function Validator(formSelector) {
    var _this = this;
    var formRules = {};

    /**
     * Quy ước tạo rule
     * - Nếu có lỗi thì return `error message`
     * - Nếu có không lỗi thì return `undefined`
     */
    var validatorRules = {
        required: function (value) {
            return value ? undefined : `You must enter value input`;
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value.trim()) ? undefined : `Invalid email`;
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Value input is greater than or equal to ${min} characters`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length <= max ? undefined : `Value input is less than or equal to ${max} characters`;
            };
        },
    };
    var formElement = document.querySelector(formSelector);

    // Xử lý element trong DOM
    if (formElement) {
        var inputs = formElement.querySelectorAll("[name][rules]");
        for (var input of inputs) {
            var rules = input.getAttribute("rules").split("|");
            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(":");

                if (isRuleHasValue) {
                    ruleInfo = rule.split(":");
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }
            // Listen event
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            for (var rule of rules) {
                errorMessage = rule(event.target.value);
                if (errorMessage) break;
            }

            if (errorMessage) {
                var formGroup = event.target.closest(".form-group");
                if (formGroup) {
                    formGroup.classList.add("invalid");
                    var formMessage = formGroup.querySelector(".form-message");
                    if (formMessage) {
                        formMessage.innerHTML = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }

        // hàm clear message lỗi
        function handleClearError(event) {
            var formGroup = event.target.closest(".form-group");
            if (formGroup.classList.contains("invalid")) {
                formGroup.classList.remove("invalid");
                var formMessage = formGroup.querySelector(".form-message");
                if (formMessage) {
                    formMessage.innerHTML = "";
                }
            }
        }

        formElement.onsubmit = function (event) {
            event.preventDefault();
            var inputs = formElement.querySelectorAll("[name][rules]");
            var isValid = inputs;
            for (var input of inputs) {
                if (!handleValidate({ target: input })) {
                    isValid = false;
                }
            }
            if (isValid) {
                if (typeof _this.onSubmit === "function") {
                    var enableInputs = formElement.querySelectorAll("[name]:not([disabled])");
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
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
                            case "file":
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                                break;
                        }
                        return values;
                    }, {});
                    // gọi lại hàm onsubmit và trả về giá trị
                    return _this.onSubmit(formValues);
                } else {
                    formElement.submit();
                }
            }
        };
    }
}
