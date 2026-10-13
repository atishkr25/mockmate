import React, { useState } from 'react';
import axios from "axios";
import { motion } from "motion/react"
import { FaRobot, FaTimes } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { serverURL } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import AuthModel from '../components/AuthModel.jsx'; 

// const serverURL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

function Auth({isModel = false, onClose}) {

  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const syncUserWithBackend = async (user) => {
    const result = await axios.post(serverURL + "/api/auth/google", {
      name: user.displayName || name || user.email?.split('@')[0] || 'MockMate user',
      email: user.email,
    }, {withCredentials: true});
    dispatch(setUserData(result.data));
  };

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider); // Ye Firebase ka function hai jo Google login popup open karta hai aur successful authentication ke baad user object return karta hai.
      await syncUserWithBackend(response.user);
    } catch (error) {
      setAuthError(error.message || 'Google sign-in failed.');
    }
  }

  const handleEmailAuth = async (event) => {
    event.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name.trim() });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      await syncUserWithBackend(userCredential.user);
    } catch (error) {
      const messages = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-credential': 'Email or password is incorrect.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/invalid-email': 'Enter a valid email address.',
      };
      setAuthError(messages[error.code] || error.message || 'Email authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-4 py-20"}
    `}>
      <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{duration: 0.6}}
      className={`
        relative w-full 
        ${isModel ? "p-6 sm:p-12 rounded-[24px] sm:rounded-[32px]" : "max-w-md p-6 sm:p-8 rounded-3xl"}
        bg-white shadow-2xl border border-gray-200
      `}>
        {isModel && onClose && (
          <button 
            onClick={onClose}
            className='absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-black transition-colors focus:outline-none cursor-pointer'
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
        )}
        <div className='flex items-center justify-center gap-3 mb-6'>
          <div className='bg-black text-white p-2 rounded-lg'>
            <FaRobot size={18} />
          </div>
          <h2 className='font-semibold text-lg'>MockMate</h2>
        </div>    
        <h1 className='text-2xl sm:text-3xl font-semibold text-center leading-snug mb-4'>Continue with MockMate{" "}
          <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2 mt-2 sm:mt-0'>
            <IoSparkles size={16} />
            AI Smart Interview
          </span>
        </h1>
        <p className='text-gray-500 text-center text-sm sm:text-base leading-relaxed mb-8'>
          Sign in to your MockMate account to access your personalized dashboard, AI powered mock interviews, track your progress, and and unlock detailed performance insights.
        </p>
        <motion.button 
        onClick={handleGoogleAuth}
        whileHover={{ opacity: 0.9, scale: 1.03 }}
        whileTap={{ opacity: 1, scale: 0.98}}
        className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md cursor-pointer'>
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>
        <div className='my-6 flex items-center gap-3 text-xs text-gray-400'><span className='h-px flex-1 bg-gray-200' />OR<span className='h-px flex-1 bg-gray-200' /></div>
        <form onSubmit={handleEmailAuth} className='space-y-3'>
          {isRegistering && <input type='text' required value={name} onChange={(event) => setName(event.target.value)} placeholder='Full name' className='w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100' />}
          <input type='email' required value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Email address' className='w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100' />
          <input type='password' required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Password (at least 6 characters)' className='w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100' />
          {authError && <p className='rounded-xl bg-red-50 px-3 py-2 text-xs leading-5 text-red-600'>{authError}</p>}
          <button type='submit' disabled={isLoading} className='w-full rounded-full bg-orange-600 py-3 text-sm font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-300'>
            {isLoading ? 'Please wait...' : isRegistering ? 'Create account' : 'Sign in with email'}
          </button>
        </form>
        <button type='button' onClick={() => { setIsRegistering(!isRegistering); setAuthError(''); }} className='mt-4 w-full text-center text-sm font-semibold text-gray-500 transition hover:text-orange-600'>
          {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
        </button>
      </motion.div>
    </div>
  )
}

export default Auth;