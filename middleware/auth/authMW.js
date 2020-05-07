/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(!req.session.loggedin || req.session.loggedin !== true){
            return res.redirect('/');
        }
        if (req.session.loggedin || req.session.loggedin == true) {
            return res.redirect('/:userid');
        }
        return next();
    };
};