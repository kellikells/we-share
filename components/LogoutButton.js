
import React, { useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const LogoutButton = () => {

    const { logout } = useContext(GlobalContext);


    return (

        <button onClick={logout(id, email)} className='py-3 w-1/4 px-8 bg-red-600 hover:bg-red-500 text-white rounded-sm hover:shadow-xl transition duration-300' >

                    <a>Logout</a>

                </button>
       
    );
}