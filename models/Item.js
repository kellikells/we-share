
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Item name cannot be more than 40 characters'],
        maxLength: 40,
    },
    itemQuantity: {
        type: Number,
        required: [true, 'quantity must be greater than 0'],
        min: 1, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


// if  the Item model aready exist, export that
// if it doesn't,  create Item model with ItemSchema definition
module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema);