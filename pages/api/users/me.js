// /**
//  * @method - GET
//  * @description - Get LoggedIn User
//  * @param - /user/me
//  */
import dbConnect from '../../../utils/dbConnect';   // database connection
import User from '../../../models/User';            // User schema

import bcrypt from 'bcryptjs';                  // hashing and verifying password
import v4 from 'uuid';                        // create random user id
import jwt from 'jsonwebtoken';               // allows creating a secure frontend session, and verified backend
import assert from 'assert';                  // validator for the request body & required data on endpoints
import auth from '../../../middleware/auth';
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = 10;  // how many times to hash the password

// const auth = auth;
dbConnect();


// --------------------------------------------------------------


export default (auth, async (req, res) => {
    // const { method } = req;


    // switch (method) {

    //     // --------------------------------- 

    //     case 'GET':

    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user._id);
        res.status(200).json({
            user
        });
        // res.json(user);
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
     
    }
}
);




   // res.send({ message: "Error in Fetching user" });


   
// router.get("/me", auth, async (req, res) => {
//     try {
//         // request.user is getting fetched from Middleware after token authentication
//         const user = await User.findById(req.user.id);
//         res.json(user);
//     } catch (e) {
//         res.send({ message: "Error in Fetching user" });
//     }
// });