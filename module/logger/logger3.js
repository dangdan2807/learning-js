import { TYPE_LOG } from "../constants.js";

function logger3(message, type = TYPE_LOG) {
    console[type](message);
}

export default logger3;
