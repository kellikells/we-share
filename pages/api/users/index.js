import dbConnect from '../../../utils/dbConnect';   // database connection
import User from '../../../models/User';            // User schema

import bcrypt from 'bcryptjs';                  // hashing and verifying password
import v4 from 'uuid';                        // create random user id
import jwt from 'jsonwebtoken';               // allows creating a secure frontend session, and verified backend
import assert from 'assert';                  // validator for the request body & required data on endpoints
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = process.env.SALT_ROUNDS;  // how many times to hash the password

dbConnect();

const client = dbConnect();

const db = process.env.MONGODB_DB;
// --------------------------------------------------------------
function findUser(db, email, callback) {
    const collection = db.collection('users');
    // const collection = (process.env.MONGODB_DB).collection('users');
    collection.findOne({ email }, callback);
}

function createUser(db, email, password, callback) {
    const collection = db.collection('users');
    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        collection.insertOne(
            {
                email,
                password: hash,
            },
            function (err, userCreated) {
                if (err) throw err;
                callback(userCreated);
            },
        );
    });
}



export default async (req, res) => {
    const { method } = req;


    switch (method) {

        // --------------------------------- 

        case 'POST':
            const db = process.env.MONGODB_DB;
            const email = req.body.email;
            const password = req.body.password;

            findUser(db, email, function (err, user) {
                if (err) {
                    res.status(500).json({ error: true, message: 'Error finding User' });
                    return;
                }
                if (!user) {
                    createUser(db, email, password, function (creationResult) {
                        if (creationResult.ops.length === 1) {
                            const user = creationResult.ops[0];
                            const token = jwt.sign(
                                { userId: user._id, email: user.email },
                                jwtSecret,
                                { expiresIn: 3000, },
                            );
                            res.status(200).json({ token });
                            return;
                        }
                    })
                } else {
                    res.status(403).json({
                        error: true,
                        message: 'email exists'
                    });
                    return;
                }
            })
            // try {
            //     const userEmail = await User.findOne({ email: req.body.email });

            //     var newUser;

            //     // proceed to create new user
            //     if (userEmail == null) {

            //         const hashedpw = await bcrypt.genSalt(saltRounds, (err, salt) => {
            //             bcrypt.hash(req.body.password, salt, (err, hash) => {
            //                 if (err) throw err;
            //                 req.body.password = hash;

            //                 newUser = User.create(req.body);

            //             });
            //         });


            //         res.status(201).json({
            //             success: true,
            //             data: newUser
            //         });
            //     }
            //     // client error
            //     else {
            //         res.status(400).json({
            //             success: false,
            //             error: 'GET YOUR OWN EMAIL!!!!'
            //         })
            //     }

            // } catch (err) {
            //     if (err.name === 'ValidationError') {
            //         const messages = Object.values(err.errors).map(val => val.message);

            //         res.status(400).json({     // 400: client error, 
            //             success: false,
            //             error: messages
            //         });
            //     } else {
            //         console.log('index: line 87- hit the ELSE');

            //         res.status(500).json({
            //             success: false,
            //             error: `Server Error: ${err}`
            //         });
            //     }
            // }
            break;

        // ---------------USER LOGIN------------------ 



        case 'PUT':
            try {

                const { email, password } = req.body;
                const user = await User.findOne({ email: email });

                console.log(`api/users/index line 84:  ${user}`);

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

                    const payload = {
                        user: {
                            id: user._id,
                            email: user.email
                        }
                    };
                    const newToken = await jwt.sign(
                        payload,
                        jwtSecret,
                        {
                            expiresIn: 3600
                        },
                        (err, token) => {
                            if (err) throw err;
                            
                            // userToken = json({ token });
                            res.status(200).json({
                                token
                            });

                            // headers: {
                            //     "Authorization": "Bearer ${JWT_TOKEN}"
                            // }

                        }
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