import React from 'react';
import { GlobalProvider } from '../context/GlobalState';
import { Header } from '../components/Header';

import { RegisterForm } from '../components/RegisterForm';

const Register = () => {

    // const res = await axios.post('/api/users', newUser, config)
    //     .then((r) => r.json())
    //     .then((data) => {
    //         if (data && data.error) {
    //             console.log(`ERROR MESSAGE BELOW::`)
    //             console.log(data.message);
    //             // send this to dispatch to put the error in state for display
    //         }
    //         if (data && data.token) {
    //             //set cookie
    //             cookie.set('token', data.token, { expires: 2 });
    //             router.push('/inventory');
    //         }
    //     })

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