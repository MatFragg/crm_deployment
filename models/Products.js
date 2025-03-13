const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name:{
        type: String,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    image: {
        type: String,
        trim: true
    }
});
module.exports = mongoose.model('Products', productsSchema);