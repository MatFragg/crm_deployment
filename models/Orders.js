const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    client: {
        type: Schema.ObjectId,
        ref: 'Clients'
    },
    products: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Products'
        },
        quantity: Number
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "Delivered","Cancelled"],
    }
});

module.exports = mongoose.model('Orders', ordersSchema);