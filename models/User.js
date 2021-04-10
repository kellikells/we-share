
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an item name'],
        maxlength: [40, 'Item name cannot be more than 40 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        maxlength: [125, 'Email cannot be longer than 125 characters'],
    },
    password: {
        type: String,
        required: true,
        maxlength: [40, 'Limit password to 40 characters']
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// if  the Item model aready exist, export that
// if it doesn't,  create Item model with ItemSchema definition
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);