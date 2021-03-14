
import dbConnect from '../../../utils/dbConnect';
import Item from '../../../models/Item';


dbConnect();

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
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


// export default async (req, res) => {
//     const { method } = req;

//     switch (method) {
//         case 'GET':
//             try {
//                 const items = await Item.find({});

//                 res.status(200).json({ success: true, data: items })
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         case 'POST':
//             try {
//                 const item = await Item.create(req.body);

//                 res.status(201).json({ success: true, data: item })
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;
        
//         case 'DELETE':
//             try {
//                 const deletedItem = await Item.deleteOne({ _id: id });

//                 if (!deletedItem) {
//                     return res.status(400).json({ success: false })
//                 }

//                 res.status(200).json({ success: true, data: {} });
//             } catch (error) {
//                 res.status(400).json({ success: false })
//             }
//             break;
//         default:
//             res.status(400).json({ success: false });
//             break;
//     }
// }