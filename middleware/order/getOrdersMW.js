/**
 * Load an order from the database using the :orderid param
 * The result is saved to res.locals.order
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const orderModel = requireOption(objectrepository, 'orderModel');
    const userModel = requireOption(objectrepository, 'userModel');
    return async function (req, res, next) {
        const orders = await orderModel.find({});
        const norders = await Promise.all(orders.map(async function(o) {
            const user = await userModel.findOne({
                _id: o._placed
            });
            return {
                ...o._doc,name: user.name
            }
        }));
        res.locals.orders = norders;
        return next();
    };
};