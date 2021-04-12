import dbConnect from '../../../utils/dbConnect';   // database connection
import User from '../../../models/User';            // User schema

import bcrypt from 'bcrypt';                  // hashing and verifying password
import v4 from 'uuid';                        // create random user id
import jwt from 'jsonwebtoken';               // allows creating a secure frontend session, and verified backend
import assert from 'assert';                  // validator for the request body & required data on endpoints
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = 10;  // how many times to hash the password

dbConnect();

// --------------------------------------------------------------



export default async (req, res) => {
    const { method } = req;


    switch (method) {

        // --------------------------------- 

        case 'POST':
            try {
                console.log(`index: line27 - email: ${req.body.email}`);

                const user = await User.create(req.body);



                // if ((await req.db.collection('users').countDocuments({ email })) > 0) {
                //     res.status(403).send('The email has already been used.');
                // }


                res.status(201).json({
                    success: true,
                    data: user
                });



                //     if ((await req.db.collection('users').countDocuments({ email })) > 0) {
                //         res.status(403).send('The email has already been used.');
                //     }
                //     const hashedPassword = await bcrypt.hash(password, 10);
                //     const user = await req.db
                //         .collection('users')
                //         .insertOne({ email, password: hashedPassword, name })
                //         .then(({ ops }) => ops[0]);
                //     req.logIn(user, (err) => {
                //         if (err) throw err;
                //         // when we finally log in, return the (filtered) user object
                //         res.status(201).json({
                //             user: extractUser(req),
                //         });
                //     });
                // });


                // res.status(201).json({
                //     success: true,
                //     data: newUser
                // });

            } catch (err) {

                // getting ERROR messages 
                if (err.name === 'ValidationError') {
                    const messages = Object.values(err.errors).map(val => val.message);

                    // const apiErrorKeys = Object.keys(err.errors);
                    // const apiErrorMessages = Object.values(err.errors);

                    // console.log(`***************`);
                    // console.log('index: line 75- hit the IFFF');
                    // console.log(apiErrorKeys);
                    // console.log(apiErrorMessages);
                    // console.log(err.errors);

                    // 400: client error, 
                    res.status(400).json({
                        success: false,
                        error: messages
                    });

                } else {
                    console.log('index: line 87- hit the ELSE');

                    res.status(500).json({
                        success: false,
                        error: 'Server Error'
                    });
                }
            }
            break;








        // --------------------------------- 


        case 'DELETE':
            try {
                const deletedUser = await User.deleteOne({ _id: id });

                if (!deletedUser) {
                    return res.status(404).json({
                        success: false,
                        error: 'No user found'
                    });
                }

                res.status(200).json({
                    success: true,
                    data: {}
                });
            } catch (error) {
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