const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const Schema = moongose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: "Add a name"
    },
    password: {
        type: String,
        required: "Add a password",
        trim: true
    },
    role : {
        type: String,
        enum : ["admin","seller","client"],
        default: "client"
    }

});

module.exports = mongoose.model('Users', usersSchema);