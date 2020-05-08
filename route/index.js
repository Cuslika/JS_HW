const checkUserLoginMW = require('../middleware/auth/checkUserLoginMW');
const logoutMW = require('../middleware/auth/logoutMW');
const sendPwMW = require('../middleware/auth/sendPwMW');

const renderMW = require('../middleware/renderMW');

const delOrderMW = require('../middleware/order/delOrderMW');
const editOrderMW = require('../middleware/order/editOrderMW');
const getOrderMW = require('../middleware/order/getOrderMW');
const getOrdersMW = require('../middleware/order/getOrdersMW');
const saveOrderMW = require('../middleware/order/saveOrderMW');

const getUserByEmailMW = require('../middleware/user/getUserByEmailMW');
const saveUserMW = require('../middleware/user/saveUserMW');

const orderModel = require('../models/order');
const userModel = require('../models/user');

module.exports = function(app) {
    const objRepo = {
        orderModel: orderModel,
        userModel: userModel
    };
    
    app.use('/orders/edit/:orderid',
        getOrderMW(objRepo),
        editOrderMW(objRepo),
        renderMW(objRepo, 'editorder'));

    app.get('/orders/del/:orderid',
        delOrderMW(objRepo));
    
    app.use('/orders/new',
        saveOrderMW(objRepo),
        renderMW(objRepo, 'neworders'));

    app.use('/orders', 
        getOrdersMW(objRepo),
        renderMW(objRepo, 'orders'));

        //authorization
    app.get('/logout',
        logoutMW(objRepo));

    app.use('/login',
        checkUserLoginMW(objRepo),
        renderMW(objRepo, 'login'));

    app.use('/forgottenpw',
        getUserByEmailMW(objRepo),
        sendPwMW(objRepo),
        renderMW(objRepo, 'forgottenpw'));

    app.use('/signin',
        saveUserMW(objRepo),
        renderMW(objRepo, 'signin'));


    app.get('/',
        renderMW(objRepo, 'index'));
};