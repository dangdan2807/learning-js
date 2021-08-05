import logger from "./logger.js";
import logger2 from "./logger/logger2.js";
import * as constants from "./constants.js";
import { logger3 } from "./logger/index3.js"

logger("test messages", constants.TYPE_WARN);
logger2("test messages 2", constants.TYPE_ERROR);
logger3("test messages 3");
