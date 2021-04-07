
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please add an item name'],
        maxlength: [40, 'Item name cannot be more than 40 characters']
    },
    userEmail: {
        type: String,
        required: [true, 'Please enter a valid email'],
        maxlength: [125, 'Email cannot be longer than 125 characters'],
    },
    hashedPassword: {
        type: String,
        required: true,
        maxlength: [40, 'Limit password to 40 characters']
    }
});


// if  the Item model aready exist, export that
// if it doesn't,  create Item model with ItemSchema definition
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);