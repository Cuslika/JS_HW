/**
 * Sends a password to the users email address
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log("Sending new password.");
        next();
    };
};