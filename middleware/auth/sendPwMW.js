/**
 * Sends a password to the users email address
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {

        if(res.locals.user === null){
            console.log("There is no user with that email adress!");
            return next();
        }
        console.log("Your password is: " + res.locals.user.password);
        res.redirect("/");
    };
};