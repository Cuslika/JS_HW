/**
 * Load an order from the database using the :orderid param
 * The result is saved to res.locals.order
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};