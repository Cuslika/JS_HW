/**
 * Removes an order from the database, the entity used here is: res.locals.order
 * Redirects to /befott/:orderid after delete
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};