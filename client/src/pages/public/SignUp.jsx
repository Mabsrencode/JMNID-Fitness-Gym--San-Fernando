import React from 'react'
import SignUpForm from '../../components/Forms/SignUpForm'
import hero from "../../assets/images/hero.jpg"
const SignUp = () => {
    return (
        <section style={{
            backgroundImage: `url(${hero})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }} className='min-h-screen px-4 flex justify-center items-center'>
            <SignUpForm />
        </section>
    )
}

export default SignUp