import dbConnect from '../../../utils/dbConnect';   // database connection
import User from '../../../models/User';            // User schema

import bcrypt from 'bcryptjs';                  // hashing and verifying password
import v4 from 'uuid';                        // create random user id
import jwt from 'jsonwebtoken';               // allows creating a secure frontend session, and verified backend
import assert from 'assert';                  // validator for the request body & required data on endpoints
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = process.env.SALT_ROUNDS;  // how many times to hash the password

dbConnect();


// --------------------------------------------------------------



export default async (req, res) => {
    const { method } = req;


    switch (method) {

        // ----------- user register --------------- 

        case 'POST':

            try {
                const { name, email, password } = req.body;
                const user = await User.findOne({ email: email });
                console.log(`user: ${user}`);
                var newUser;

                // proceed to create new user
                if (user == null) {

                    const hashedpw = await bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            req.body.password = hash;

                            newUser = User.create(req.body);

                            console.log(`newUser: ${newUser}`);
                        });
                    });

                    res.status(201).json({
                        success: true,
                        data: newUser
                    });
                }
                // client error
                else {
                    res.status(400).json({
                        success: false,
                        error: 'GET YOUR OWN EMAIL!!!!'
                    })
                }

            } catch (err) {
                if (err.name === 'ValidationError') {

                    console.log(`index error: line 81`);

                    const messages = Object.values(err.errors).map(val => val.message);

                    res.status(400).json({
                        success: false,
                        error: messages
                    });
                } else {

                    console.log(`index error line 92`);

                    res.status(500).json({
                        success: false,
                        error: `Server Error: ${err}`
                    });
                }
            }
            break;

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

                var userToken;

                if (isMatch) {

                    // JWT Payload 
                    const payload = {
                        id: user._id,
                        email: user.email,
                        createdAt: user.createdAt,
                    };
                    // const payload = {
                    //     user: {
                    //         id: user._id,
                    //         email: user.email
                    //     }
                    // };
                    const newToken = await jwt.sign(
                        payload,
                        jwtSecret,
                        {
                            expiresIn: 3600,
                        },
                        (err, token) => {
                            if (err) throw err;

                            // userToken = json({ token });
                            res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token,
                            });

                            // headers: {
                            //     "Authorization": "Bearer ${JWT_TOKEN}"
                            // }

                        },
                    );

                    // res.status(200).json({
                    //     success: true
                    // })

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
















//         case 'GET':

//             try {
//                 const userEmail = await User.findOne({ email: req.body.email });

//                 console.log(`api/users/index line 84: userEmail: ${userEmail}`);

//                 // no matching email found in db
//                 if (!userEmail) {

//                     console.log(`index line 89 : no matching email`);

//                     return res.status(404).json({
//                         success: false,
//                         message: 'Error finding User'
//                     });
//                 }

//                 // found matching email in db
//                 if (userEmail == !null) {
//                     bcrypt.compare(req.body.passwod, user.password, function (err, match) {
//                         if (err) {
//                             res.status(500).json({ error: true, message: 'Auth Failed' });
//                         }

//                         // matching email and no errors 
//                         if (match) {
//                             // const token = jwt.sign(
//                             //     {
//                             //         userId: user._id,
//                             //         email: user.email
//                             //     },
//                             //     jwtSecret,
//                             //     {
//                             //         expiresIn: 3000, // 50 minutes
//                             //     },
//                             // );
//                             res.status(200).json({ token });

//                         }
//                     });
//                 }
//             }
//             catch (err) {
//                 res.status(401).json({
//                     error: true,
//                     message: 'Auth Failed'
//                 });

//             }

//             break;


//         default:
//             res.status(400).json({
//                 success: false
//             });
//             break;
//     }
// }