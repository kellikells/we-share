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
        case 'GET':
            try {
                const users = await User.find({});

                res.status(200).json({
                    success: true,
                    count: users.length,
                    data: users
                })
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Server Error'
                });
            }
            break;
        // --------------------------------- 

        case 'POST':
            try {
                const newUser = await User.create(req.body);

                res.status(201).json({
                    success: true,
                    data: newUser
                });

            } catch (apiError) {
             
                // getting ERROR messages 
                if (apiError.name === 'ValidationError') {
           
                    const apiErrorKeys = Object.keys(apiError.errors);
                    const apiErrorMessages = Object.values(apiError.errors);


                    console.log(`***************`);
                    console.log(apiErrorKeys);
                    console.log(apiErrorMessages);
                    console.log(apiError.errors);

                    // 400: client error, 
                    res.status(400).json({
                        success: false,
                        error: apiError
                    });

                } else {
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