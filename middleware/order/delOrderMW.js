/**
 * Removes an order from the database, the entity used here is: res.locals.order
 * Redirects to /befott/:orderid after delete
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return async function (req, res, next) {
        const orderModel = requireOption(objectrepository, "orderModel");
        await orderModel.deleteOne({_id: req.params.orderid});
        res.redirect("/orders");
    };
};