import React from 'react'
import Link from 'next/link';

export const LoginButton = () => {
    return (
        <div>
            <Link href='/login'>

                <button className='py-3 w-full px-8 bg-gray-400 hover:bg-gray-300 text-gray-800 hover:text-gray-900 rounded-sm hover:shadow-xl transition duration-300' >

                    <a>Login</a>

                </button>

            </Link>
        </div>
    );
}