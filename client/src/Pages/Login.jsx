import React, { use } from 'react'
import { assets } from '../assets/assets'

function Login() {

  const [state, setState] = useState('Sign Up')

  return (
    <>
    <div>
      <img src={assets.logo} alt='Logo' className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
      <div>
        <h2>{state === 'Sign Up' ? 'Create your account': 'Login to your account!'}</h2>
        <p></p>
      </div>
    </div>
    </>
  )
}

export default Login
