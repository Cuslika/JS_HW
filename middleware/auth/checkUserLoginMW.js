/**
 * Checks if the given informations are valid to a user account
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return async function (req, res, next) {
        const userModel = requireOption(objectrepository, "userModel");

        console.log(req.body);
        if(typeof req.body.password === 'undefined') {
            console.log("No password!");
            return next();
        }
        const fuser = await userModel.findOne({
            name: req.body.username,
            password: req.body.password
        });
        console.log(fuser);
        if(fuser === null) {
            return next();
        }
        req.session.loggedin = true;
        req.session.linuser = req.body.username;
        req.session.uid = fuser._id;
        console.log(req.body.username);
        req.session.save(function(error){
            res.redirect("/orders");
        });
    };
};