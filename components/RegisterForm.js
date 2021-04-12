import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
// import { Errors } from './Errors';
import Router from 'next/router';
// import cookie from 'js-cookie';
import { GlobalContext } from '../context/GlobalState';
import router from 'next/router';

export const RegisterForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addUser } = useContext(GlobalContext);

    // Regex 
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const emailFormat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

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
            if (Object.keys(errors).length == 0) {
            
                console.log('registerForm: line 37: no errors');



                const newUser = {
                    name,
                    email,
                    password
                }                
                addUser(newUser);
   
     
                setIsSubmitting(false);
                router.push('/');
            }
            else {
                console.log(`registerForm: line 52: ERRORS`);
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

        if (!name || name.length <= 2) {
            err.name = 'Please enter a name with at least 3 characters';
        }
        if (!email || !emailFormat.test(email)) {
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
                                <label className='invisible' htmlFor='user-name'>
                                    User Name
                                </label>

                                <input
                                    placeholder='Username'
                                    name='name'
                                    id='user-name'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type='text'
                                    className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
                                />

                                {errors.name
                                    ? <div className='text-red-600 font-thin'>
                                        {errors.name}
                                    </div>
                                    : null}
                            </div>

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


                            <div>
                                <label className='invisible' htmlFor='password-confirm-input'>
                                    Password Confirmation
                                </label>

                                <input
                                    placeholder='Confirm Password'
                                    name='passwordConfirm'
                                    id='password-confirm-input'
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    value={passwordConfirm}
                                    type='password'
                                    className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500'
                                />

                                {errors.passwordConfirm
                                    ? <div className='text-red-600 font-thin'>
                                        {errors.passwordConfirm}
                                    </div>
                                    : null}
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