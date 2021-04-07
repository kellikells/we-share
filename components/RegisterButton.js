import React from 'react'
import Link from 'next/link';

export const RegisterButton = () => {
    return (
        <button className='py-3 px-8 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded-lg hover:shadow-xl transition duration-300' >
            <Link href='/register'>
                <a>Register</a>
            </Link>
        </button>
    )
}