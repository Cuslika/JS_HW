/**
 * Load a user from the database using the :userid param
 * The result is saved to res.locals.user
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return async function (req, res, next) {
        const orderModel = requireOption(objectrepository, 'orderModel');
        res.locals.orderid = req.params.orderid;

        const order = await orderModel.findOne({
            _id: req.params.orderid
        });
        res.locals.order = order;
        return next();
    };
};