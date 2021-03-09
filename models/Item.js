
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Please add an item name'],
        maxlength: [40, 'Item name cannot be more than 40 characters']
    },
    itemQuantity: {
        type: Number,
        required: true,
        maxlength: [10, 'Limit quantity to 10 characters']
    }
});


// if  the Item model aready exist, export that
// if it doesn't,  create Item model with ItemSchema definition
module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema);