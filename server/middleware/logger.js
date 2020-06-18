
/**
 * Logs each event
 * Displays name and associated data.
 * @param {string} eventName 
 */

function logger(eventName) {
    return function(data) {
        console.log("EVENT:", eventName);
        console.log("DATA:", data);
    }
}

module.exports = logger;

