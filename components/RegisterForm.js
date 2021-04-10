import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';
import { GlobalContext } from '../context/GlobalState';

export const RegisterForm = () => {
    // const [signupError, setSignupError] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { addUser, getUsers, creatingUser } = useContext(GlobalContext);


    // const { addUser } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password
        }
        
        getUsers(newUser.email);
        
        if (creatingUser) {
            addUser(newUser);
            
        }
        // addUser(newUser);
        console.log(`new user: ${name}, ${email}, ${password}`);
        console.log(newUser.email);

        // fetch('/api/users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name,
        //         email,
        //         password,
        //     }),
        // })
        //     .then((r) => r.json())
        //     .then((data) => {
        //         if (data && data.error) {
        //             setSignupError(data.message);
        //             console.log(`!!!!!!!!!!!!!!!!! ERROR`);
        //         }
        //         if (data && data.token) {
        //             //set cookie
        //             cookie.set('token', data.token, { expires: 2 });
        //             console.log(`SUCCESS::::::::::::`);
        //             Router.push('/');
        //         }
        //     });

        // clear the form inputs
        setName('');
        setEmail('');
        setPassword('');
    }

    return (

        <div className=' flex mt-16 justify-center'>

            <div className='bg-white p-16 rounded shadow-2xl w-2/3'>

                <h2 className='text-3xl font-bold mb-10 text-gray-800'>Create Your Account</h2>

                <form onSubmit={onSubmit} className='space-y-5'>

                    <div>
                        <label className='block mb-1 font-bold text-gray-500'>User Name</label>

                        <input
                            id='user-name'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type='text'
                            className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500' />
                    </div>

                    <div>
                        <label className='block mb-1 font-bold text-gray-500'>Email</label>

                        <input
                            id='email-input'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email'
                            className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500' />
                    </div>

                    <div>
                        <label className='block mb-1 font-bold text-gray-500'>Password</label>

                        <input
                            id='password-input'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500' />
                    </div>

                    {/* <div className='flex items-center'>
                        <input type='checkbox' id='agree' />
                        <label for='agree' className='ml-2 text-gray-700 text-sm'>I agree to the terms and privacy.</label>
                    </div> */}

                    <button type='submit'
                        className='block w-full p-4 rounded
                        bg-yellow-400 hover:bg-yellow-300
                        text-yellow-900 hover:text-yellow-800 
                        transition duration-300'>Sign Up</button>


                    {/* any errors:  */}
                    {/* {signupError && <p style={{ color: 'red' }}>{signupError}</p>} */}


                </form>

                <div className='mt-4'>
                    Already have an account? <span className='text-red-700'><Link href='/login'><a>Login</a></Link></span>
                </div>

            </div>
        </div>


    );
}