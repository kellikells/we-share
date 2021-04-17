import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import cookie from 'js-cookie';

import { GlobalContext } from '../context/GlobalState';
import { useRouter } from 'next/router';


export const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const { getUser } = useContext(GlobalContext);

    // Regex 
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // function to clear form input fields 
    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        if (isSubmitting) {

            if (Object.keys(errors).length == 0) {

                const returningUser = {
                    email,
                    password
                }
                // getUser(returningUser);
                getUser(email, password);
                setIsSubmitting(false);

                console.log(`LoginForm: SUCCESSFUL`)

                router.push('/login');
            }
            else {

                console.log(`LoginForm: FAILED`);

                setIsSubmitting(false);
            }
        }
    }, [errors]);


    // 1- user clicks submit form button
    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validateForm();
        setErrors(errs);
        setIsSubmitting(true);
    }

    // 2- validation form inputs 
    const validateForm = () => {
        let err = {};

        if (!email || !emailFormat.test(email)) {
            err.email = 'Please enter a valid email address';
        }
        if (!password || password < 8) {
            err.password = 'Password must be at least 8 characters';
        }
        return err;
    }

    return (

        <div className=' flex mt-16 justify-center'>
            <div className='bg-white p-16 rounded shadow-2xl w-2/3'>
                <h2 className='text-3xl font-bold mb-10 text-gray-800'>Log In</h2>
                {
                    isSubmitting
                        ? <p>...Loading</p>

                        : <form onSubmit={handleSubmit} className='space-y-5'>

                            <div>
                                <label className='invisible' htmlFor='email-input'>
                                    Email
                                </label>

                                <input
                                    placeholder='Email'
                                    name='email'
                                    id='email-input'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type='email'
                                    className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
                                />

                                {errors.email
                                    ? <div className='text-red-600 font-thin'>
                                        {errors.email}
                                    </div>
                                    : null}
                            </div>

                            <div>
                                <label className='invisible' htmlFor='password-input'>
                                    Password
                                </label>

                                <input
                                    placeholder='password, at least 8 characters'
                                    name='password'
                                    id='password-input'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type='password'
                                    className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
                                />

                                {errors.password
                                    ? <div className='text-red-600 font-thin'>
                                        {errors.password}
                                    </div>
                                    : null}
                            </div>


                            <button type='submit'
                                className='block w-full p-4 rounded
                        bg-yellow-400 hover:bg-yellow-300
                        text-yellow-900 hover:text-yellow-800 
                        transition duration-300'>Log in</button>

                        </form>
                }

                <div className='mt-4'>
                    Need an account?
                    <span className='text-red-700'>
                        <Link href='/register'>
                            <a>Sign up</a>
                        </Link>
                    </span>
                </div>

            </div>
        </div>
    );
}