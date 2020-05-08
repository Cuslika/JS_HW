/**
 * Load a user from the database using the :useremail param
 * The result is saved to res.locals.user
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const userModel = requireOption(objectrepository, 'userModel');

    return async function (req, res, next) {

        if(typeof req.body.email === 'undefined') {
            console.log("No email adress was given!")
            return next();
        }
        else{
            const nuser = await userModel.findOne({
                email: req.body.email
            });
            res.locals.user = nuser;
            return next();
        }
    };
};