import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const RegisterForm = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');


    const { addUser } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            userName,
            userEmail,
            userPassword
        }
        console.log(`new user: ${userName}, ${userEmail}, ${userPassword}`);
        // addUser(newUser);

        // clear the form inputs
        setUserName('');
        setUserEmail('');
        setUserPassword('');
    }

    return (

        <div className='min-h-screen flex items-center justify-center'>

            <div className='bg-white p-16 rounded shadow-2xl w-2/3'>

                <h2 className='text-3xl font-bold mb-10 text-gray-800'>Create Your Account</h2>

                <form onSubmit={onSubmit} className='space-y-5'>

                    <div>
                        <label className='block mb-1 font-bold text-gray-500'>User Name</label>

                        <input
                            id='user-name'
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            type='text'
                            className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500' />
                    </div>

                    <div>
                        <label className='block mb-1 font-bold text-gray-500'>Email</label>

                        <input
                            id='email-input'
                            onChange={(e) => setUserEmail(e.target.value)}
                            value={userEmail}
                            type='email'
                            className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500' />
                    </div>

                    <div>
                        <label className='block mb-1 font-bold text-gray-500'>Password</label>

                        <input
                            id='password-input'
                            onChange={(e) => setUserPassword(e.target.value)}
                            value={userPassword}
                            type='password'
                            className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500' />
                    </div>

                    {/* <div className='flex items-center'>
                        <input type='checkbox' id='agree' />
                        <label for='agree' className='ml-2 text-gray-700 text-sm'>I agree to the terms and privacy.</label>
                    </div> */}

                    <button className='block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300'>Sign Up</button>

                </form>

            </div>
        </div>


    );
}