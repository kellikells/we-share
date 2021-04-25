const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username must be between 3-40 characters'],
        minLength: 3,
        maxLength: 40,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    token: {
        type: String,
    }
});

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), jwtSecret);
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};


// if  the Item model aready exist, export that
// if it doesn't,  create Item model with itemSchema definition
module.exports = mongoose.models.User || mongoose.model('User', userSchema);