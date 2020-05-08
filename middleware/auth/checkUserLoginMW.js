/**
 * Checks if the given informations are valid to a user account
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return async function (req, res, next) {
        const userModel = requireOption(objectrepository, "userModel");

        if(typeof req.body.password === 'undefined') {
            console.log("No password!");
            return next();
        }
        if(req.body.username === 'undefined') {
            console.log("No username!");
            return next();
        }
        if(req.body.username === "admin" && req.body.password === "admin"){
            req.session.loggedinadmin = true;
            req.session.linuser = "admin";
            req.session.save(function(error){
                res.redirect("/orders");
            });
        }
        const fuser = await userModel.findOne({
            name: req.body.username,
            password: req.body.password
        });
        if(fuser === null) {
            return next();
        }
        req.session.loggedin = true;
        req.session.linuser = req.body.username;
        req.session.uid = fuser._id;
        req.session.save(function(error){
            res.redirect("/orders");
        });
    };
};