const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Order = db.model('Order', {
    CPU: String,
    VGA: String,
    RAM: String,
    PSU: String,
    _placed: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = Order;