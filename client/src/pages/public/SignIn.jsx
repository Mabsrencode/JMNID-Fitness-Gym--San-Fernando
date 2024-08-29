import React from 'react'
import SignInForm from "../../components/Forms/SignInForm.jsx"
import hero from "../../assets/images/hero.jpg"
const SignIn = () => {
    return (
        <section style={{
            backgroundImage: `url(${hero})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }} className='min-h-screen px-4 flex justify-center items-center w-full' >
            <SignInForm />
        </section >
    )
}

export default SignIn