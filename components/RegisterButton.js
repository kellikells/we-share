import React from 'react'
import Link from 'next/link';

export const RegisterButton = () => {
    return (
        <div>
            <Link href='/register'>

                <button className='py-3 w-full px-8 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded-sm hover:shadow-xl transition duration-300' >

                    <a>Register</a>

                </button>

            </Link >
        </div>
    )
}