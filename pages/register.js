import React from 'react';
import { GlobalProvider } from '../context/GlobalState';

import { Header } from '../components/Header';
import { RegisterForm } from '../components/RegisterForm';

const Register = () => {


    return (
        <GlobalProvider >
            <div className='container'>
                <Header />
                <RegisterForm/>
            </div>
        </GlobalProvider>
    );
}

export default Register;