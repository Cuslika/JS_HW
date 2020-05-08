/**
 * A kiválasztott megrendelés adatait megváltoztatja.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return async function (req, res, next) {
        const orderModel = requireOption(objectrepository, "orderModel");

        if(typeof req.body.CPU === "undefined" || typeof req.body.VGA === "undefined" || typeof req.body.VGA === "undefined" || typeof req.body.PSU === "undefined") {
            return next();
        }
        else{
            const temporder = await orderModel.findOne({
                _id: req.params.orderid
            });
    
            temporder.CPU = req.body.CPU;
            temporder.VGA = req.body.VGA;
            temporder.RAM = req.body.RAM;
            temporder.PSU = req.body.PSU;        
    
            await temporder.save();
            res.redirect("/orders");
        }
        
    };
};