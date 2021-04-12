
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username must be between 3-40 characters'],
        minLength: 3,
        maxLength: 40 ,
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        minLength: 5,
        maxLength: 100,
    },
    password: {
        type: String,
        required: [true, 'password must be at least 8 characters'],
        minLength: 8,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});


// if  the Item model aready exist, export that
// if it doesn't,  create Item model with ItemSchema definition
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);