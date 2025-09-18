import React,{use, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';

function EmailVerify() {

  axios.defaults.withCredentials = true;

  const {backendUrl, isLoggedIn, userData, getuserData} = useContext(AppContent);
  const inputRefs = React.useRef([]); 

  
  const navigate = useNavigate();

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

useEffect(() => {
  isLoggedIn && userData && userData.isVerified && navigate('/');
}, [isLoggedIn, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
                src={assets.logo}
                alt="Logo"
                onClick={() => navigate("/")}
                className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
              />
        <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify Otp</h1>
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
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'>Verify</button>
            <p className='text-center text-sm text-gray-300 mt-4'>Didn't receive the code? <span className='text-blue-400 cursor-pointer'>Resend</span></p>
        </form>
    </div>
  )
}

export default EmailVerify;
