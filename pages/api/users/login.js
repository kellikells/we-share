import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



const jwtSecret = process.env.JWT_SECRET;

dbConnect();

// --------------------------------------------------------------



export default async (req, res) => {
    // const [cookie, setCookie] = useCookies(['user']);

    const { method } = req;

    switch (method) {


        // ---------------USER LOGIN------------------ 

        case 'PUT':
            try {
                const { email, password } = req.body;
                const user = await User.findOne({ email: email });

                // error: no matching email found in db
                if (!user) {

                    return res.status(404).json({
                        success: false,
                        error: 'User does not exist'
                    });
                }

                // checking password 
                const passwordCheck = await bcrypt.compare(password, user.password);

                // error: incorrect password 
                if (!passwordCheck) {
                    return res.status(400).json({
                        success: false,
                        error: 'incorrect password!'
                    });
                }

                // const createdTokenObj = await user.generateToken((err, user) => {
                //     if (err) return res.status(400).send(err);


                //     console.log(`login 59- token: ${user.token}`);

               
                //     return res.cookie('ths_auth', user.token).status(200).json({ "Login Success": "True" });
       
                // })

                // JWT Payload 
                const payload = {
                    id: user._id,
                    name: user.name,
                    createdAt: user.createdAt,
                };

                const token = await jwt.sign(
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
                            user: user
                        }).setHeader('authCookie', token);
                    },
                );

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





    // -------------------------- 



