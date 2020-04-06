const authMW = require('../middleware/auth/authMW');
const checkUserLoginMW = require('../middleware/auth/checkUserLoginMW');
const sendPwMW = require('../middleware/auth/sendPwMW');
const renderMW = require('../middleware/renderMW');
const delOrderMW = require('../middleware/order/delOrderMW');
const getOrderMW = require('../middleware/order/getOrderMW');
const getOrdersMW = require('../middleware/order/getOrdersMW');
const saveOrderMW = require('../middleware/order/saveOrderMW');
const delUserMW = require('../middleware/user/delUserMW');
const getUserMW = require('../middleware/user/getUserMW');
const getUserByEmailMW = require('../middleware/user/getUserByEmailMW');
const saveUserMW = require('../middleware/user/saveUserMW');

module.exports = function(app) {
    const objRepo = {};
    
    app.use('/user/new',
    authMW(objRepo),
    saveUserMW(objRepo),
    renderMW(objRepo, 'signin'));
    app.use('/user/edit/:userid',
    authMW(objRepo),
    getUserMW(objRepo),
    saveUserMW(objRepo),
    renderMW(objRepo, 'edituser'));
    app.get('/user/del/:userid',
    authMW(objRepo),
    getUserMW(objRepo),
    delUserMW(objRepo));
    app.get('/user',
    authMW(objRepo),
    getUserMW(objRepo),
    getUserByEmailMW(objRepo),
    renderMW(objRepo, 'login'));
    
    app.use('/order/userid/new',
    authMW(objRepo),
    getUserMW(objRepo),
    saveOrderMW(objRepo),
    renderMW(objRepo, 'neworders'));
    app.use('/order/:userid/edit/:orderid',
    authMW(objRepo),
    getUserMW(objRepo),
    getOrderMW(objRepo),
    saveOrderMW(objRepo),
    renderMW(objRepo, 'editorder'));
    app.get('/order/:userid/del/:orderid',
    authMW(objRepo),
    getUserMW(objRepo),
    getOrderMW(objRepo),
    delOrderMW(objRepo));
    app.get('/order/:userid',
    authMW(objRepo),
    getUserMW(objRepo),
    getOrderMW(objRepo),
    getOrdersMW(objRepo),
    renderMW(objRepo, 'orders'));

    app.use('/',
    checkUserLoginMW(objRepo),
    sendPwMW(objRepo),
    renderMW(objRepo, 'index'));
};