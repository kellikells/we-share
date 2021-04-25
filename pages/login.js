import React from 'react';
import GlobalProvider, { GlobalContext } from '../context/GlobalState';

import { Header } from '../components/Header';
import { LoginForm } from '../components/LoginForm';

// --------------------------------------------------------------

const Register = () => {


    return (
        <GlobalProvider >
            <div className='container'>
                <Header />
                <LoginForm />
            </div>
        </GlobalProvider>
    );
}

export default Register;