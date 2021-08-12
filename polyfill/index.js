if (String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        "use strict";

        if (search instanceof RegExp) {
            throw TypeError("first argument must not be a RegExp");
        }
        if (start === undefined) {
            start = 0;
        }
        return this.indexOf(search, start) !== -1;
    };
}

const str1 = "hello";
const str2 = "hello";
const str3 = "Hello";
const str4 = "Hello0";
const varToString = (varObj) => Object.keys(varObj)[0];

const contentElement = document.querySelector(".content");
let htmls = `
    <span>str1 = "${str1}"</span> </br>
    <span>str2 = "${str2}"</span> </br>
    <span>str3 = "${str3}"</span> </br>
    <span>str4 = "${str4}"</span> </br>
    </br>
    <span>str1 includes str2 => result ${str1.includes(str2)}</span> </br>
    <span>str1 includes str3 => result ${str1.includes(str3)}</span> </br>
    <span>str1 includes str4 => result ${str1.includes(str4)}</span> </br>
`;
contentElement.innerHTML = htmls;
