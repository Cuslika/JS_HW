const authMW = require('../middleware/auth/authMW');
const checkUserLoginMW = require('../middleware/auth/checkUserLoginMW');
const logoutMW = require('../middleware/auth/logoutMW');
const sendPwMW = require('../middleware/auth/sendPwMW');

const renderMW = require('../middleware/renderMW');

const delOrderMW = require('../middleware/order/delOrderMW');
const getOrdersMW = require('../middleware/order/getOrdersMW');
const saveOrderMW = require('../middleware/order/saveOrderMW');

const delUserMW = require('../middleware/user/delUserMW');
const getUserMW = require('../middleware/user/getUserMW');
const getUserByEmailMW = require('../middleware/user/getUserByEmailMW');
const saveUserMW = require('../middleware/user/saveUserMW');

const orderModel = require('../models/order');
const userModel = require('../models/user');

module.exports = function(app) {
    const objRepo = {
        orderModel: orderModel,
        userModel: userModel
    };
    
    app.use('/user/:userid',
        authMW(objRepo),
        getUserMW(objRepo),
        renderMW(objRepo, 'mainpage_lin'));
    
    app.use('/orders/new',
        saveOrderMW(objRepo),
        renderMW(objRepo, "neworders"));

    app.use('/orders', 
        //getOrdersMW(objRepo),
        renderMW(objRepo, 'orders'));

        //authorization
    app.get('/logout',
        logoutMW(objRepo));

    app.use('/login',
        checkUserLoginMW(objRepo),
        //sendPwMW(objRepo),
        renderMW(objRepo, 'login'));

    app.use('/forgottenpw',
        authMW(objRepo),
        getUserByEmailMW(objRepo),
        sendPwMW(objRepo),
        renderMW('forgottenpw'));

    app.use('/signin',
        saveUserMW(objRepo),
        renderMW(objRepo, 'signin'));


    app.get('/',
        renderMW(objRepo, 'index'));
};