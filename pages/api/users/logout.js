import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();
// --------------------------------------------------------------

export default async (req, res) => {

    try {
        const { id, email } = req.body;

        console.log(`logout 12- id: ${id}`);

        await User.findOneAndUpdate(
            { _id: id },
            { token: '' },
            (err, doc) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({
                    success: true
                });
            }
        )
    } catch {
        if (err) throw err;
    }

}