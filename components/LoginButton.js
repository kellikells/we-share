import React from 'react'
import Link from 'next/link';

export const LoginButton = () => {
    return (
        
        <Link href='/login'>

            <button className='py-3 px-8 bg-gray-400 hover:bg-gray-300 text-gray-800 hover:text-gray-900 rounded-lg hover:shadow-xl transition duration-300' >

                <a>Login</a>

            </button>

        </Link>
    );
}