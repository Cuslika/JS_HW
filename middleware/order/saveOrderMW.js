/**
 * Using POST params updates or saves an order to the database
 * If res.locals.order is there, it's an update otherwise this middleware creates an entity
 * Redirects to /befott/:orderid after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
const orderModel = requireOption(objectrepository, "orderModel");

    return async function (req, res, next) {
        if(typeof req.body.CPU === "undefined") {
            return next();
        }
        if(typeof req.body.VGA === "undefined") {
            return next();
        }
        if(typeof req.body.RAM === "undefined") {
            return next();
        }
        if(typeof req.body.PSU === "undefined") {
            return next();
        }
        console.log(req.session.uid);
        const norder = new orderModel({
            CPU: req.body.CPU,
            VGA: req.body.VGA,
            RAM: req.body.RAM,
            PSU: req.body.PSU,
            _placed: req.session.uid
        });
        await norder.save();
        res.redirect("/orders");        
    };
};