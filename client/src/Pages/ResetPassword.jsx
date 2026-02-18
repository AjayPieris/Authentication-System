import React, { useState, useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";
import axios from "axios";

function ResetPassword() {
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Resend state
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0); // seconds

  // focus/clear OTP inputs when we enter the OTP step
  useEffect(() => {
    if (isEmailSent) {
      // clear any previous values
      inputRefs.current.forEach((el) => {
        if (el) el.value = "";
      });
      // focus the first input
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  }, [isEmailSent]);

  // countdown for resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleInput = (e, index) => {
    const value = e.target.value;
    // allow only single char (optional: restrict to digits)
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\s+/g, "");
    const pasteArray = paste.split("").slice(0, 6);
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) inputRefs.current[index].value = char;
    });
  };

  // Step 1: send/reset OTP
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email },
      );
      if (data.success) {
        toast.success(data.message || "OTP sent to your email");
        setIsEmailSent(true);
        setResendCooldown(30); // start cooldown
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("send-reset-otp error:", err);
      toast.error("Error sending OTP. Check network or try again.");
    }
  };

  // Resend button handler
  const handleResend = async () => {
    if (!email) return toast.error("Please enter your email first");
    if (resendCooldown > 0) return; // still cooling down
    try {
      setResendLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email },
      );
      if (data.success) {
        toast.success(data.message || "OTP resent");
        // clear inputs so user can enter fresh code
        inputRefs.current.forEach((el) => {
          if (el) el.value = "";
        });
        inputRefs.current[0]?.focus();
        setResendCooldown(30);
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      toast.error("Error resending OTP. Check network or try again.");
    } finally {
      setResendLoading(false);
    }
  };

  // Step 2: submit OTP (move to new password screen)
  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpArray = (inputRefs.current || []).map(
      (input) => input?.value ?? "",
    );
    const enteredOtp = otpArray.join("");
    if (enteredOtp.length < 6)
      return toast.error("Please enter the 6-digit OTP");
    setOtp(enteredOtp);
    setIsOtpSubmited(true);
    console.log("Captured OTP (local):", enteredOtp);
    // Optionally call a verify endpoint here if you have one
    // await axios.post(`${backendUrl}/api/auth/verify-reset-otp`, { email, otp: enteredOtp });
  };

  // Step 3: submit new password (send email, otp, newPassword)
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return toast.error("Enter a new password");
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, newPassword, otp },
      );
      if (data.success) {
        toast.success(data.message || "Password reset successful");
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("reset-password error:", err);
      toast.error("Error resetting password. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Email input form */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your email to receive reset instructions
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Email Icon" className="w-3 h-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none border-none w-full text-sm text-white placeholder:text-indigo-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      )}

      {/* OTP input Form */}
      {isEmailSent && !isOtpSubmited && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  required
                  inputMode="numeric"
                  pattern="\d*"
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-10 text-center text-lg rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                />
              ))}
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>

          <div className="text-center text-sm text-gray-300 mt-4 ">
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || resendLoading}
              className={`cursor-pointer underline ${resendCooldown > 0 || resendLoading ? "opacity-50 cursor-not-allowed" : "text-blue-400"}`}
            >
              {resendLoading
                ? "Resending..."
                : resendCooldown > 0
                  ? `Resend available in ${resendCooldown}s`
                  : "Resend"}
            </button>
          </div>
        </form>
      )}

      {/* New Password form */}
      {isOtpSubmited && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your new password
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock Icon" className="w-3 h-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              className="bg-transparent outline-none border-none flex-1 text-sm text-white placeholder:text-indigo-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
