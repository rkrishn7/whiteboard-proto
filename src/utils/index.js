
/**
 * Prints a message to the console if we're in development mode
 * @param {String} message 
 */
export function debug(message) {
    if(typeof console !== "undefined" && typeof console.log === "function")
        process.env.NODE_ENV === "development" && console.log(message);
}