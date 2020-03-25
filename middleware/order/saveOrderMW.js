/**
 * Using POST params updates or saves an order to the database
 * If res.locals.order is there, it's an update otherwise this middleware creates an entity
 * Redirects to /befott/:orderid after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};