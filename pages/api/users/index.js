import dbConnect from '../../../utils/dbConnect';   // database connection
import User from '../../../models/User';            // User schema

import bcrypt from 'bcryptjs';                  // hashing and verifying password
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
                const userEmail = await User.findOne({ email: req.body.email });
                
                // proceed to create new user
                if (userEmail == null) {
             

                    const hashedpw = await bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            req.body.password = hash;
                   
                            const newUser = User.create(req.body);

                        })
                    });


                    // CHECK THIS !!!!!!!!!!! 
                    // console.log(`hashedPW: ${req.body.password}`);



                    // const newUser = await User.create(req.body);
                    // res.status(201).json({
                    //     success: true,
                    //     data: newUser
                    // });
                }
                // WARNING: EMAIL ALREADY IN DATABASE
                else {
                    res.status(400).json({
                        success: false,
                        error: 'GET YOUR OWN EMAIL!!!!'
                    })
                }

            } catch (err) {
                if (err.name === 'ValidationError') {
                    const messages = Object.values(err.errors).map(val => val.message);
               
                    res.status(400).json({     // 400: client error, 
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