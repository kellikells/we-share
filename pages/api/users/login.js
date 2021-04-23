import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

dbConnect();

// --------------------------------------------------------------


export default async (req, res) => {
    const { method } = req;

    switch (method) {

 
        // ---------------USER LOGIN------------------ 

        case 'PUT':
            try {
                const { email, password } = req.body;
                const user = await User.findOne({ email: email });

                console.log(`api/users/index line 104:  ${user}`);

                // no matching email found in db
                if (!user) {

                    console.log(`index line 89 : no matching email`);
                    return res.status(404).json({
                        success: false,
                        error: 'User does not exist'
                    });
                }

                // checking password 
                const isMatch = await bcrypt.compare(password, user.password);

                // var userToken;

                if (isMatch) {

                    // JWT Payload 
                    const payload = {
                        id: user._id,
                        email: user.email,
                        createdAt: user.createdAt,
                    };

                    const newToken = await jwt.sign(
                        payload,
                        jwtSecret,
                        {
                            expiresIn: 3600,
                        },
                        (err, token) => {
                            if (err) throw err;

                            res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token,
                            });
                        },
                    );
                }
                // if (!isMatch) {
                else {
                    return res.status(400).json({
                        success: false,
                        error: 'Incorrect Password!'
                    });
                }

            } catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Server Error"
                });
            }

            break;

        // -------------------------- 

        default:
            res.status(400).json({
                success: false
            });
            break;
    }
}



