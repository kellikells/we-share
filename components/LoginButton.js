import React from 'react'
import Link from 'next/link';

export const LoginButton = () => {
    return (
        <button><Link href='/login'><a>Login</a></Link></button>
    )
}