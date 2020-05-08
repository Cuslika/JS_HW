/**
 * A kiválasztott megrendelés adatait megváltoztatja.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return async function (req, res, next) {
        const orderModel = requireOption(objectrepository, "orderModel");

        if(typeof req.body.CPU === "undefined" || typeof req.body.VGA === "undefined" || typeof req.body.VGA === "undefined" || typeof req.body.PSU === "undefined") {
            console.log("SZAR");
            return next();
        }
    
        res.locals.order.CPU = req.body.CPU;
        res.locals.order.VGA = req.body.VGA;
        res.locals.order.RAM = req.body.RAM;
        res.locals.order.PSU = req.body.PSU;        
    
        await res.locals.order.save();
        res.redirect("/orders");
        
    };
};