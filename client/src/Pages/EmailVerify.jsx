import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';

function EmailVerify() {
  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedIn, userData, getuserData } = useContext(AppContent);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0); // seconds

  // OTP input handling
  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6);
    paste.split('').forEach((char, idx) => {
      if (inputRefs.current[idx]) inputRefs.current[idx].value = char;
    });
  };

  // Submit OTP
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otp = inputRefs.current.map(input => input.value).join('');
      if (otp.length < 6) return toast.error("Enter full 6-digit OTP");

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });
      if (data.success) {
        toast.success(data.message);
        await getuserData();
        navigate('/');
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      toast.error('Failed to verify OTP');
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (resendCooldown > 0) return;

    try {
      setResendLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/auth/resend-verify-otp`);
      if (data.success) {
        toast.success(data.message);
        inputRefs.current.forEach(input => { if (input) input.value = ''; });
        inputRefs.current[0]?.focus();
        setResendCooldown(30); // 30 seconds cooldown
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error('Error resending OTP:', err);
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Redirect if already verified
  useEffect(() => {
    if (isLoggedIn && userData?.isVerified) navigate('/');
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt="Logo"
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form onSubmit={onSubmitHandler} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
        <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email id.</p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              required
              type="text"
              maxLength="1"
              ref={el => inputRefs.current[index] = el}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 text-center text-lg rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
            />
          ))}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer">
          Verify
        </button>
        <p className="text-center text-sm text-gray-300 mt-4">
          Didn't receive the code?{' '}
          <span
            className={`underline ${resendCooldown > 0 ? 'opacity-50 cursor-not-allowed' : 'text-blue-400 cursor-pointer'}`}
            onClick={handleResend}
          >
            {resendLoading ? 'Resending...' : (resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend')}
          </span>
        </p>
      </form>
    </div>
  );
}

export default EmailVerify;
