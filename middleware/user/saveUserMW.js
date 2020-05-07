/**
 * Using POST params update or save a user to the database
 * If res.locals.user is there, it's an update otherwise this middleware creates an entity
 * Redirects to /user after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const userModel = requireOption(objectrepository, "userModel");

    return async function (req, res, next) {
        if(typeof req.body.name === "undefined") {
            return next();
        }
        if(typeof req.body.password === "undefined") {
            return next();
        }
        const nuser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await nuser.save();
        res.redirect("/");
    };
};