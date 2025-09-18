import React, { useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { useContext, useEffect, useRef } from 'react';
import { AppContent } from '../context/AppContext';

function ResetPassword() {

const inputRefs = useRef([]);

  const {backendUrl, isLoggedIn, userData, getuserData} = useContext(AppContent);

 const handleInput = (e, index) => {
    const value = e.target.value; 
    if (value) {
      // Move to the next input if the current one is filled
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      // Move to the previous input if the current one is empty
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
  }
}

const handlePaste = (e) => {
  e.preventDefault();
  const paste = e.clipboardData.getData('text');
  const pasteArray = paste.split('').slice(0, 6);
  pasteArray.forEach((char, index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].value = char;
    }
  });
};

const onSubmitHandler = async(e) => {
 try{
  e.preventDefault();
  const otpArray = inputRefs.current.map(input => input.value);
  const otp = otpArray.join('');
  console.log('Submitted OTP:', otp);
  const{data} = await axios.post(backendUrl+'/api/auth/verify-account',{otp});
  // Add your OTP submission logic here
  if(data.success){
    toast.success(data.message);
    getuserData();
    navigate('/');
  }else{
    toast.error(data.message);
  }
 }
 catch(err){
  console.error('Error submitting OTP:', err);
 }
};

 const [email,setEmail] = useState('');
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img src={assets.logo} alt="Logo" className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" onClick={() => navigate("/")} />

      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your email to receive reset instructions</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.mail_icon} alt='Email Icon' className='w-3 h-3' />
          <input type='email' placeholder='Enter your email' className='bg-transparent outline-none border-none w-full text-sm text-white placeholder:text-indigo-300' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>Submit</button>
      </form>
      {/* Otp input Form */}
      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
            <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent your email id.</p>
            <div className='flex justify-between mb-8' onPaste={handlePaste}>
              {Array(6).fill(0).map((_, index) => (
                <input 
                  key={index}
                  required
                  type="text" 
                  maxLength="1" 
                  ref={e => inputRefs.current[index] = e}
                  onInput={(e)=> handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className='w-10 h-10 text-center text-lg rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white'
                />
              ))}
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 transition-colors'>Submit</button>
            <p className='text-center text-sm text-gray-300 mt-4'>Didn't receive the code? <span className='text-blue-400 cursor-pointer'>Resend</span></p>
        </form>

        {/* enter new Password */}
         <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your new password</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.mail_icon} alt='Email Icon' className='w-3 h-3' />
          <input type='email' placeholder='Enter your email' className='bg-transparent outline-none border-none w-full text-sm text-white placeholder:text-indigo-300' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>Submit</button>
      </form>

    </div>
  )
}

export default ResetPassword
