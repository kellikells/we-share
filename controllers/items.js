
import dbConnect from '../utils/dbConnect';
import Item from '../models/Item';
dbConnect();
// desc     get all items
// route    GET /api/items
exports.getItems = async (req, res, next) => {
    try {
        const items = await Item.find({});
        return res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}


// desc     add an item
// route    POST /api/items
exports.addItem = async (req, res, next) => {
    try {
        const { itemName, itemQuantity } = req.body;

        const item = await Item.create(req.body);

        return res.status(201).json({
            success: true,
            data: item
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            // 400: client error, 
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}


// desc     delete item
// route    DELETE /api/items/:id
exports.deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'No item found'
            });
        }

        await item.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }

}