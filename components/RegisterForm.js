import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
// import { Errors } from './Errors';
// import Router from 'next/router';
// import cookie from 'js-cookie';
import { GlobalContext } from '../context/GlobalState';

export const RegisterForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addUser, getUsers, creatingUser, error } = useContext(GlobalContext);

    // Regex 
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // function to clear form input fields 
    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    }

    useEffect(() => {
        if (isSubmitting) {

            // if there are no errors, add the new user
            if (Object.keys(errors).length === 0) {
                console.log(`no errors`);

                const newUser = {
                    name,
                    email,
                    password,
                    passwordConfirm
                }
                addUser(newUser);
                resetForm()
            }
            else {
                console.log(`WARNING : ERRORS`);
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

    // 2- validation for form inputs 
    const validateForm = () => {
        let err = {};

        if (!name || name.length <= 2) {
            err.name = 'Please enter a name with at least 3 characters';
        }
        if (!email || !email.value.match(emailFormat)) {
            err.email = 'Please enter a valid email address';
        }
        if (!password || password < 8) {
            err.password = 'Password must be at least 8 characters';
        }
        if (!passwordConfirm || password !== passwordConfirm) {
            err.passwordConfirm = 'Passwords do not match';
        }
        return err;
    }

    return (

        <div className=' flex mt-16 justify-center'>
            <div className='bg-white p-16 rounded shadow-2xl w-2/3'>
                <h2 className='text-3xl font-bold mb-10 text-gray-800'>Create Your Account</h2>
                {
                    isSubmitting
                        ? <p>...Loading</p>

                        : <form onSubmit={handleSubmit} className='space-y-5'>

                            <div>
                                <label className='block mb-1 font-bold text-gray-500'>
                                    User Name
                                </label>

                                <input
                                    name='name'
                                    id='user-name'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type='text'
                                    className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
                                />

                                {errors.name ? errors.name : null}
                            </div>

                            <div>
                                <label className='block mb-1 font-bold text-gray-500'>
                                    Email
                                </label>

                                <input
                                    name='email'
                                    id='email-input'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type='email'
                                    className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
                                />

                                {errors.email ? errors.email : null}
                            </div>

                            <div>
                                <label className='block mb-1 font-bold text-gray-500'>
                                    Password
                                </label>

                                <input
                                    name='password'
                                    id='password-input'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type='password'
                                    className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
                                />

                                {errors.password ? errors.password : null}
                            </div>


                            <div>
                                <label className='block mb-1 font-bold text-gray-500'>
                                    Password Confirmation
                                </label>

                                <input
                                    name='passwordConfirm'
                                    id='password-confirm-input'
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    value={passwordConfirm}
                                    type='password'
                                    className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
                                />

                                {errors.passwordConfirm ? errors.passwordConfirm : null}
                            </div>


                            <button type='submit'
                                className='block w-full p-4 rounded
                        bg-yellow-400 hover:bg-yellow-300
                        text-yellow-900 hover:text-yellow-800 
                        transition duration-300'>Sign Up</button>


                        </form>
                }

                <div className='mt-4'>
                    Already have an account? <span className='text-red-700'><Link href='/login'><a>Login</a></Link></span>
                </div>

            </div>
        </div>


    );
}