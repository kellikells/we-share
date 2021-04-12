
import dbConnect from '../../../utils/dbConnect';
import Item from '../../../models/Item';


dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const items = await Item.find({});

                res.status(200).json({
                    success: true,
                    count: items.length,
                    data: items
                })
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Server Error'
                });
            }
            break;
        
        
        case 'POST':
            try {
                const { itemName, itemQuantity } = req.body;

                const item = await Item.create(req.body);

                res.status(201).json({
                    success: true,
                    data: item
                });
            } catch (err) {
                if (err.name === 'ValidationError') {
                    const messages = Object.values(err.errors).map(val => val.message);

                    // 400: client error, 
                    res.status(400).json({
                        success: false,
                        error: messages
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        error: 'Server Error'
                    });
                }
            }
            break;
        
        
        case 'DELETE':
            try {
                const deletedItem = await Item.deleteOne({ _id: id });

                if (!deletedItem) {
                    // return res.status(404).json({ success: false })
                    return res.status(404).json({
                        success: false,
                        error: 'No item found'
                    });
                }
                // res.status(200).json({ success: true, data: {} });
                res.status(200).json({
                    success: true,
                    data: {}
                });
            } catch (error) {
                // res.status(400).json({ success: false })
                res.status(500).json({
                    success: false,
                    error: 'Server Error'
                });
            }
            break;
        
        default:
            res.status(400).json({
                success: false
            });
            break;
    }
}