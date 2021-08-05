import { TYPE_LOG } from "./constants.js";

function logger(message, type = TYPE_LOG) {
    console[type](message);
}

export default logger;
