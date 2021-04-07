import React from 'react'
import Link from 'next/link';

export const RegisterButton = () => {
    return (
        <button><Link href='/register'><a>Register</a></Link></button>
    )
}