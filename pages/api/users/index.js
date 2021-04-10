import dbConnect from '../../../utils/dbConnect';   // database connection
import User from '../../../models/User';            // User schema

import bcrypt from 'bcrypt';                  // hashing and verifying password
import v4 from 'uuid';                        // create random user id
import jwt from 'jsonwebtoken';               // allows creating a secure frontend session, and verified backend
import assert from 'assert';                  // validator for the request body & required data on endpoints
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = 10;  // how many times to hash the password

dbConnect();


// USER LOGIN : finding if user exists in database 
function findUser(database, email, callback) {
    const collection = database.collection('users');
    collection.findOne({ email }, callback);
}

// USER REGISTER : adding a new user to database
function createUser(database, name, email, password, callback) {
    const collection = database.collection('users');
    bcrypt.hash(password, saltRounds, function (err, hash) {

        // store hash in your password db
        collection.insertOne(
            {
                userId: v4(),
                name,
                email,
                password: hash,
            },
            function (err, userCreated) {
                assert.strictEqual(err, null);
                callback(userCreated);
            },
        );
    });
}

// export default (req, res) => {
//     if (req.method === 'POST') {

//         // signup
//         try {
//             assert.notStrictEqual(null, req.body.name, 'Name required');
//             assert.notStrictEqual(null, req.body.email, 'Email required');
//             assert.notStrictEqual(null, req.body.password, 'Password required');
//         } catch (bodyError) {
//             res.status(403).json({ error: true, message: bodyError.message });
//         }

//         // verify email does NOT exists in the database already 
//         database.db(function (err) {
//             assert.strictEqual(null, err);
//             console.log(`the user is connected to MongoDB server -----`);

//             // const db = client.db(dbName);
//             const name = req.body.name;
//             const email = req.body.email;
//             const password = req.body.password;


//             findUser(database, email, function (err, user) {
//                 if (err) {
//                     res.status(500).json({ error: true, message: `Error finding user` });
//                     return;
//                 }

//                 // proceed to CREATE 
//                 if (!user) {
//                     createUser(database, name, email, password, function (creationResult) {
//                         if (creationResult.ops.length === 1) {
//                             const user = creationResult.ops[0];
//                             const token = jwt.sign(
//                                 { userId: user.userId, name: user.name, email: user.email },
//                                 jwtSecret,
//                                 {
//                                     expiresIn: 3000,     // 50 minutes
//                                 },
//                             );
//                             res.status(200).json({ token });
//                             return;
//                         }
//                     });

//                     // user already exists 
//                 } else {
//                     res.status(403).json({ error: true, message: `Email already exists` });
//                     return;
//                 }
//             });
//         });

//         // handle any other HTTP method 
//     } else {
//         res.status(200).json({ users: ['John Doe'] });
//     }
// };


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
                
            } catch (err) {
                if (err.name === 'ValidationError') {
                    const messages = Object.values(err.errors).map(val => val.message);

                    // 400: client error, 
                    res.status(400).json({
                        success: false,
                        error: messages
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
                    // return res.status(404).json({ success: false })
                    return res.status(404).json({
                        success: false,
                        error: 'No user found'
                    });
                }
                // res.status(200).json({ success: true, data: {} });
                res.status(200).json({
                    success: true,
                    data: {}
                });
            } catch (error) {
                // res.status(400).json({ success: false })
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