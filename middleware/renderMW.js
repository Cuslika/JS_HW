/**
 * Using the template engine render the values into the template
 */

const requireOption = require('./requireOption');

module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        if(req.session.loggedin === 'undefined' || req.session.loggedin === false) {
            res.locals.loggedin = false;
        }
        else {
            res.locals.loggedin = req.session.loggedin;
            res.locals.linuser = req.session.linuser;
        }
        res.render(viewName);
        console.log('render: ' + viewName);
    };

};