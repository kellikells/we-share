// dynamic route

import dbConnect from '../../../utils/dbConnect';
import Item from '../../../models/Item';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req

    switch (method) {

        // ---------------------------------------
        case 'GET':
            try {
                const item = await Item.findBy(id);

                if (!item) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });

            }
            break;

        // ---------------------------------------
        case 'PUT':
            try {
                const item = await Item.findByIdAndUpdate(id, req.body, {

                    new: true,
                    runValidators: true
                });
                if (!item) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: none });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        // ---------------------------------------
        case 'DELETE':

            try {
                const deletedIteme = await Item.deleteOne({ _id: id });
                if (!deltedItem) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data });

            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}